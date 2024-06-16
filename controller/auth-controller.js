import pool from '../utils/db.js';
import bcrypt from 'bcryptjs';
import {generateToken} from'../middlewares/auth-middleware.js';



export const registration = async (req, res) => {
    const { firstname,lastname, email, password, phone ,location} = req.body;

    try {
        // CHECK IF USER ALREADY EXISTS
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUsers] = await pool.query(checkUserQuery, [email]);

        if (existingUsers.length > 0) {
            return res.status(409).json('User already exists!');
        }

        // HASH THE PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // INSERT NEW USER INTO DATABASE
        const insertUserQuery = 'INSERT INTO users (firstname,lastname, email, password, phone,location) VALUES (?, ?, ?, ?,?,?)';
        const values = [firstname,lastname, email, hashedPassword, phone,location];

        await pool.query(insertUserQuery, values);

        // Retrieve the user object
        const user = { id: '', email, ...req.body };

        // Generate token
        const token = await generateToken(user);

        const responseMessage = { msg: "User created successfully", token };
        return res.status(200).json(responseMessage);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        const [users] = await pool.query(checkUserQuery, [email]);

        if (users.length === 0) {
            return res.status(409).json('User does not exist!');
        }

        const user = users[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json('Invalid credentials!');
        }

        const token = await generateToken(user);

        const responseMessage = { msg: 'logged successfully', token };
        return res.status(200).json(responseMessage);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};






export const logout = (req, res) => {
    // Get the token from the request cookies
    const token = req.headers.authorization;

    if (!token) {
        // If token is not provided, the user is not logged in
        return res.status(401).json({ message: 'bosdk pehla login kar' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Clear the token from the client-side (e.g., by removing it from local storage or cookies)
        res.clearCookie('jwtToken'); // Example: clearing a JWT token stored in a cookie

        // Respond with a success message
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        // If the token is invalid, the user is not logged in
        return res.status(401).json({ message: 'Unauthorized. Invalid token' });
    }
};








                          /* ******************** */

// import pool from '../utils/db.js'; // Import the MySQL connection pool
// import bcrypt from "bcryptjs";

// export const registration = (req, res) => {
//   // CHECK IF USER ALREADY EXISTS
//   const{username,email,password,phone} =req.body;
//   const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//   pool.query(checkUserQuery, [email], (err, data) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     if (data.length > 0) {
//       return res.status(409).json("User already exists!");
//     }

//     // HASH THE PASSWORD
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(password, salt);[]

//     // INSERT NEW USER INTO DATABASE
//     const insertUserQuery = "INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)";
//     const values = [
//       username,
//       email,
//       hashedPassword,
//       phone,
//     ];

//    const createuser =  pool.query(insertUserQuery, values, (err, data) => {
//       if (err) {
//         return res.status(500).json(err);
//       }
//       return res.status(200).json({msg:usecreated,await createuser.generateTOken()});
//     });
//   });
// };

  
//   // Exporting login function as a named export
//   export const login = (req, res) => {
//     try {
//       // Placeholder response
//       const{email,password} =req.body;
//       const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//       pool.query(checkUserQuery, [email], (err, data) => {
//         if (err) {
//           return res.status(500).json(err);
//         }
//         if (data.length ==0) {
//           return res.status(409).json("User does not  exists!");
//         }
//          res.json(data);
//         const checkpassword=bcrypt.compareSync(password, data[0].password);
//         if(!checkpassword) {
//           return res.status(400).json("invalid credentils!");
//         }

//     res.json({message:"login successfully"})
        
//       })
//     }
          
    
//   catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  

  
