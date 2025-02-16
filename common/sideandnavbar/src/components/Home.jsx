// components/Home.jsx
import React from 'react'
import Navbar from './Navbar'

const Home = ({ toggleSidebar }) => {
  return (
    <div className='w-full'>
      <Navbar toggleSidebar={toggleSidebar} />
    </div>
  )
}

export default Home