import express from "express";
import uploadOnClodynary from "../utils/cloudinary.js";
import { getPosts, addPost, deletePost } from '../controller/posts-controller.js';
import { authenticate } from "../middlewares/auth-middleware.js";
import {upload} from "../middlewares/multer-middeware.js";
const app = express();
 // Import deletePost function

const router = express.Router();

router.get("/getposts", getPosts);

router.delete("/deleteposts", deletePost); // Use the deletePost function
app.post("/addposts", authenticate, upload.single ("picture"), addPost);
export default router;



