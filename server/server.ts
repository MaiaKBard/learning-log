import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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
app.get('/test', (req, res) => {
  res.send("YAYA")
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
