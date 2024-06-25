import mongoose from 'mongoose'

const SessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    associate: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model('session', SessionSchema)