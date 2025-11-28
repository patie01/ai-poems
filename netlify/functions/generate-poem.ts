import OpenAI from "openai";

export default async (req: any, context: any) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    };
  }

  if (req.method !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const { topic } = JSON.parse(req.body);

    if (!topic) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Topic is required." })
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable not set");
    }

    const client = new OpenAI({
      apiKey: apiKey
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative poet." },
        { role: "user", content: `Write a short, beautiful poem about: ${topic}` }
      ]
    });

    const poem = response.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ poem })
    };

  } catch (error: any) {
    console.error("AI error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: error.message || "Failed to generate poem." })
    };
  }
};
