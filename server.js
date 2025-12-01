// server.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate poem route
app.post("/generate-poem", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required." });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a brilliant poet." },
        { role: "user", content: `Write a short 4-line poem about: ${topic}` }
      ]
    });

    const poem = response.choices[0].message.content.trim();
    res.json({ poem });

  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({ error: "Failed to generate poem." });
  }
});

// Port fix for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

