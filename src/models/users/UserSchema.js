import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        index: 1,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshJWT: {
        type: String,
        default: '',
    }
},
    {
        timestamps: true,
    }
)

export default mongoose.model('users', UserSchema)