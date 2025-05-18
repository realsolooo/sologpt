import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <- set this in Vercel dashboard!
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages))
      return res.status(400).json({ error: "Invalid messages" });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const reply = response.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI request failed" });
  }
}
