import React from 'react'

const NavBar = ({ setPage }) => {
  return (
    <>
      <button onClick={() => {setPage('home')}}>Home</button>
      <button onClick={() => {setPage('dashboard')}}>Dashboard</button>
    </>
  )
}

export default NavBar