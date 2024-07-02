import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [20, 'Long names are not allowed']
    },
    status: {
        type: String,
        default: 'inactive'
    },
    slug: {
        type: String,
        unique: true,
        index: 1,
        required: true,
    },
    sku: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
    },
    saleStart: {
        type: Date,
        default: '',
    },
    saleEnd: {
        type: Date,
        default: '',
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        default: [],
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model('products', ProductSchema)