import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({ username, password });
    await user.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to register a new user" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Rodando em http://localhost:${process.env.PORT}`)
);

export default app;
