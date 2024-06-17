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

export const getUsers = () => {
    return UserSchema.find();
}

/*UPDATE*/

export const updateUser = async (filter, obj) => {
    console.log(obj);
    return await UserSchema.findOneAndUpdate(filter, obj);
}

export const updateUserbyId = (_id, listItem) => {
    console.log(listItem);
    return UserSchema.findByIdAndUpdate({ _id }, { ...users }, { new: true });
}

/*DELETE ONE or  MANY*/
export const deleteUser = (ids) => {
    return UserSchema.deleteMany({ _id: { $in: ids } });
}