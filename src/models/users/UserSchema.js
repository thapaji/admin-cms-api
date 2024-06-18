import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        maxLength: [20, 'Long names are not allowed']
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
    status: {
        type: String,
        default: 'inactive',
    },
    role: {
        type: String,
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
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