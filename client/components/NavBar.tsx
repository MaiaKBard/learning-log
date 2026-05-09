import React from 'react'

const NavBar = ({ setPage }) => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">Learning Log</div>
        <div className="nav-links">
          <button onClick={() => {setPage('home')}}>Home</button>
          <button onClick={() => {setPage('dashboard')}}>Dashboard</button>
        </div>
      </nav>
    </>
  )
}

export default NavBar