import React from 'react'
import { useState } from 'react'
import './App.css'
import Home from './components/Home.tsx'
import Dashboard from './components/Dashboard.tsx'
import NavBar from './components/NavBar.tsx'
function App() {
  const [ page, setPage ] = useState('home')
  
  return (
    <>
      <NavBar setPage={setPage}/>
      {page === 'home' ?    <Home /> : <Dashboard />}
    </>
  )
}

export default App
