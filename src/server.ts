import express from "express";
import dotenv from "dotenv";
import connectDB from "./config";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import morgan from "morgan";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);

const server = app.listen(5000, async () => {
  await connectDB();
  console.log("Server running on port 5000");
});

export { app, server };
