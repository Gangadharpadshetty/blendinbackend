import { Router } from "express";
import { registration } from '../controller/auth-controller.js';
import { login } from '../controller/auth-controller.js';
import { authenticate } from "../middlewares/auth-middleware.js";
import {logout} from "../controller/auth-controller.js";
import { loginSchema,signupSchema }  from "../validator/auth-validator.js";   
import { validate } from "../middlewares/validate-middleware.js";              
const router = Router();
router.route("/logout").post(logout);
router.route("/login").post(login,authenticate,validate(loginSchema));
router.route("/register").post(registration,validate(signupSchema));

export default router;



