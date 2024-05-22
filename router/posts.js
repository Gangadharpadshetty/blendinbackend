import express from "express";

import { getPosts, addPost, deletePost } from '../controller/posts-controller.js';

 // Import deletePost function

const router = express.Router();

router.get("/getposts", getPosts);
router.post("/addposts", addPost);
router.delete("/deleteposts", deletePost); // Use the deletePost function

export default router;



