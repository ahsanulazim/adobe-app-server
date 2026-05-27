import { ObjectId } from "mongodb";
import client from "../lib/db.js";
import dotenv from "dotenv";
import { ziniPayCreatePayment } from "./zinipay.controller.js";
dotenv.config();

const orderCollection = client.db("adobe-app").collection("orders");

export const createOrder = async (req, res) => {
  const { userId, plan, shippingInfo } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  try {
    const payload = {
      cus_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      cus_email: shippingInfo.email || "",
      amount: totalPrice, // তোমার হিসাব করা totalPrice
      metadata: {
        order_id: new ObjectId().toString(),
        user_id: userId,
      },
      redirect_url: `${process.env.FRONTEND_URL}/cart/checkout/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/cart/checkout/payment-cancelled`,
      webhook_url: `${process.env.SERVER_URL}/zinipay/payment-webhook`,
    };

    console.log(payload);

    const data = await ziniPayCreatePayment(
      payload,
      process.env.ZINIPAY_API_KEY,
    );

    if (data?.payment_url) {
      return res.json({ success: true, paymentUrl: data.payment_url });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment URL not found",
        error: data,
      });
    }
  } catch (err) {
    console.error("Payment create error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Payment session creation failed" });
  }
};
