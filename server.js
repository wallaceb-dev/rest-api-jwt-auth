import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/User.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1m",
    }
  );
};

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, password });
    await user.save();
    const token = generateToken(user);
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to register a new user" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Rodando em http://localhost:${process.env.PORT}`)
);

export default app;
