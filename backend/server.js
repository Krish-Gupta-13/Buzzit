import express from "express";
import path from "path";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:3000", "https://your-production-url.com"], // Allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies and credentials
};
app.use(cors(corsOptions)); // Apply the CORS middleware


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notification", notificationRoutes);


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
    connectMongoDB();
})
