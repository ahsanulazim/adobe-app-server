import client from "../lib/db.js";
import dotenv from "dotenv";
dotenv.config();

const orderCollection = client.db("adobe-app").collection("orders");

export const createOrder = async (req, res) => {
  const { userId, plan, shippingInfo } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
};
