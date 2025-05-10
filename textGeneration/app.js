import { GoogleGenAI } from "@google/genai";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  res.json({ response: response.text });
});

app.listen(3000, () => {
  console.log("express app started at 3000 ...");
});
