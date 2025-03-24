import { ReactNode, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DevDashboard from "./pages/Dashboard-dev/DevDashboard";
import PMDashboard from "./pages/Dashboard-pm/PMDashboard";
import Messages from "./pages/Messages/Messages";
import Members from "./pages/Members/Members";
import ProjectReview from "./pages/ProjectReview/ProjectReview";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/profile/profile";
import Project from "./pages/Projects/Project";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import QubiqLandingPage from "./pages/Landing/QubiqLandingPage";
import RoleSelection from "./pages/Landing/RoleSelection";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword";
import { UserType } from "./enums/userType";
import { AuthProvider, useAuth } from "./pages/Signup&Login/AuthContext";
import Pricing from "./pages/Pricing/Pricing";
import Success from "./pages/Pricing/Success";
import Cancel from "./pages/Pricing/Cancel";

// Layout for authenticated users
const AuthenticatedLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex overflow-hidden">
      {isSidebarVisible && <Sidebar />}
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6">
          <Outlet /> {/* This renders the nested route components */}
        </div>
      </div>
    </div>
  );
};

// Protected Route Wrapper
const ProtectedRoute = ({ children, requiredRole }: { children: ReactNode; requiredRole?: UserType }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/roleselection" replace />;
  }

  // Check role requirements if specified
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on actual role
    if (user?.role === UserType.DEV) {
      return <Navigate to="/dev/dashboard" replace />;
    } else if (user?.role === UserType.PM) {
      return <Navigate to="/pm/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<QubiqLandingPage />} />
          <Route path="/roleselection" element={<RoleSelection />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* AUTHENTICATED ROUTES */}
          <Route element={<AuthenticatedLayout />}>
            {/* Developer Routes */}
            <Route 
              path="/dev/dashboard" 
              element={
                <ProtectedRoute requiredRole={UserType.DEV}>
                  <DevDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Project Manager Routes */}
            <Route 
              path="/pm/dashboard" 
              element={
                <ProtectedRoute requiredRole={UserType.PM}>
                  <PMDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Common Protected Routes */}
            <Route path="/message" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            
            <Route path="/members" element={
              <ProtectedRoute>
                <Members />
              </ProtectedRoute>
            } />
            
            <Route path="/review" element={
              <ProtectedRoute>
                <ProjectReview />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="/project" element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            } />
            
            <Route path="/project/:id" element={
              <ProtectedRoute>
                <ProjectDetail />
              </ProtectedRoute>
            } />
          </Route>
          {/* CATCH-ALL REDIRECT */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

