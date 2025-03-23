import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  Tabs,
  Tab,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useNavigate } from "react-router-dom";
import Login from "../Signup&Login/Login";
import Signup from "../Signup&Login/Signup";
import { UserType } from "../../enums/userType";
import Roles from "../Signup&Login/Roles";
import { signin, signup } from "../../services/authAPI";
import { useAuth } from "../Signup&Login/AuthContext";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, user } = useAuth();


  // Determine the current step based on selected role and active tab
  const getCurrentStep = () => {
    if (!selectedRole) return 0;
    return activeTab === "signin" ? 1 : 1;
  };

  const handleRoleSelect = (role: UserType) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "signin" | "signup"
  ) => {
    setActiveTab(newValue);
    setError(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setLoading(true);
    setError(null);

    console.log("Sending role:", selectedRole);
    console.log("Sending role (as string):", selectedRole.toString());

    try {
      if (activeTab === 'signin') {
        const { email, password } = formData;
        const response = await signin(email, password, selectedRole);
        const token = response.data.data.token;

        if (response.success) {
          // Save user to context and redirect
          login(response.data.data, token);

          console.log("API response structure:", response);
          console.log("Token location:", response.data.data.token);
          // Redirect to dashboard based on role
          navigate(`/${selectedRole.toString().toLowerCase()}/dashboard`);
        }
      } else {
        // sign up
        const { email, password, confirmPassword, firstName, lastName } = formData;
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const response = await signup({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          role: selectedRole,
        });

        console.log('response:', response);

        console.log('token:', response.token);

        if (response.success && response.data.data && response.data.data.token) {
          console.log('User data before login:', response.data);

          // Make sure the response.data has all required fields for AuthUser
          const userData = {
            id: response.data.data.id,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            email: response.data.data.email,
            role: response.data.data.role
          };

          // Store user data in context
          login(userData, response.data.data.token);

          // Wait for state update before navigating
          setTimeout(() => {
            console.log('User after login:', user); // Check if user state updates
            navigate(`/${selectedRole.toString().toLowerCase()}/dashboard`);
          }, 100);
        } else {
          setError('Failed to authenticate. Please try again.');
        }
      }
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        console.error("Signup error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset selection
  const handleBack = () => {
    setSelectedRole(null);
    setError(null)
  };

  // Navigate to forgot password page
  const handleForgotPassword = () => {
    navigate(`/${selectedRole}/forgot-password`, {
      state: { role: selectedRole }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #e2ddff 0%, #d8e3ff 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%)",
          animation: "pulse 15s infinite alternate",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0) 70%)",
          animation: "pulse 20s infinite alternate-reverse",
        },
        "@keyframes pulse": {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.1)",
          },
        },
      }}
    >
      {/* Floating geometric elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "7%",
          width: "100px",
          height: "100px",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
          transform: "rotate(15deg)",
          animation: "float 15s infinite ease-in-out",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(129, 140, 248, 0.1)",
          backdropFilter: "blur(5px)",
          animation: "float 20s infinite ease-in-out reverse",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "15%",
          width: "80px",
          height: "80px",
          borderRadius: "16px",
          background: "rgba(99, 102, 241, 0.08)",
          backdropFilter: "blur(5px)",
          transform: "rotate(45deg)",
          animation: "float 18s infinite ease-in-out 2s",
          zIndex: 0,
          "@keyframes float": {
            "0%": {
              transform: "translateY(0) rotate(0deg)",
            },
            "50%": {
              transform: "translateY(-20px) rotate(10deg)",
            },
            "100%": {
              transform: "translateY(0) rotate(0deg)",
            },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          display: "flex",
          alignItems: "center",
          height: 50,
          zIndex: 2,
        }}
      >
        <img
          src="/src/pages/image/QUBIQ.png"
          alt="Qubiq Logo"
          style={{
            width: 180,
            display: "block",
          }}
        />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 6,
            boxShadow: "0 25px 50px -8px rgba(0, 0, 0, 0.15)",
            width: "100%",
            maxWidth: 1100,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(30px)",
            my: 6,
            border: "1px solid rgba(255, 255, 255, 0.85)",
            transition:
              "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.2)",
            },
            overflow: "hidden",
          }}
        >
          {/* Left Section - Welcome and Progress Indicator */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
              color: "white",
              p: { xs: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)",
                zIndex: 0,
              },
            }}
          >
            {/* Decorative elements for the left panel */}
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                right: "15%",
                width: "60px",
                height: "60px",
                opacity: 0.2,
                zIndex: 0,
              }}
            >
              <DataObjectIcon sx={{ fontSize: 60, color: "white" }} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: "15%",
                left: "10%",
                width: "70px",
                height: "70px",
                opacity: 0.15,
                zIndex: 0,
              }}
            >
              <LightbulbIcon sx={{ fontSize: 70, color: "white" }} />
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                position: "relative",
                zIndex: 1,
                letterSpacing: "-0.5px",
              }}
            >
              Welcome to QUBIQ
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 5,
                opacity: 0.9,
                position: "relative",
                zIndex: 1,
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Your gateway to seamless project management and development.
              Create an account or sign in to get started.
            </Typography>

            <Box sx={{ mb: 5, position: "relative", zIndex: 1 }}>
              <Stepper
                activeStep={getCurrentStep()}
                orientation="vertical"
                sx={{
                  "& .MuiStepLabel-label": {
                    color: "white",
                    opacity: 0.8,
                    fontSize: "1.05rem",
                  },
                  "& .MuiStepLabel-label.Mui-active": {
                    color: "white",
                    opacity: 1,
                    fontWeight: 600,
                  },
                  "& .MuiStepLabel-label.Mui-completed": {
                    color: "white",
                    opacity: 0.9,
                  },
                  "& .MuiStepIcon-root": {
                    fontSize: 32,
                    color: "rgba(255,255,255,0.5)",
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "white",
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "white",
                  },
                  "& .MuiStepConnector-line": {
                    borderColor: "rgba(255,255,255,0.3)",
                    borderLeftWidth: 2,
                    minHeight: 40, // Increased spacing between steps
                  },
                }}
              >
                <Step>
                  <StepLabel>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Select Your Role
                    </Typography>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {activeTab === "signin" ? "Sign In" : "Create Account"}
                    </Typography>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Start Using QUBIQ
                    </Typography>
                  </StepLabel>
                </Step>
              </Stepper>
            </Box>

            {selectedRole && (
              <Box
                sx={{
                  mt: "auto",
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  You selected:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  {selectedRole === UserType.DEV ? (
                    <CodeIcon sx={{ mr: 1.5, fontSize: 28 }} />
                  ) : (
                    <ManageAccountsIcon sx={{ mr: 1.5, fontSize: 28 }} /> // Increased icon size
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedRole === UserType.DEV
                      ? UserType.DEV
                      : UserType.PM}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Right Section - Forms */}
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              p: { xs: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            {selectedRole === null ? (
              // Role Selection View
              <>
                <Roles handleRoleSelect={handleRoleSelect} />
              </>
            ) : (
              // Auth Form View (Sign In/Sign Up)
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  {" "}
                  {/* Increased margin */}
                  <Button
                    onClick={handleBack}
                    sx={{
                      color: "#6366f1",
                      "&:hover": {
                        bgcolor: "rgba(99, 102, 241, 0.08)",
                        transform: "translateX(-2px)",
                      },
                      transition: "all 0.2s ease",
                      fontSize: "1rem",
                    }}
                  >
                    ← Back
                  </Button>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      fontWeight: 700,
                      color: "#3730A3",
                      mr: 4,
                      background:
                        "linear-gradient(135deg, #3730A3 0%, #6366f1 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {selectedRole === UserType.DEV
                      ? UserType.DEV
                      : UserType.PM}
                  </Typography>
                </Box>

                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    mb: 5, // Increased margin
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#6366f1",
                      height: "4px", // Increased height
                      borderRadius: "4px",
                    },
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontSize: "1.1rem", // Increased font size
                      transition: "all 0.2s ease",
                      fontWeight: 500,
                      minWidth: 120,
                      py: 1.5,
                    },
                    "& .MuiTab-root.Mui-selected": {
                      color: "#6366f1",
                      fontWeight: 600,
                    },
                  }}
                  centered
                >
                  <Tab label="Sign In" value="signin" />
                  <Tab label="Sign Up" value="signup" />
                </Tabs>

                {activeTab === "signin" ? (
                  // Sign In Form
                  <Login
                    formData={formData}
                    handleFormChange={handleFormChange}
                    handleSubmit={handleSubmit}
                    handleForgotPassword={handleForgotPassword}
                  />
                ) : (
                  // Sign Up Form
                  <Signup
                    formData={formData}
                    handleFormChange={handleFormChange}
                    handleSubmit={handleSubmit}
                    handleForgotPassword={handleForgotPassword}
                  />
                )}

                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 3, color: "#64748B" }}
                >
                  By signing up, you agree to our{" "}
                  <Typography
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                      color: "#6366f1",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Terms of Service
                  </Typography>{" "}
                  and{" "}
                  <Typography
                    variant="body2"
                    component="a"
                    href="#"
                    sx={{
                      color: "#6366f1",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Typography>
              </>
            )}
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default RoleSelection;
