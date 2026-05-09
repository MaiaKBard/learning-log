import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import scraperURL from './utils/scraper.ts'
import AIResponse from './utils/ai.ts'

dotenv.config()

const app = express()
const PORT = 3000

// CORS only allowed access
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

// database connection
try {
  await mongoose.connect(process.env.MONGODB_URI!)
  console.log('Connected to MongoDB!')
} catch( err ) {
  console.log(err)
}
// routes
app.post('/test', async (req, res) => {
  const { URL, type } = req.body
  console.log('URL:', URL, 'type:', type)
  const { text, title } = await scraperURL(URL)
  // console.log('scraped text:', text?.slice(0, 100))

  const content =  await AIResponse(text)
  if (!content) return res.status(500).send('AI failed')
    console.log(content)
  const cleaned = content.replace(/```json\n?|\n?```/g, '').trim()
  const { summary, breakdown, deeperDive } = JSON.parse(content)
 
  if (type === 'Breakdown/Summary') {
    res.send({breakdown, summary})
  } else if (type === 'Deeper Dive') {
    res.send(deeperDive)
  } else {
    res.send({breakdown, summary, deeperDive})
  }
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
