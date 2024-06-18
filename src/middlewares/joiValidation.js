import Joi from "joi";

const SHORT_STR = Joi.string().max(100).allow("", null);
const SHORT_STR_REQ = Joi.string().max(100).required();

const LONG_STR = Joi.string().max(5000).allow("", null);
const LONG_STR_REQ = Joi.string().max(5000).allow("", null);

const PHONE = Joi.number().allow('', null)
const PHONE_REQ = Joi.number().required();

const EMAIL = Joi.string().email({ minDomainSegments: 2 }).allow("", null);
const EMAIL_REQ = Joi.string().email({ minDomainSegments: 2 }).required();

const validator = ({ req, res, next, schema }) => {
    try {
        const { error } = schema.validate(req.body);
        error
            ? res.json({
                status: "error",
                message: error.message,
            })
            : next();
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const newUserValidation = (req, res, next) => {

    const schema = Joi.object({
        fname: SHORT_STR_REQ,
        lname: SHORT_STR_REQ,
        email: EMAIL_REQ,
        password: SHORT_STR_REQ,
    });

    return validator({ req, res, next, schema });
};