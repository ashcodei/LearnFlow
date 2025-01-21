import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { OAuth2Client, TokenPayload } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "your_google_client_id";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

interface GoogleTokenPayload extends TokenPayload {
    name: string;
    email: string;
    sub: string; // Google user ID
  }

// User Registration
router.post("/register", async (req, res): Promise<any> => {
    const { name, email, password, role, additionalInfo } = req.body;
  
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        ...additionalInfo, // Save extra fields
      });
  
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: "1h" });
  
      res.status(201).json({ message: "User registered successfully", token, user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// User Login
router.post("/login", async (req, res): Promise<any> => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password || "");
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/google", async (req, res) => {
    const { token } = req.body;
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
  
      const { name, email, sub: googleId } = ticket.getPayload();
  
      let user = await User.findOne({ googleId });
  
      if (!user) {
        // Create a new user with a "pending" profile
        user = new User({ name, email, googleId, role: "pending" });
        await user.save();
      }
  
      const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Google Sign-Up successful", token: jwtToken, user });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Google Sign-Up failed" });
    }
  });
  
  

export default router;
