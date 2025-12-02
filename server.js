// server.js - proxy for AI requests
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SHECODES_API = 'https://api.shecodes.io/ai/v1/generate';

app.post('/generate', async (req, res) => {
  const { topic = '', prompt, context } = req.body || {};
  const apiKey = process.env.SHECODES_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'SHECODES_API_KEY not configured on server' });
  }

  const usedPrompt = prompt || `Generate a Romantic poem about ${topic}.`;
  const usedContext = context || 'You are a romantic poem expert. Generate a short 4-line poem in basic HTML and separate each line with a <br />. Do not include a title or signature.';

  try {
    const response = await axios.get(SHECODES_API, {
      params: { prompt: usedPrompt, context: usedContext, key: apiKey },
      timeout: 15000,
    });

    const poem = (response.data && response.data.answer) ? response.data.answer : JSON.stringify(response.data);
    res.json({ poem });
  } catch (err) {
    console.error('Error calling SheCodes API:', err?.response?.data || err.message);
    res.status(502).json({ error: 'Error generating poem' });
  }
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Poem generator server listening on ${PORT}`));

