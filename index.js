import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import hotelRouter from "./routes/hotels.js";
import roomRouter from "./routes/rooms.js";
import userRouter from "./routes/users.js";

const app = express();
dotenv.config();

//CONNECTION
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//MIDDLEWARE
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});

//SERVER CALL
app.listen(5050, () => {
  connect();
  console.log(`connected backend on port ${process.env.PORT}`);
});
