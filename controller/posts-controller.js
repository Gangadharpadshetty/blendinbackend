import pool from '../utils/db.js';
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = async(req, res) => {
     const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

  if (!token) return res.status(401).json("Not logged in!");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES');
    const q =
        userId !== "undefined"
          ? `SELECT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
          : `SELECT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
      LEFT JOIN followinfo AS f ON (p.userId = f.following_id AND f.follower_id = ?) WHERE f.follower_id = ? OR p.userId = ?
      ORDER BY p.created_at DESC`;
      const values =
      userId !== "undefined" ? [userId, userId] : [decoded.id, decoded.id, decoded.id];
      await pool.query(q, values, ( data));
      return res.status(200).json(data);
      
  } catch (error) {
    res.status(500).json({message: error.message});
    console.log(error );
  }
};




export const addPost = async(req, res) => {
  const token = req.headers.authorization;



  if (!token) return res.status(401).json("Not logged in!");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES');
    const q = "INSERT INTO posts(`desc`, `img`, `created_at`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      decoded.userId,
    ];
    await  pool.query(q, [values], ( data));
    return res.status(200).json("Post has been created.");
  
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
};

export const deletePost = async(req, res) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ error: "No token provided" });
  }
  
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'JWTTOKENSECRETKEYTHISSERIES');
  const q =
  "DELETE FROM posts WHERE `id`=? AND `userId` = ?";
  await pool.query(q, [req.params.id, decoded.id], (data) );
  if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
  return res.status(403).json("You can delete only your post")
} catch (error) {
  res.status(500).json({message: error.message});
}

};