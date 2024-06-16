import express from "express";
import { getFollowersInfo, addFollowerInfo, deleteFollowerInfo } from "../controller/relationship-controller.js"; // Ensure the correct path

const router = express.Router();

router.get("/followers", getFollowersInfo);
router.post("/followers", addFollowerInfo);
router.delete("/followers/:id", deleteFollowerInfo);

export default router;
