import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("dai mapla database uh vanakkamda");
    app.listen(process.env.PORT, () => {
      console.log(`Vanakkam da mapla port ${process.env.PORT} la irunthu`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// middleware which is used to recive the data in json format
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["content-type"],
  })
);
app.use("/", userRoute);
app.use("/", bookRoutes);
app.use("/signup", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal sever error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
