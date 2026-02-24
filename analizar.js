export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { respuestas } = req.body;

    const prompt = `
Eres un analista psicológico experto.

Usuario respondió:
${JSON.stringify(respuestas)}

Debes:
1. Saludar al usuario
2. Dar un diagnóstico profundo realista
3. Explicar patrones de personalidad
4. Detectar bloqueos mentales
5. Dar recomendaciones prácticas
6. Lenguaje cercano y humano
`;

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "Eres un psicólogo experto en comportamiento humano." },
          { role: "user", content: prompt }
        ],
        temperature: 0.8
      })
    });

    const data = await completion.json();

    const diagnostico = data.choices[0].message.content;

    res.status(200).json({ diagnostico });

  } catch (error) {
    res.status(500).json({ error: "Error analizando" });
  }
}
