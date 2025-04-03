import express from "express";
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", getPayments);
router.get("/:orderId", getPaymentById);
router.post("/create", createPayment);
router.put("/update", updatePayment);

export default router;
