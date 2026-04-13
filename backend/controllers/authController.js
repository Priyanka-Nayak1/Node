import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        //Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        //Validate password strength
        const isStrong = validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        });

        if (!isStrong) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
            });
        }


        const [existing] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        await db.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }


        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = rows[0];


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);


        await db.execute(
            "UPDATE users SET refreshToken = ? WHERE id = ?",
            [refreshToken, user.id]
        );


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Login successful",
            accessToken,
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};


export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const [rows] = await db.execute(
        "SELECT * FROM users WHERE id = ? AND refreshToken = ?",
        [decoded.id, token]
    );

    if (!rows.length) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(rows[0]);

    res.json({ accessToken: newAccessToken });
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        // If no token → user already logged out
        if (!refreshToken) {
            return res.status(204).json({ message: "No token, already logged out" });
        }

        // Remove refresh token from DB
        await db.execute(
            "UPDATE users SET refreshToken = NULL WHERE refreshToken = ?",
            [refreshToken]
        );

        // Clear cookie from browser
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: false, // true in production (HTTPS)
        });

        res.json({ message: "Logged out successfully" });

    } catch (err) {
        res.status(500).json({
            message: "Logout failed",
            error: err.message
        });
    }
};