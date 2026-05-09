import React from 'react'
import { useState } from 'react'

const Home = () => {
  const [ text, setText ] = useState('')
  const [ response, setResponse ] = useState('')
  const [loading, setLoading ] = useState(false)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  
  const resetResponse = async (type:string) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          URL:text,
          type
        })
      })
      const data = await response.text()

      setResponse(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
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
      <button onClick={() => {resetResponse('Both')}}>
        Both
      </button>
      <button onClick={() => {resetResponse('Breakdown/Summary')}}>
        Breakdown/Summary
      </button>
      <button onClick={() => {resetResponse('Deeper Dive')}}>
        Deeper Dive
      </button>
      {loading && <p>Loading...</p>}
      <p>
        {response}
      </p>
    </>
  )
}

export default Home