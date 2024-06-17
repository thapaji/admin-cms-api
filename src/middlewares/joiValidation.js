import Joi from "joi";

const STR = Joi.string();
const STR_REQUIRED = Joi.string().required();
const STR_EMAIL = Joi.string().email({ minDomainSegments: 2 });
const PHONE = Joi.string().allow('', null)

const joiValiValidator = ({ req, res, next, schema }) => {
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
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().required(),
    });

    return joiValiValidator({ req, res, next, schema });
};