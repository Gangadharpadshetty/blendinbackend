import pool  from "../utils/db";
import jwt from "jsonwebtoken";
export const getFollowersInfo = async (req, res) => {
    const q = "SELECT followerUserId FROM followersInfo WHERE followedUserId = ?";
  
    try {
        const [rows] = await pool.query(q, [req.query.followedUserId]);
        const followerUserIds = rows.map(follower => follower.followerUserId);
        return res.status(200).json(followerUserIds);
    } catch (err) {
        return res.status(500).json(err);
    }
  };


export const addFollowerInfo = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json("Not logged in!");
    const q = "INSERT INTO followersInfo (`followerUserId`, `followedUserId`) VALUES (?, ?)";

    try {
        const userInfo = jwt.verify(token, jwt_secret_key||JWTTOKENSECRETKEYTHISSERIES);
        const values = [userInfo.id, req.body.userId];

        const [result] = await pool.query(q, values);
        
        return res.status(200).json("Following");
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json("Token is not valid!");
        }
        return res.status(500).json(err);
    }
};


export const deleteFollowerInfo = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json("Not logged in!");
    const q = "DELETE FROM followersInfo WHERE `followerUserId` = ? AND `followedUserId` = ?";

    try {
        const userInfo = jwt.verify(token, jwt_secret_key||JWTTOKENSECRETKEYTHISSERIES);
        const values = [userInfo.userId, req.query.userId];

        const [result] = await pool.query(q, values);

        return res.status(200).json("Unfollowed");
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json("Token is not valid!");
        }
        return res.status(500).json(err);
    }
};
