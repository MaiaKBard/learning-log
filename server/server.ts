import express from 'express'

const app = express()
const PORT = 3000

// routes
app.get('/test', (req, res) => {
  res.send("YAYA")
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
