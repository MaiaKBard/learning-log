import React from 'react'
import { useState } from 'react'

const Home = () => {
  const [ text, setText ] = useState('')
  const [ response, setResponse ] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const resetResponse = async () => {
    const response = await fetch('http://localhost:3000/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({URL:text})
    })
    const data = await response.text()

    setResponse(data)
  }
  return (
    <>
      <h1>Learning Log</h1>
      <p>Input URL & get a breakdown with a summary OR deeper learning suggestions OR both!</p>
      <label>
        Enter URL:
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder='Type Here...'
        />
      </label>
      <button onClick={resetResponse}>
        Both
      </button>
      <button>
        Breakdown/Summary
      </button>
      <button>
        Deeper Dive
      </button>
      <p>
        {response}
      </p>
    </>
  )
}

export default Home