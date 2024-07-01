import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [20, 'Long names are not allowed']
    },
    status: {
        type: String,
        default:'inactive'
    },
    slug: {
        type: String,
        unique: true,
        index: 1,
        required: true,
    },
},
    {
        timestamps: true,
    }
)

export default mongoose.model('categoties', CategorySchema)