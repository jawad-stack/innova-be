import express from "express";
import { createOrder, getOrdersForCustomer, getOrdersForSeller } from "../controllers/order.controller.js";

const router = express.Router()

router.post('/create', createOrder)
// router.post('/getAllOrdersForCustomer/:id', getOrdersForCustomer)
// router.post('/getAllOrdersForSeller/:id', getOrdersForSeller)

export default router;