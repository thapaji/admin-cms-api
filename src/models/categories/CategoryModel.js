import CategorySchema from "./CategorySchema.js";

export const insertCategory = (obj) => {
    console.log(obj)
    return CategorySchema(obj).save();
}

export const getCategory = ({ filter }) => {
    return CategorySchema.findOne(filter);
}

export const deleteCategory = filter => {
    return CategorySchema.findOneAndDelete(filter);
}

export const deleteManyCategory = filter => {
    return CategorySchema.deleteMany(filter);
}