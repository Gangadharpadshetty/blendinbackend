import express from "express";
import { getComments, addComment, deleteComment } from "../controller/comment-controller.js";

const router = express.Router();

router.get("/getcomments", getComments);
router.post("/addcomment", addComment);
router.delete("/deletecomment/:id", deleteComment); // Fix route definition for deleteComment

export default router;
