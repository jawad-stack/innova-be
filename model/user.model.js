
import mongoose from "mongoose";
import { ROLE_TYPES } from "../utils/config.js";
import { Product } from "./product.model.js";

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
        enum: ["Admin", "Seller", "Customer"],
        required: true
    },
    roleId: {
        type: Number,
        enum: [ROLE_TYPES.Admin, ROLE_TYPES.Seller, ROLE_TYPES.Customer],
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);