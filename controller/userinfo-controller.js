import jwt from "jsonwebtoken";
import pool from "../utils/db.js";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  pool.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data || data.length === 0) {
      return res.status(404).json("User not found");
    }
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("Not logged in!");

  const q =
    "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES');
    pool.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        decoded.userId,
      ],
      (err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          if (data.affectedRows > 0) {
            return res.json("Updated!");
          } else {
            return res.status(403).json("You can update only your post!");
          }
        }
      }
    );   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
