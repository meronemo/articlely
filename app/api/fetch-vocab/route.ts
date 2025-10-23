import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI, Type } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { article } = body

    const difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'

    const vocabResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        Extract 10-15 key vocabulary words from this article for English learners.
        Include only words at the "${difficulty}" difficulty level.
        For each word provide:
        - word
        - definition (simple, clear)
        - difficulty
        Article:
        ${article.content}
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        word: { type: Type.STRING },
                        definition: { type: Type.STRING },
                        difficulty: { type: Type.STRING, enum: [difficulty] }
                    },
                    propertyOrdering: ["word", "definition", "difficulty"],
                },
            },
        },
    })

    const responseText = vocabResponse.text
    
    if (!responseText) {
        return NextResponse.json(
            { error: "Failed to generate vocabularies" },
            { status: 500 }
        )
    }
    
    const vocabularies = JSON.parse(responseText)

    return NextResponse.json(vocabularies, { status: 200 })
}