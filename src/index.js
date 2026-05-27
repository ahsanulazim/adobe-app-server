import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../router/user.route.js";
import orderRouter from "../router/order.route.js";
import zinipayRouter from "../router/zinipay.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://adobe-gnt.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/zinipay", zinipayRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
