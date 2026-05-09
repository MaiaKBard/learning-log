import { GoogleGenAI } from "@google/genai"

const AIResponse = async(text, isChat = false) => {
  try {
    if (!text) return
    const limitedText = isChat ? text : text.slice(0, 3000)
    const prompt = isChat ? text : `You are a learning assistant for developers. Analyze the following web page content and return ONLY a raw JSON object with no markdown formatting, no code blocks, no backticks. Use double quotes for all keys and values. Use this exact structure:
        {"summary": "A 3-4 sentence summary explaining what this page covers, why it matters, and when a developer would use it", "breakdown": "A clear explanation of the key concepts, how they work, and the most important things to remember. Include any gotchas or common mistakes.", "deeperDive": "3-4 specific related topics to explore next, each with a one sentence explanation of why it is relevant. Then suggest one practical project or exercise idea that would reinforce what was learned on this page."}
        Content: ${limitedText}`

    const client = new GoogleGenAI( {apiKey: process.env.GEMINI_API_KEY})
   
      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${prompt}`
      })

    return response.text
 } catch(err) {
  console.log('AIResponse error:', err)
  throw err
 }
}

export default AIResponse