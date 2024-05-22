import express from "express";
import authRoute from "./router/auth-router.js";
import commentRoute from "./router/comments.js";
import likeRoute from "./router/likes.js";
import userRoute from "./router/users.js";
import homeRoute from "./router/home-router.js";
import postsRoute from './router/posts.js';
import relationroute from './router/relationships.js';

import cors from 'cors';
import cookieParser from "cookie-parser";
const app=express();

// Middleware to parse JSON bodies
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: (origin, callback) => {
    // Check if the origin is allowed
    const allowedOrigins = [
      "http://localhost:3000",
      
      "'http://192.168.56.1:3000'",
      
    ];
    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
// Define routes
app.use("/api/auth", authRoute);
app.use("/api/comments", commentRoute);
app.use("/api/likes", likeRoute);
app.use("/api/users", userRoute);
app.use("/api/home", homeRoute);
app.use("/api/posts", postsRoute);
app.use("/api/relationroute", relationroute); 

const PORT = process.env.PORT || 5001;


app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
