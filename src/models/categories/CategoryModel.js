import CategorySchema from "./CategorySchema.js";

export const insertCategory = (obj) => {
    console.log(obj)
    return CategorySchema(obj).save();
}

export const getCategory = ({ filter }) => {
    return CategorySchema.findOne(filter);
}

export const getAllCategories = () => {
    return CategorySchema.find();
}

export const updateCategory =  (_id, obj ) => {
    return  CategorySchema.findByIdAndUpdate(_id, obj);
}

export const deleteCategory = (_id) => {
    return CategorySchema.findByIdAndDelete(_id);
}

export const deleteManyCategory = filter => {
    return CategorySchema.deleteMany(filter);
}