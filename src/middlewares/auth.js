import { getToken } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/users/UserModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        // console.log(authorization)
        const decoded = verifyAccessJWT(authorization);
        if (decoded?.email) {
            const tokenObj = await getToken(authorization)
            const user = await getUserByEmail(decoded.email)
            if (user?._id) {
                user.__v = undefined;
                user.password = undefined;
                req.userInfo = user;
                return next()
            }
        }
        let message = ''
        const statusCode = decoded === 'Invalid Token' ? 403 : 401
        res.status(statusCode).json({
            message: decoded === 'Invalid Token' ? 'jwt expired' : 'Unauthorised',
            status: 'error'
        })
    } catch (error) {
        next(error)
    }
}

export const isAdmin = async (req, res, next) => {
    req.userInfo.role === 'admin' ? next() : res.status(403).json({ message: 'You are not authorized to perform this action' });
}