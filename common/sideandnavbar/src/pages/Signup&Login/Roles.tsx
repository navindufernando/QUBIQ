import { CodeOutlined, ManageAccountsOutlined } from '@mui/icons-material'
import { Typography, Divider, Box, Card, alpha, Button } from '@mui/material'
import React from 'react'
import { UserType } from '../../enums/userType';

type RolesProps = {
  handleRoleSelect: (role: UserType) => void;
}

const Roles: React.FC<RolesProps> = ({ handleRoleSelect }) => {
  return (
    <><Typography
      variant="h3"
      component="h1"
      sx={{
        mb: 3,
        fontWeight: 700,
        color: "#3730A3",
        background: "linear-gradient(135deg, #3730A3 0%, #6366f1 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.5px",
      }}
    >
      Select Your Role
    </Typography><Typography
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
      </Typography><Divider sx={{ mb: 5, opacity: 0.6 }} />{ " " }
  {/* Increased margin */ }
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
      onClick={() => handleRoleSelect(UserType.DEV)}
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
          <CodeOutlined sx={{ fontSize: 50, color: "#6366f1" }} />{" "}
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
      onClick={() => handleRoleSelect(UserType.PM)}
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
          <ManageAccountsOutlined
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
  )
}

export default Roles
