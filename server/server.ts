import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import scraperURL from './utils/scraper.ts'

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
  const content = await scraperURL(URL)
 
  res.send(content)
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
