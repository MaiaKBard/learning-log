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
  const text = await scraperURL(URL)
  
  const {content, title} =  await AIResponse(text, type)
  res.send(content)
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
