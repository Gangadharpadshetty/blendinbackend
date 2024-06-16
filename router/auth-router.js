import { Router } from 'express';
import { registration, login, logout } from '../controller/auth-controller.js';
import { authenticate } from '../middlewares/auth-middleware.js';
import { loginSchema, signupSchema } from '../validator/auth-validator.js';
import { validate } from '../middlewares/validate-middleware.js';
import uploadOnClodynary from '../utils/cloudinary.js';
import {upload} from '../middlewares/multer-middeware.js'
const router = Router();

// Endpoint for logging out
router.post('/logout', async (req, res) => {
  try {
    // Call the logout function
    await logout(req, res);
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for user login
router.route('/login').post(validate(loginSchema),login);

// Endpoint for user registration
router.post('/register',validate(signupSchema),upload.single('picture'),registration);
 

export default router;




