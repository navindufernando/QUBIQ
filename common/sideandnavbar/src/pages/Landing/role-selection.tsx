import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  Divider,
  TextField,
  Tabs,
  Tab,
  alpha,
  Step,
  StepLabel,
  Stepper,
  Grid,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DataObjectIcon from "@mui/icons-material/DataObject";
import type { UserRole } from "../types";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  // Determine the current step based on selected role and active tab
  const getCurrentStep = () => {
    if (!selectedRole) return 0;
    return activeTab === "signin" ? 1 : 1;
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "signin" | "signup"
  ) => {
    setActiveTab(newValue);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${selectedRole} ${activeTab}:`, formData);
  };

  // Reset selection
  const handleBack = () => {
    setSelectedRole(null);
  };

  // Navigate to forgot password page
  const handleForgotPassword = () => {
    navigate(`/${selectedRole}/forgot-password`);
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
          src="/src/components/image/QUBIQ.png"
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
                  {selectedRole === "developer" ? (
                    <CodeIcon sx={{ mr: 1.5, fontSize: 28 }} />
                  ) : (
                    <ManageAccountsIcon sx={{ mr: 1.5, fontSize: 28 }} /> // Increased icon size
                  )}
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedRole === "developer"
                      ? "Developer"
                      : "Project Manager"}
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
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: "#3730A3",
                    background:
                      "linear-gradient(135deg, #3730A3 0%, #6366f1 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Select Your Role
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: "#64748B",
                    lineHeight: 1.5,
                    maxWidth: "90%", // Limit width for better readability
                  }}
                >
                  Choose your role to continue to the appropriate sign-in page
                  and customize your QUBIQ experience
                </Typography>
                <Divider sx={{ mb: 5, opacity: 0.6 }} />{" "}
                {/* Increased margin */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 4, // Increased gap
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      flex: 1,
                      p: 4,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        boxShadow: "0 20px 40px -8px rgba(99, 102, 241, 0.35)",
                      },
                      border: "1px solid rgba(99, 102, 241, 0.25)",
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.95)",
                      position: "relative",
                      overflow: "hidden",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "5px",
                        background: "linear-gradient(90deg, #6366f1, #818cf8)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover::after": {
                        opacity: 1,
                      },
                    }}
                    onClick={() => handleRoleSelect("developer")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "50%",
                          bgcolor: alpha("#6366f1", 0.1),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: alpha("#6366f1", 0.15),
                            transform: "scale(1.08)",
                          },
                        }}
                      >
                        <CodeIcon sx={{ fontSize: 50, color: "#6366f1" }} />{" "}
                        {/* Increased icon size */}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 600, color: "#1E293B" }}
                      >
                        Developer
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          background:
                            "linear-gradient(90deg, #6366f1, #818cf8)",
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: 3,
                          py: 1.5,
                          fontSize: "1.1rem",
                          boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #4f46e5, #6366f1)",
                            boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        Continue as Developer
                      </Button>
                    </Box>
                  </Card>

                  <Card
                    elevation={0}
                    sx={{
                      flex: 1,
                      p: 4,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        boxShadow: "0 20px 40px -8px rgba(99, 102, 241, 0.35)",
                      },
                      border: "1px solid rgba(99, 102, 241, 0.25)",
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.95)",
                      position: "relative",
                      overflow: "hidden",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "5px",
                        background: "linear-gradient(90deg, #6366f1, #818cf8)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover::after": {
                        opacity: 1,
                      },
                    }}
                    onClick={() => handleRoleSelect("project-manager")}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "50%",
                          bgcolor: alpha("#6366f1", 0.1),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: alpha("#6366f1", 0.15),
                            transform: "scale(1.08)",
                          },
                        }}
                      >
                        <ManageAccountsIcon
                          sx={{ fontSize: 50, color: "#6366f1" }}
                        />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 600, color: "#1E293B" }}
                      >
                        Project Manager
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          background:
                            "linear-gradient(90deg, #6366f1, #818cf8)",
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: 3,
                          py: 1.5,
                          fontSize: "1.1rem",
                          boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #4f46e5, #6366f1)",
                            boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        Continue as PM
                      </Button>
                    </Box>
                  </Card>
                </Box>
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
                    {selectedRole === "developer"
                      ? "Developer"
                      : "Project Manager"}
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
                  <Box component="form" onSubmit={handleSubmit}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={
                        <img
                          src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                          alt="Google"
                          style={{ width: 24, height: 24 }}
                        />
                      }
                      sx={{
                        mb: 4,
                        textTransform: "none",
                        borderColor: "#e0e0e0",
                        color: "#000",
                        "&:hover": {
                          borderColor: "#bdbdbd",
                          backgroundColor: "#fafafa",
                          transform: "translateY(-3px)",
                        },
                        py: 1.5,
                        fontSize: "1.05rem",
                        borderRadius: 3,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Continue with Google
                    </Button>

                    <Typography
                      variant="body1"
                      align="center"
                      sx={{
                        mb: 4,
                        color: "#666",
                        position: "relative",
                        "&::before, &::after": {
                          content: '""',
                          position: "absolute",
                          top: "50%",
                          width: "45%",
                          height: "1px",
                          bgcolor: "#e0e0e0",
                        },
                        "&::before": {
                          left: 0,
                        },
                        "&::after": {
                          right: 0,
                        },
                      }}
                    >
                      OR
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ mb: 1.5, fontWeight: 500 }}
                    >
                      {" "}
                      {/* Increased from body2 */}
                      Work Email
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      placeholder="Enter your work email"
                      variant="outlined"
                      type="email"
                      sx={{
                        mb: 4,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          fontSize: "1.05rem",
                          transition: "all 0.2s ease",
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#6366f1",
                              borderWidth: "2px",
                            },
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#a5b4fc",
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "16px 14px",
                        },
                      }}
                      value={formData.email}
                      onChange={handleFormChange}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1.5,
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {" "}
                        {/* Increased from body2 */}
                        Password
                      </Typography>
                      <Typography
                        variant="body1"
                        component="button"
                        onClick={handleForgotPassword}
                        sx={{
                          color: "#6366f1",
                          textDecoration: "none",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          "&:hover": {
                            textDecoration: "underline",
                            color: "#4f46e5",
                          },
                        }}
                      >
                        Forgot Password?
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      name="password"
                      placeholder="Enter password"
                      variant="outlined"
                      type="password"
                      sx={{
                        mb: 4,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          fontSize: "1.05rem",
                          transition: "all 0.2s ease",
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#6366f1",
                              borderWidth: "2px",
                            },
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#a5b4fc",
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "16px 14px",
                        },
                      }}
                      value={formData.password}
                      onChange={handleFormChange}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={{
                        background: "linear-gradient(90deg, #6366f1, #818cf8)",
                        mb: 3,
                        py: 1.5,
                        fontSize: "1.1rem",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 3,
                        boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #4f46e5, #6366f1)",
                          boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
                          transform: "translateY(-3px)",
                        },
                      }}
                      endIcon={<CheckCircleIcon />}
                    >
                      Sign In
                    </Button>
                  </Box>
                ) : (
                  // Sign Up Form
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="body1"
                          sx={{ mb: 1.5, fontWeight: 500 }}
                        >
                          First Name
                        </Typography>
                        <TextField
                          fullWidth
                          name="firstName"
                          placeholder="Enter first name"
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2.5,
                              fontSize: "1.05rem",
                              transition: "all 0.2s ease",
                              "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#6366f1",
                                  borderWidth: "2px",
                                },
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#a5b4fc",
                              },
                            },
                            "& .MuiInputBase-input": {
                              padding: "16px 14px",
                            },
                          }}
                          value={formData.firstName}
                          onChange={handleFormChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="body1"
                          sx={{ mb: 1.5, fontWeight: 500 }}
                        >
                          Last Name
                        </Typography>
                        <TextField
                          fullWidth
                          name="lastName"
                          placeholder="Enter last name"
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2.5,
                              fontSize: "1.05rem",
                              transition: "all 0.2s ease",
                              "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#6366f1",
                                  borderWidth: "2px",
                                },
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#a5b4fc",
                              },
                            },
                            "& .MuiInputBase-input": {
                              padding: "16px 14px",
                            },
                          }}
                          value={formData.lastName}
                          onChange={handleFormChange}
                        />
                      </Grid>
                    </Grid>

                    <Typography
                      variant="body1"
                      sx={{ mb: 1.5, mt: 3, fontWeight: 500 }}
                    >
                      Work Email
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      placeholder="Enter your work email"
                      variant="outlined"
                      type="email"
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          fontSize: "1.05rem",
                          transition: "all 0.2s ease",
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#6366f1",
                              borderWidth: "2px",
                            },
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#a5b4fc",
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "16px 14px",
                        },
                      }}
                      value={formData.email}
                      onChange={handleFormChange}
                    />

                    <Typography
                      variant="body1"
                      sx={{ mb: 1.5, fontWeight: 500 }}
                    >
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="password"
                      placeholder="Create password"
                      variant="outlined"
                      type="password"
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          fontSize: "1.05rem",
                          transition: "all 0.2s ease",
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#6366f1",
                              borderWidth: "2px",
                            },
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#a5b4fc",
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "16px 14px",
                        },
                      }}
                      value={formData.password}
                      onChange={handleFormChange}
                    />

                    <Typography
                      variant="body1"
                      sx={{ mb: 1.5, fontWeight: 500 }}
                    >
                      Confirm Password
                    </Typography>
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      placeholder="Confirm password"
                      variant="outlined"
                      type="password"
                      sx={{
                        mb: 4,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          fontSize: "1.05rem",
                          transition: "all 0.2s ease",
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#6366f1",
                              borderWidth: "2px",
                            },
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#a5b4fc",
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "16px 14px",
                        },
                      }}
                      value={formData.confirmPassword}
                      onChange={handleFormChange}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={{
                        background: "linear-gradient(90deg, #6366f1, #818cf8)",
                        mb: 3,
                        py: 1.5,
                        fontSize: "1.1rem",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 3,
                        boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #4f46e5, #6366f1)",
                          boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
                          transform: "translateY(-3px)",
                        },
                      }}
                      endIcon={<CheckCircleIcon />}
                    >
                      Create Account
                    </Button>
                  </Box>
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
