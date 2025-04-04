import express from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  getOrdersPage,
  getOrdersSuccessPage,
} from "../controllers/orderController.js";
const router = express.Router();

router.get("/order/form", getOrdersPage);
router.post("/order/form", createOrder);
router.get("/order", getOrders);
router.get("/order/:orderId", getOrderById);
router.get("/order/success/:orderId", getOrdersSuccessPage);

export default router;