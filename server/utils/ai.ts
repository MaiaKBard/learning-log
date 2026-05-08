import { GoogleGenAI } from "@google/genai"

  const AIResponse = async(text, type) => {
  try {
    if (!text) return
    let response
    const limitedText = text.slice(0, 500)
    const client = new GoogleGenAI( {apiKey: process.env.GEMINI_API_KEY})
    if (type === 'Breakdown/Summary') {
      response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents:`You are a learning assistant for developers. Analyze the following web page content and provide: 1) A concise summary of what this page is about, 2) The key concepts covered, 3) The most important things to remember. Keep it clear and practical for a developer who is learning. Content: ${limitedText}`
      })
    } else if (type === 'Deeper Dive') {
      response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents:`You are a learning assistant for developers. Based on the following web page content, suggest: 1) 3-5 related topics the developer should explore next, 2) Specific resources or documentation they should check out, 3) A practical exercise or project idea to reinforce what they learned. Content: ${limitedText}`
      })
    } else {
      response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents:`You are a learning assistant for developers. Analyze the following web page content and provide: 1) A concise summary of what this page is about, 2) The key concepts covered, 3) The most important things to remember, 4) 3-5 related topics to explore next, 5) A practical exercise to reinforce learning. Content: ${limitedText}`
      })
    }

    return response.text
 } catch(err) {
  console.log(err)
 }
}

export default AIResponse