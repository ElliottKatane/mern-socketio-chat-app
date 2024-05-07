import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/sockets.js";

dotenv.config();
// consts
const PORT = process.env.PORT || 5000;

//A placer avant les routes (app.use /api/auth...), pour que le serveur puisse parser le body (req.body)
app.use(express.json());
app.use(cookieParser());
// middleware
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
