import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import setupSwagger from "./swagger.js";

const app = express();

app.use(bodyParser.json());

setupSwagger(app);

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

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token created
 *       400:
 *         description: User already exists
 */
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user and return a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token returned
 *       401:
 *         description: Invalid Credentials
 */
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !user.comparePassword(password))
      return res.status(401).json({ message: "Invalid Credentials" });

    const token = generateToken(user);

    return res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Log in failed" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Give access to sensitive data
 *     tags: [Auth]
 *     security:
 *      - Bearer: []
 *     responses:
 *       200:
 *         description: Message and user returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *       401:
 *         description: Unauthorized – token not provided or invalid
 *       403:
 *         description: Forbidden – token valid but not enough privileges
 */
app.get("/profile", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ message: "Welcome to the protected area", user });
});

app.listen(process.env.PORT, () =>
  console.log(`Rodando em http://localhost:${process.env.PORT}`)
);

export default app;
