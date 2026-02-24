export default async function handler(req, res) {
  try {
    const { respuestas, mensaje } = req.body;

    const prompt = `
    Analiza este perfil de estudiante:

    Respuestas:
    ${JSON.stringify(respuestas)}

    Mensaje del usuario:
    ${mensaje || "Sin mensaje"}

    Quiero:
    - Diagnóstico financiero
    - Mentalidad
    - Errores principales
    - Recomendaciones claras
    - Consejos para generar ingresos

    Habla como mentor experto.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres un mentor financiero experto en estudiantes y generación de ingresos."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      resultado: data.choices[0].message.content,
    });

  } catch (error) {
    res.status(500).json({
      error: "Error en IA",
    });
  }
}
