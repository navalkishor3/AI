import { GoogleGenAI, Modality } from "@google/genai";
import express from "express";
import * as fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMNI_API_KEY });

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  // Set responseModalities to include "Image" so the model can generate  an image
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      fs.writeFileSync(`gemini-native-image-${timestamp}.png`, buffer);
      res.json({
        response: `Image saved as gemini-native-image-${timestamp}.png`,
      });
    }
  }
});

app.listen(3000, () => {
  console.log("express server started at 3000 ...");
});
