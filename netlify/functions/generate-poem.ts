import OpenAI from "openai";

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { topic } = await req.json();

    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const client = new OpenAI({
      apiKey: Deno.env.get("OPENAI_API_KEY")
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a creative poet." },
        { role: "user", content: `Write a short, beautiful poem about: ${topic}` }
      ]
    });

    const poem = response.choices[0].message.content.trim();

    return new Response(JSON.stringify({ poem }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (error) {
    console.error("AI error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate poem." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
