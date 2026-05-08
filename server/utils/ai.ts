import { GoogleGenAI } from "@google/genai"

  const AIResponse = async(text) => {
  const limitedText = text.slice(1, 3000)
  const client = new GoogleGenAI( {apiKey: process.env.GEMINI_API_KEY})

  const response = await client.models.generateContent({
    model: "gemini-2.0-flash",
    contents:`Create a breakdown and summary of content: ${limitedText}`
  })

  return response.text
}

export default AIResponse