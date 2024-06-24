import express from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { getUserByEmail, insertUser, updateUser } from "../models/users/UserModel.js";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { getTokens, signAccessToken, signRefreshJWT } from "../utils/jwt.js";
import { auth } from "../middlewares/auth.js";
import { deleteSession, insertToken } from "../models/session/SessionModel.js";
import { v4 as uuidv4 } from 'uuid'
import { emailVerificationMail } from "../services/email/nodemailer.js";

const router = express.Router();


/***************** Public Controllers ******************/

router.all("/", (req, res, next) => {
  console.log("from all");
  next();
});


router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await insertUser(req.body);
    if (user?._id) {
      const token = uuidv4();
      const obj = {
        token: token,
        associate: user.email
      }
      const result = await insertToken(obj);

      if (result?._id) {
        emailVerificationMail({
          email: user.email,
          fName: user.fname,
          url: process.env.FE_ROOT_URL + `/verify-user?c=${token}&e=${user.email}`
        })
        return res.json({
          status: "success",
          message: "We have sent you an email to verify your account. Please check your inbox/junk and click on the link to verify."
        })
      }
      res.json({
        status: "error",
        message: "Unable to create user. Please contact administration",
      })
    }
  } catch (error) {
    if (error.message.includes('E11000 duplicate key')) {
      error.status = '200';
      error.message = 'Email already in use...'
    }
    next(error);
  }
});

router.post('/user-verification', async (req, res, next) => {
  try {
    const { c, e } = req.body;
    const session = await deleteSession({ token: c, associate: e });
    if (session?._id) {
      const result = await updateUser({ email: e }, { status: 'active', isEmailVerified: true })
      if (result?._id) {
        return res.json({
          status: 'success',
          message: 'Your Email has been Verified... You can sign in now.',
        })
      }
    }
    res.json({
      status: 'error',
      message: 'Invalid link contact admin'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email.includes('@') || !password) {
      throw new Error('Please provide email and password');
    }
    const user = await getUserByEmail(email);
    if (user?._id) {
      if (!user?.isEmailVerified) {
        return res.json({
          status: "error",
          message: "Please verify your email.",
        })
      } else if (user?.status === 'inactive') {
        return res.json({
          status: "error",
          message: "Your account is locked. Please contact the administrator",
        })
      }
      const isMatch = comparePassword(password, user.password);
      if (isMatch) {
        return res.json({
          status: 'success',
          message: 'user logged in',
          tokens: getTokens(email)
        })
      }
    }
    res.json({
      status: 'error',
      message: 'Invalid login details'
    })
  } catch (error) {
    next(error)
  }
})



router.get("/", auth, (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;
    res.json({
      status: "success",
      message: "Successfully logged in",
      user: req.userInfo
    });
  } catch (error) {
    next(error);
  }
});

export default router;