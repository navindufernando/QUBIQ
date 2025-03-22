import { ReactNode, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Layout for authenticated users
const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex overflow-hidden">
      {isSidebarVisible && <Sidebar />}
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Protected Route Wrapper
const ProtectedRoute = ({ children, requiredRole }: { children: ReactNode; requiredRole?: string }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/roleselection" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* PUBLIC ROUTES (NO NAVBAR OR SIDEBAR) */}
      <Route path="/" element={<QubiqLandingPage />}/>
      <Route path="/roleselection" element={ <RoleSelection />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      {/* AUTHENTICATED ROUTES (WITH NAVBAR & SIDEBAR) */}
      {isAuthenticated && (
        <Route
          path="/*"
          element={
            <AuthenticatedLayout>
              <Routes>
                <Route path="/dev/dashboard" element={<ProtectedRoute requiredRole={UserType.DEV}><DevDashboard /></ProtectedRoute>} />
                <Route path="/pm/dashboard" element={<ProtectedRoute requiredRole={UserType.PM}><PMDashboard /></ProtectedRoute>} />
                <Route path="/message" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
                <Route path="/review" element={<ProtectedRoute><ProjectReview /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/project" element={<ProtectedRoute><Project /></ProtectedRoute>} />
                <Route path="/project/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
