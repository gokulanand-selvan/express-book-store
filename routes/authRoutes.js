import express from "express";
import { login, SignUp } from "../controller/authController.js";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", login);

export default router;
