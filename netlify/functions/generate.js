const axios = require('axios');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { topic = '', prompt, context } = body;
  const apiKey = process.env.SHECODES_API_KEY;

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'SHECODES_API_KEY not configured' }) };
  }

  const usedPrompt = prompt || `Generate a Romantic poem about ${topic}.`;
  const usedContext = context || 'You are a romantic poem expert. Generate a short 4-line poem in basic HTML and separate each line with a <br />. Do not include a title or signature.';

  try {
    const resp = await axios.get('https://api.shecodes.io/ai/v1/generate', {
      params: { prompt: usedPrompt, context: usedContext, key: apiKey },
      timeout: 15000,
    });

    const poem = (resp.data && resp.data.answer) ? resp.data.answer : JSON.stringify(resp.data);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poem }),
    };
  } catch (err) {
    console.error('SheCodes error:', err?.response?.data || err.message);
    return { statusCode: 502, body: JSON.stringify({ error: 'Error generating poem' }) };
  }
};
