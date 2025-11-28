import OpenAI from "openai";

const handler = async (event: any) => {
  console.log("Function called with method:", event.httpMethod);
  
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const { topic } = JSON.parse(event.body || "{}");
    console.log("Topic received:", topic);

    if (!topic) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Topic is required." })
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    console.log("API Key present:", !!apiKey);
    
    if (!apiKey) {
      console.error("OPENAI_API_KEY not set");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "API key not configured" })
      };
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative poet." },
        { role: "user", content: `Write a short, beautiful poem about: ${topic}` }
      ]
    });

    const poem = response.choices[0]?.message?.content?.trim();
    
    if (!poem) {
      throw new Error("No poem content in response");
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ poem })
    };

  } catch (error: any) {
    console.error("Error:", error?.message || error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: error?.message || "Failed to generate poem" })
    };
  }
};

export { handler };
