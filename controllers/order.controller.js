import { Order } from '../model/order.model.js';
import { Product } from '../model/product.model.js';
import { User } from '../model/user.model.js';
import { PRODUCT_STATUS } from '../utils/config.js';

// Create a new order
export const createOrder = async (req, res, next) => {
    try {
        // Get the product ID and quantity from the request body
        const productId = req.body.productId;
        const quantity = req.body.quantity || 1;

        // Find the product in the database
        const product = await Product.findById(productId);

        // If the product is not found, return an error
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if there is enough quantity available for the order
        if (product.quantity < quantity) {
            return res.status(400).json({ error: 'Insufficient quantity available' });
        }

        // Create a new order document
        const order = new Order({
            product: product._id,
            customer: req.user._id,
            seller: product.seller,
            quantity: quantity
        });

        // Save the order to the database
        await order.save();

        // Update the product quantity and status to 'sold'
        product.quantity -= quantity;
        if (product.quantity === 0) {
            product.statusId = PRODUCT_STATUS.Sold;
        }
        await product.save();

        // Update the user's purchases array with the new order
        const user = await User.findById(req.user._id);
        user.purchases.push(order._id);
        await user.save();

        // Return the new order
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

// Get all orders for a seller
export const getOrdersForSeller = async (req, res, next) => {
    try {
        // Find all orders where the seller ID matches the user ID in the request
        const orders = await Order.find({ seller: req.user._id })
            .populate('product')
            .populate('customer', 'username');

        // Return the orders as a JSON response
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

// Get all orders for a customer
export const getOrdersForCustomer = async (req, res, next) => {
    try {
        // Find all orders where the customer ID matches the user ID in the request
        const orders = await Order.find({ customer: req.user._id })
            .populate('product')
            .populate('seller', 'username');

        // Return the orders as a JSON response
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};