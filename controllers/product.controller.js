import { Product } from "../model/product.model.js";

export const createProduct = async (req, res, next) => {

    try {
        const { name, description, price, images, category, location } = req.body;
        const seller = req.user._id; // assuming you have user authentication implemented
        const product = new Product({
            name,
            description,
            price,
            images,
            seller,
            category,
            location,
        });
        const savedProduct = await product.save();
        res.send({ data: savedProduct, succeeded: true, status: 201, message: "Product created Successfully" })
    } catch (error) {
        next(error);
    }
};