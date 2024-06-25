import UserSchema from "./UserSchema.js";

/*CREATE*/
export const insertUser = (user) => {
    console.log(user)
    return UserSchema(user).save();
}

/*READ*/
export const getUserByEmail = (email) => {
    console.log(email)
    return UserSchema.findOne({ email });
}

export const getAUser = (filter) => {
    return UserSchema.findOne( filter );
}

export const getUsers = () => {
    return UserSchema.find();
}

/*UPDATE*/

export const updateUserById = async ({ _id, obj }) => {
    console.log(obj);
    return await UserSchema.findByIdAndUpdate(_id, obj);
}

export const updateUser = async (filter, obj) => {
    console.log(obj);
    return await UserSchema.findOneAndUpdate(filter, obj);
}

/*DELETE ONE or  MANY*/
export const deleteUser = (ids) => {
    return UserSchema.deleteMany({ _id: { $in: ids } });
}