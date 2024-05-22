import pool from "../utils/db.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = async(req, res) => {
  const q = `SELECT c.*, u.id AS userId, username, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC
    `;

  try {
    await pool.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json({message:error.message});
  }
};





export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ];

    pool.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = token.header.authorization;
  if (!token) return res.status(401).json("Not authenticated!");
  const q = "DELETE FROM comments WHERE `id` = ? AND `userId` = ?";
  const commentId = req.params.id;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES');
    pool.query(q, [commentId, decoded.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    });
  }
   catch (error) {
      res.status(500).json({message:error.message});
    }
  
  
};
