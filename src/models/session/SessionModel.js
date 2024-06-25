import SessionSchema from "./SessionSchema.js";

export const insertToken = (obj) => {
    console.log(obj)
    return SessionSchema(obj).save();
}

export const getToken = token => {
    return SessionSchema.findOne({ token });
}

export const deleteSession = filter => {
    return SessionSchema.findOneAndDelete(filter);
}

export const deleteManySession = filter => {
    return SessionSchema.deleteMany(filter);
}