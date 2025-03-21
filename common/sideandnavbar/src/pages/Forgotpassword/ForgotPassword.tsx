import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { role } = useParams<{ role: string }>();

  useEffect(() => {
    // Validate that we have a valid role
    if (role !== "developer" && role !== "project-manager") {
      navigate("/RoleSelection");
    }
  }, [role, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    // Here you would call your password reset API
    console.log("Reset requested for:", email);
    setSubmitted(true);
    setError("");
  };

  const handleBackToSignIn = () => {
    navigate("/RoleSelection");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E2DDFF 0%, #D8E3FF 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0) 70%)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          display: "flex",
          alignItems: "center",
          height: 40,
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
        maxWidth="md"
        sx={{
          py: 6,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)",
            width: "100%",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            my: 6,
            border: "1px solid rgba(255, 255, 255, 0.8)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 25px 50px -10px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Button
              onClick={handleBackToSignIn}
              sx={{
                color: "#6366f1",
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: "rgba(99, 102, 241, 0.08)",
                  transform: "translateX(-2px)",
                },
                transition: "all 0.2s ease",
              }}
              startIcon={<ArrowBackIcon fontSize="medium" />}
            >
              Back to Role Selection
            </Button>
          </Box>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: "#3730A3",
              background: "linear-gradient(135deg, #3730A3 0%, #6366f1 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            Reset Your Password
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 5,
              color: "#64748B",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {role === "developer" ? "Developer" : "Project Manager"} Account
          </Typography>

          {submitted ? (
            <Alert
              severity="success"
              sx={{
                mb: 4,
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(84, 214, 44, 0.12)",
                color: "#229A16",
                fontSize: "1.1rem",
                "& .MuiAlert-icon": {
                  color: "#229A16",
                  fontSize: "2rem",
                },
              }}
            >
              Password reset instructions sent! Please check your email.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 4,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 72, 66, 0.12)",
                    color: "#B71C1C",
                    fontSize: "1.1rem",
                    "& .MuiAlert-icon": {
                      color: "#B71C1C",
                      fontSize: "2rem",
                    },
                  }}
                >
                  {error}
                </Alert>
              )}

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "#64748B",
                  fontSize: "1.1rem",
                }}
              >
                Enter your email address and we'll send you instructions to
                reset your password.
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 1.5, fontWeight: 500, fontSize: "1.1rem" }}
              >
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{ style: { fontSize: "1.1rem", padding: "15px" } }}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
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
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  background: "linear-gradient(90deg, #6366f1, #818cf8)",
                  py: 1.8,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(90deg, #4f46e5, #6366f1)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 15px rgba(99, 102, 241, 0.35)",
                  },
                }}
              >
                Send Reset Instructions
              </Button>
            </Box>
          )}

          <Box sx={{ mt: 5, textAlign: "center" }}>
            {" "}
            {/* Increased margin top */}
            <Typography
              variant="body1"
              sx={{ color: "#64748B", fontSize: "1.05rem" }}
            >
              {" "}
              {/* Increased font size */}
              Need help?{" "}
              <span
                style={{
                  color: "#6366f1",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
              >
                Contact support
              </span>
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
