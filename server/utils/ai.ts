import { GoogleGenAI } from "@google/genai"

  const AIResponse = async(text) => {
  try {
    if (!text) return
    const limitedText = text.slice(0, 500)
    const client = new GoogleGenAI( {apiKey: process.env.GEMINI_API_KEY})
   
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents:`You are a learning assistant for developers. Analyze the following web page content and return ONLY a raw JSON object with no markdown formatting, no code blocks, no backticks. All values must be plain strings. Use this exact structure:
        {"summary": "string here", "breakdown": "string here", "deeperDive": "string here"}
        Content: ${limitedText}`
      })

    return response.text
 } catch(err) {
  console.log('AIResponse error:', err)
 }
}

export default AIResponse