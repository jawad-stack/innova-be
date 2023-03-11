

import mongoose from "mongoose";
import { PRODUCT_STATUS } from "../utils/config.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [{
        type: String,
        required: false,
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    statusId: {
        type: Number,
        enum: [PRODUCT_STATUS.Active, PRODUCT_STATUS.Sold, PRODUCT_STATUS.Expired],
        default: PRODUCT_STATUS.Active
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Product = mongoose.model('Product', productSchema);