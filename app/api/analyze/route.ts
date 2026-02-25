import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Analiza este perfil de estudiante:

Edad: ${body.edad}
Ingresos: ${body.ingresos}
Ahorros: ${body.ahorros}
Objetivo: ${body.objetivo}

Dame:
1. Nivel financiero
2. Recomendaciones
3. Riesgos
4. Plan de acción claro
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un experto financiero para jóvenes." },
        { role: "user", content: prompt },
      ],
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error en análisis" }, { status: 500 });
  }
}
