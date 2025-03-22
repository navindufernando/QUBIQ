import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DevDashboard from "./pages/Dashboard-dev/DevDashboard";
import Messages from "./pages/Messages/Messages";
import Members from "./pages/Members/Members";
import ProjectReview from "./pages/ProjectReview/ProjectReview";
import Settings from "./pages/Settings/Settings";
import { UserType } from "./enums/userType";
import PMDashboard from "./pages/Dashboard-pm/PMDashboard";
import Profile from "./pages/profile/profile";
import Project from "./pages/Projects/Project";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import QubiqLandingPage from "./pages/Landing/QubiqLandingPage";
import RoleSelection from "./pages/Landing/RoleSelection";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword";
import Pricing from "./pages/Pricing/Pricing";
import Success from "./pages/Pricing/Success";
import Cancel from "./pages/Pricing/Cancel";

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>(UserType.DEV);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <BrowserRouter>
      <div className="flex">
        {isAuthenticated && isSidebarVisible && <Sidebar />}
        <div className="flex-1">
          {isAuthenticated && <Navbar toggleSidebar={toggleSidebar} />}
          <div className={isAuthenticated ? "flex-1 p-6" : "w-full"}>
            <Routes>
              {/* Public routes */}
              <Route path="/landing" element={<QubiqLandingPage />} />
              <Route path="/RoleSelection" element={<RoleSelection />} />
              <Route
                path="/:role/ForgotPassword"
                element={<ForgotPassword />}
              />

              {/* Default route - redirect to role selection after landing */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Home />
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    user === UserType.DEV ? (
                      <DevDashboard />
                    ) : (
                      <PMDashboard />
                    )
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />
              <Route
                path="/message"
                element={
                  isAuthenticated ? (
                    <Messages />
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route
                path="/members"
                element={
                  isAuthenticated ? (
                    <Members />
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />
              <Route
                path="/review"
                element={
                  isAuthenticated ? (
                    <ProjectReview />
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />
              <Route
                path="/settings"
                element={
                  isAuthenticated ? (
                    <Settings />
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  isAuthenticated ? (
                    <Profile />
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />
              <Route
                path="/project"
                element={
                  isAuthenticated ? (
                    <Project />
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />
              <Route
                path="/project/:id"
                element={
                  isAuthenticated ? (
                    <ProjectDetail />
                  ) : (
                    <Navigate to="/landing" replace />
                  )
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
