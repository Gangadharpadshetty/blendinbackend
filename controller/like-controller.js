import pool from '../utils/db.js';
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  try {
    const q = "SELECT userId FROM likes WHERE postId = ?";
    pool.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(like => like.userId));
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addLike = async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES');
    const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?, ?)";
    const values = [
      decoded.userId,
      req.body.postId
    ];

    await pool.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLike = (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES');
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    pool.query(q, [decoded.userId, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
