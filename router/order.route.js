import express from "express";
import { createOrder } from "../controller/order.controller.js";

const router = express.Router();

// Example route for creating a user
router.post("/create", createOrder);

export default router;
