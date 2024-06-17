import JWT from "jsonwebtoken";
import { insertToken } from "../models/session/SessionModel.js";
import { updateUser } from "../models/users/UserModel.js";


/*************** Create access JWt *******************/

export const signAccessToken = (payload) => {
    const token = JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    insertToken({ token });
    return token;
}

/*************** Verify access JWt *******************/

export const verifyAccessJWT = (token) => {
    try {
        return JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        console.log(error);
        return 'Invalid Token';
    }
}

/*************** Create refresh JWt *******************/
/*************** Create refresh JWt *******************/

export const signRefreshJWT = (email) => {
    const refreshJWT = JWT.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
    updateUser({ email }, { refreshJWT });
    return refreshJWT;
}


/*************** Verify refresh JWt *******************/