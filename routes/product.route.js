import express from "express"
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post('/create', createProduct)
// router.post('/getAllProducts', createProduct)
// router.post('/get/:id', createProduct)
// router.post('/delete', createProduct)

export default router;