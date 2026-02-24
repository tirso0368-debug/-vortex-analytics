import OpenAI from "openai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo no permitido" });
  }

  try {

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { respuestas } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "Eres un asesor financiero experto en estudiantes con ingresos bajos."
        },
        {
          role: "user",
          content: `Analiza este perfil financiero:\n${JSON.stringify(respuestas)}`
        }
      ],
    });

    res.status(200).json({
      resultado: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error IA" });
  }
}
