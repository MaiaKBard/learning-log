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
  console.log('route hit!')
  try {
    const { URL, type } = req.body
    const { text, title } = await scraperURL(URL)

    if (!text || text.trim() === '') {
      return res.status(400).send('Could not read/scrape content from URL')
    }

    const content =  await AIResponse(text)

    if (!content) return res.status(500).send('Could not generate a response, please try again')

    const cleaned = content.replace(/```json\n?|\n?```/g, '').trim()
    const { summary, breakdown, deeperDive } = JSON.parse(cleaned)
    const deeperDiveString = Array.isArray(deeperDive) ? JSON.stringify(deeperDive) : deeperDive

    await Resource.create({url:URL, title, summary, breakdown, deeperDive: deeperDiveString})
  
    if (type === 'Breakdown/Summary') {
      res.send({breakdown, summary})
    } else if (type === 'Deeper Dive') {
      res.send(deeperDive)
    } else {
      res.send({breakdown, summary, deeperDive})
    }
  } catch (err) {
    console.log('Route error:', err)
    res.status(500).send('Server error')
  }
})

app.get('/dashboard', async (req, res) => {
  try {
    const resources = await Resource.find()
    res.send(resources)
  } catch(err) {
    console.log('Route error:', err)
    res.status(500).send('Server error')
  }
})

app.delete('/dashboard/:id', async (req, res) => {
  console.log('delete route hit, id:', req.params.id)
  try {
    const { id } = req.params

    await Resource.deleteOne({ _id:id})
    res.status(200).send('Deleted')
  } catch (err) {
    console.log('Route error:', err)
    res.status(500).send('Server error')
  }
})

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body
    const content = await AIResponse(message, true)
    
    res.send(content)
  } catch(err) {
    console.log(err)
    res.status(500).send('Chat failed')
  }
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send({ error : err })
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
