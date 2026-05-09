import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import scraperURL from './utils/scraper.ts'
import AIResponse from './utils/ai.ts'
import Resource from './models/ResourceModel.ts'

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
app.post('/home', async (req, res) => {
  const { URL, type } = req.body
  const { text, title } = await scraperURL(URL)

  const content =  await AIResponse(text)
  if (!content) return res.status(500).send('AI failed')
  const cleaned = content.replace(/```json\n?|\n?```/g, '').trim()
  const { summary, breakdown, deeperDive } = JSON.parse(content)
  await Resource.create({url:URL, title, summary, breakdown, deeperDive})
 
  if (type === 'Breakdown/Summary') {
    res.send({breakdown, summary})
  } else if (type === 'Deeper Dive') {
    res.send(deeperDive)
  } else {
    res.send({breakdown, summary, deeperDive})
  }
})

app.get('/dashboard', async (req, res) => {
  const resources = await Resource.find()
  res.send(resources)
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
