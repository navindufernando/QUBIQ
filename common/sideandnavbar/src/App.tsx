import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DevDashboard from './pages/Dashboard-dev/DevDashboard'
import Messages from './pages/Messages/Messages'
import Members from './pages/Members/Members'
import ProjectReview from './pages/ProjectReview/ProjectReview'
import Settings from './pages/Settings/Settings'
import { UserType } from './enums/userType'
import PMDashboard from './pages/Dashboard-pm/PMDashboard'
import Profile from './pages/profile/profile'

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true)
  const [user, setUser] = useState<UserType>(UserType.PM)

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  return (
    <BrowserRouter>
      <div className='flex'>
        {isSidebarVisible && <Sidebar />}
        <div className='flex-1'>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className='flex-1 p-6'>
            <Routes>
              <Route path="/" element={<Home />} />
              {user === UserType.DEV ? (
                <Route path="/dashboard" element={<DevDashboard />} />
              ) : (
                <Route path="/dashboard" element={<PMDashboard />} />
              )}
              <Route path="/message" element={<Messages />} />
              <Route path="/members" element={<Members />} />
              <Route path="/review" element={<ProjectReview />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App