import ProductSchema from "./ProductSchema.js";

export const insertProduct = (obj) => {
    console.log(obj)
    return ProductSchema(obj).save();
}

export const getProduct = ({ filter }) => {
    return ProductSchema.findOne(filter);
}

export const getAllProducts = () => {
    return ProductSchema.find();
}

export const updateProduct = (_id, obj) => {
    return ProductSchema.findByIdAndUpdate(_id, obj);
}

export const deleteProduct = (_id) => {
    return ProductSchema.findByIdAndDelete(_id);
}

export const deleteManyProduct = filter => {
    return ProductSchema.deleteMany(filter);
}