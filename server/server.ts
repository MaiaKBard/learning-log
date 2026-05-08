import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import scraperURL from './utils/scraper.ts'
import AIResponse from './utils/ai.ts'

dotenv.config()

const app = express()
const PORT = 3000

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
  const { URL } = req.body
  const text = await scraperURL(URL)
  
  // const content =  await AIResponse(text)
  res.send('this is a fake ai response')
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
