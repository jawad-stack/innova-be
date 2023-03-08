
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roleType: {
        type: String,
        enum: ['customer', 'vendor'],
        required: true
    },
    roleId: {
        type: Number,
        required: true
    },
    // vendorProfile: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Vendor'
    // }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);