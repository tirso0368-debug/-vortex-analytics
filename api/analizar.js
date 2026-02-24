export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ mensaje: "API funcionando ✅" });
  }

  try {
    const { respuestas } = req.body;

    const prompt = `
Eres un asesor financiero experto en estudiantes jóvenes.

Analiza estas respuestas:
${JSON.stringify(respuestas)}

Genera:

1. Perfil financiero del estudiante
2. Nivel de riesgo (bajo, medio, alto)
3. Recomendaciones personalizadas
4. Estrategia para generar ingresos
5. Consejos claros y motivadores

Habla en español.
Hazlo exclusivo y profesional.
`;

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await openaiResponse.json();

    const texto =
      data.choices?.[0]?.message?.content ||
      "No se pudo generar el análisis.";

    return res.status(200).json({ resultado: texto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
