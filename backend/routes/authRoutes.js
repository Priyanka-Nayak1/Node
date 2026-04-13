import express from "express";
import { logIn, logout, refreshToken, signUp } from "../controllers/authController.js";
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;