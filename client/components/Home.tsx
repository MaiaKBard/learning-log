import React from 'react'
import { useState } from 'react'

const Home = () => {
  const [ text, setText ] = useState('')
  const [ response, setResponse ] = useState<{summary?: string, breakdown?: string, deeperDive?: string} | string>('')
  const [loading, setLoading ] = useState(false)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  
  const resetResponse = async (type:string) => {
    if (!text) {
      return setResponse('Please enter a URL')
    }
  
    setLoading(true)
    setResponse('')
    try {
      const response = await fetch('http://localhost:3000/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          URL:text,
          type
        })
      })
      const data = await response.json()

      setResponse(data)
    } catch (err) {
      setResponse('Something went wrong, please try again')
    } finally {
      setLoading(false)
      setText('')
    }
  }


  return (
    <>
      <div className="home-container">
        <p className="page-label">HOME PAGE</p>
        <h2>YOUR LEARNING COMPANION</h2>
        <h1>Input a URL, get instant insights</h1>
        <p>Paste any delveloper resource and get a breakdown, summary, or deeper dive suggestions - all saved to your dashboard.</p>
        <div className="input-row">
          <label>
            <div className="url-input">
              <input
                type="text"
                value={text}
                onChange={handleChange}
                placeholder='https://developer.mozilla.org/...'
              />
            </div>
          </label>
        </div>
        <div className='btn-group'>
          <button className="btn-primary" onClick={() => {resetResponse('Both')}}>
            Both
          </button>
          <button onClick={() => {resetResponse('Breakdown/Summary')}}>
            Breakdown/Summary
          </button>
          <button onClick={() => {resetResponse('Deeper Dive')}}>
            Deeper Dive
          </button>
        </div>
        {loading && <p>Loading...</p>}
       
        {typeof response === 'string' ? (
          <p>{response}</p>
        ) : (
          <div className="output-box">
            {response.summary && (
              <>
              <h2>Summary</h2>
              <p>{response.summary}</p>
              </>
            )}
            {response.breakdown && (
              <>
              <h2>Breakdown</h2>
              <p>{response.breakdown}</p>
              </>
            )}
            {response.deeperDive && (
              <>
              <h2>Deeper Dive</h2>
              <p>{response.deeperDive}</p>
              </>
              )}
          </div>
        )}
      </div>
    </>
  )
}

export default Home