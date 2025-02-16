// App.jsx
import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Sidebar from './components/Sidebar'

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  return (
    <div className='flex'>
      {isSidebarVisible && <Sidebar />}
      <Home toggleSidebar={toggleSidebar} />
    </div>
  )
}

export default App