import express from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { getUserByEmail, insertUser } from "../models/users/UserModel.js";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { signAccessToken, signRefreshJWT } from "../utils/jwt.js";
import { auth } from "../middlewares/auth.js";
import { insertToken } from "../models/session/SessionModel.js";
import { v4 as uuidv4 } from 'uuid'
import { emailVerificationMail } from "../services/email/nodemailer.js";

const router = express.Router();


/***************** Public Controllers ******************/

router.all("/", (req, res, next) => {
  console.log("from all");
  next();
});



// router.post("/", newUserValidation, async (req, res, next) => {
//   try {
//     req.body.password = hashPassword(req.body.password);
//     const user = await insertUser(req.body);
//     if (user?._id) {
//       const obj = {
//         token: uuidv4(),
//         associate: user.email
//       }
//       const result = insertToken(obj);

//       if (result?._id) {
//         return res.json({
//           status: "success",
//           message: "We have sent you an email to verify your account. Please check your inbox/junk and click on the link to verify.",
//         })
//       }
//       res.json({
//         status: "error",
//         message: "Unable to create user. Please contact administration",
//       }
//     }

//     // user?._id
//     //   ? res.json({
//     //     status: "success",
//     //     message: "We have sent you an email to verify your account. Please check your inbox/junk and click on the link to verify.",
//     //     user
//     //   })
//     //   : res.json({
//     //     status: "error",
//     //     message: "Unable to create user. Please try again",
//     //   });
//   } catch (error) {
//     if (error.message.includes('E11000 duplicate key')) {
//       error.status = '200';
//       error.message = 'Email already in use...'
//     }
//     next(error);
//   }
// });


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

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email.includes('@') || !password) {
      throw new Error('Please provide email and password');
    }
    const user = await getUserByEmail(email);
    if (user?._id) {
      const isMatch = comparePassword(password, user.password);
      if (isMatch) {
        return res.json({
          status: 'success',
          message: 'user logged in',
          tokens: {
            accessJWT: signAccessToken({ email }),
            refreshJWT: signRefreshJWT(email)
          }
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


/************** Private Controllers *****************/

// router.get("/", auth, (req, res, next) => {
//   try {
//     req.userInfo.refreshJWT = undefined;
//     req.userInfo.__v = undefined;
//     res.json({
//       status: "success",
//       message: "todo GET",
//       user: req.userInfo
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/", (req, res, next) => {
  try {
    // req.userInfo.refreshJWT = undefined;
    // req.userInfo.__v = undefined;
    res.json({
      status: "success",
      message: "todo GET",
      user: req.userInfo
    });
  } catch (error) {
    next(error);
  }
});

export default router;