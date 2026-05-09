import React from 'react'
import { useState } from 'react'
import './App.css'
import Home from './components/Home.tsx'
import Dashboard from './components/Dashboard.tsx'
import NavBar from './components/NavBar.tsx'
function App() {
  const [ page, setPage ] = useState('home')
  const [ chatOpen, setChatOpen ] = useState(false)
  const [text, setText ] = useState('') 
  const [ messages, setMessages ] = useState<{role: string, content: string}[]>([])

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSend = async () => {
    if (!text) return

    const userMessage = {role: 'user', content: text}
    setMessages(prev => [...prev, userMessage])
    setText('')

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: text})
      })

      const data = await response.text()

      setMessages(prev => [...prev, { role: 'ai', content: data }])
    } catch(err) {
      console.log(err)
    }
  }

  
  return (
    <>
      <NavBar setPage={setPage}/>
      {page === 'home' ?    <Home /> : <Dashboard />}
      {chatOpen && <div className='chat-box'>
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'user-message' : 'ai-message'}>
              {msg.content}
            </div>
          ))}
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder='message'
          />
          <button className='send-button' style={{width: '44px', padding: '10px 14px'}} onClick={() => handleSend()}>↑</button>
        </div>
      </div>}
      <button className='chat-bubble' onClick={() => setChatOpen(!chatOpen)}>💬</button>
    </>
  )
}

export default App
