import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Card,
  TextField,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
      light: "#E2DDFF",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#1E293B",
      light: "#64748B",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 800,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 16px rgba(99, 102, 241, 0.3)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      p: 3,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 20px -5px rgba(99, 102, 241, 0.25)",
      },
      border: "1px solid rgba(99, 102, 241, 0.2)",
      borderRadius: 2,
      background: "rgba(255, 255, 255, 0.8)",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: "50%",
          bgcolor: "rgba(99, 102, 241, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "#1E293B", mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#64748B", flex: 1 }}>
        {description}
      </Typography>
    </Box>
  </Card>
);

const QubiqLandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/role-selection");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // navigation items withfunctionality
  const navItems = [
    { label: "Product", path: "/product" },
    { label: "Solutions", path: "/solutions" },
    { label: "Pricing", path: "/pricing" },
    { label: "Enterprise", path: "/enterprise" },
  ];

  const renderMobileDrawer = () => (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 280, p: 2 }} role="presentation">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src="/src/pages/image/QUBIQ.png"
            alt="QUBIQ Logo"
            style={{ width: "120px", height: "auto" }}
          />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.label}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#6366f1",
              "&:hover": {
                bgcolor: "#4f46e5",
              },
              fontWeight: 600,
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <ThemeProvider theme={theme}>
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
              "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)",
            zIndex: 0,
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
              "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
            zIndex: 0,
          },
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
            py: 1,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "60px",
                  }}
                >
                  <img
                    src="/src/pages/image/QUBIQ.png"
                    alt="QUBIQ Logo"
                    style={{
                      width: "180px",
                      height: "auto",
                    }}
                  />
                </Box>
              </Box>

              {!isMobile ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {navItems.map((item) => (
                      <Box key={item.label} sx={{ position: "relative" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            color: "#1E293B",
                            py: 1,
                            "&:hover": {
                              color: "#6366f1",
                            },
                          }}
                          onClick={() => navigate(item.path)}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              "&:hover": {
                                color: "#6366f1",
                              },
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#6366f1",
                        "&:hover": {
                          bgcolor: "#4f46e5",
                        },
                        fontWeight: 600,
                        px: 3,
                      }}
                      onClick={handleGetStarted}
                    >
                      Sign In
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <img
                      src="/src/pages/image/QUBIQ.png"
                      alt="QUBIQ Logo"
                      style={{
                        width: "140px",
                        height: "auto",
                      }}
                    />
                  </Box>
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={toggleDrawer(true)}
                    sx={{ color: "#1E293B" }}
                  >
                    <MenuIcon />
                  </IconButton>
                  {renderMobileDrawer()}
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: "#1E293B",
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Get more done with{" "}
                <Box component="span" sx={{ color: "#6366f1" }}>
                  QUBIQ
                </Box>{" "}
                tasks.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#64748B", mb: 4, fontSize: "1.125rem" }}
              >
                Plan, organize, and collaborate on any project with task
                management that can be customized for every need.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  mb: 4,
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Enter your work email"
                  fullWidth
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#6366f1",
                    "&:hover": {
                      bgcolor: "#4f46e5",
                    },
                    whiteSpace: "nowrap",
                    px: 4,
                  }}
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box sx={{ display: "flex" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      sx={{ color: "#FFB547", fontSize: 20 }}
                    />
                  ))}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#64748B", ml: 1, fontWeight: 500 }}
                >
                  Coming soon to app stores
                </Typography>
              </Box>

              <Typography
                variant="subtitle2"
                sx={{
                  color: "#6366f1",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                FREE FOREVER. NO CREDIT CARD.
              </Typography>
            </Box>

            <Box sx={{ flex: 1, position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                    background: "rgba(99, 102, 241, 0.1)",
                    zIndex: 0,
                  },
                }}
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 1,
                    p: 0,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/src/pages/image/image-1.png"
                    alt="QUBIQ Dashboard Preview"
                    sx={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </Card>
              </Box>
            </Box>
          </Box>
        </Container>

        <Box sx={{ bgcolor: "white", py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#1E293B", mb: 2 }}
              >
                Why teams choose QUBIQ
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748B",
                  mb: 2,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                Streamline your workflow with powerful features designed for
                teams of all sizes
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ flex: "1 1 250px" }}>
                <FeatureCard
                  icon={
                    <FormatListBulletedIcon
                      sx={{ fontSize: 28, color: "#6366f1" }}
                    />
                  }
                  title="Task Management"
                  description="Create, assign, and track tasks with easy-to-use interfaces for everyone on your team."
                />
              </Box>
              <Box sx={{ flex: "1 1 250px" }}>
                <FeatureCard
                  icon={
                    <DashboardIcon sx={{ fontSize: 28, color: "#6366f1" }} />
                  }
                  title="Custom Dashboards"
                  description="Provides comprehensive individual and team productivity metrics for informed decision-making."
                />
              </Box>
              <Box sx={{ flex: "1 1 250px" }}>
                <FeatureCard
                  icon={<PeopleIcon sx={{ fontSize: 28, color: "#6366f1" }} />}
                  title="Team Collaboration"
                  description="Comment, share files, and update status in real-time to keep everyone aligned."
                />
              </Box>
              <Box sx={{ flex: "1 1 250px" }}>
                <FeatureCard
                  icon={
                    <CheckCircleIcon sx={{ fontSize: 28, color: "#6366f1" }} />
                  }
                  title="Real Time Code analysis"
                  description="Automated code review and instant feedback on code quality, with real-time suggestions for improvement."
                />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* How It Works Section*/}
        <Box sx={{ bgcolor: "#F8FAFC", py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#1E293B", mb: 2 }}
              >
                How QUBIQ works
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748B",
                  mb: 4,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                A simple, intuitive workflow for teams of all sizes
              </Typography>
            </Box>

            <Grid container spacing={5} alignItems="center">
              {[
                {
                  number: "01",
                  title: "Create Projects & Tasks",
                  description:
                    "Set up your workspace in minutes. Create projects, add tasks, and organize them your way.",
                  image: "/src/pages/image/project-tracking.webp",
                },
                {
                  number: "02",
                  title: "Invite Your Team",
                  description:
                    "Collaboration is simple. Invite team members and assign tasks based on roles and responsibilities.",
                  image: "/src/pages/image/project-team-roles.jpg",
                },
                {
                  number: "03",
                  title: "Track Progress",
                  description:
                    "Monitor progress with customizable views. See what's done, what's in progress, and what's coming up next.",
                  image: "/src/pages/image/Track-progress.png",
                },
              ].map((step, index) => (
                <Grid
                  item
                  xs={12}
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    flexWrap: { xs: "wrap", md: "nowrap" },
                    mb: 4,
                  }}
                >
                  <Box
                    sx={{
                      flex: "1 1 50%",
                      p: { xs: 2, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        color: "rgba(99, 102, 241, 0.1)",
                        fontWeight: 900,
                        fontSize: { xs: "4rem", md: "6rem" },
                        lineHeight: 1,
                        mb: 2,
                      }}
                    >
                      {step.number}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#1E293B",
                        mb: 2,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#64748B" }}>
                      {step.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: "1 1 50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    <Card
                      sx={{
                        overflow: "hidden",
                        width: "100%",
                        maxWidth: "500px",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Box
                        component="img"
                        src={step.image}
                        alt={`Step ${step.number}: ${step.title}`}
                        sx={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Key Features Section*/}
        <Box sx={{ bgcolor: "white", py: { xs: 6, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#1E293B", mb: 2 }}
              >
                Key Features
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748B",
                  mb: 4,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                Everything you need to manage projects efficiently
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  icon: <FormatListBulletedIcon sx={{ fontSize: 24 }} />,
                  title: "Flexible Task Views",
                  description:
                    "List, board, calendar, and timeline views to visualize your work in different ways.",
                },
                {
                  icon: <SpeedIcon sx={{ fontSize: 24 }} />,
                  title: "Performance Analytics",
                  description:
                    "Track progress and identify bottlenecks with powerful reporting and analytics.",
                },
                {
                  icon: <PeopleIcon sx={{ fontSize: 24 }} />,
                  title: "Team Workload",
                  description:
                    "Balance workloads across team members for optimal productivity.",
                },
                {
                  icon: <SettingsIcon sx={{ fontSize: 24 }} />,
                  title: "Customizable Workflows",
                  description:
                    "Create custom statuses and workflows that match your team's processes.",
                },
                {
                  icon: <CodeIcon sx={{ fontSize: 24 }} />,
                  title: "AI-Powered Code Suggestions",
                  description:
                    "Real-time coding assistance, code optimization, and error prevention.",
                },
                {
                  icon: <CheckCircleIcon sx={{ fontSize: 24 }} />,
                  title: "Goal Tracking",
                  description:
                    "Set and track goals to keep your team aligned and motivated.",
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid rgba(99, 102, 241, 0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.2)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          bgcolor: "rgba(99, 102, 241, 0.1)",
                          color: "#6366f1",
                          mr: 2,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#1E293B" }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#64748B" }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Call to Action Section */}
        <Box
          sx={{
            py: { xs: 8, md: 12 },
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: "url('/api/placeholder/1920/1080') center/cover",
              opacity: 0.1,
            },
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Card
                sx={{
                  p: { xs: 4, md: 6 },
                  textAlign: "center",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Typography variant="h3" gutterBottom sx={{ color: "#1E293B" }}>
                  Ready to Transform Your Workflow?
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "#64748B", mb: 4 }}
                >
                  Join our early access program and be among the first to
                  experience QUBIQ. Get exclusive benefits and priority support.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: 400,
                    mx: "auto",
                  }}
                >
                  <TextField
                    variant="outlined"
                    placeholder="Enter your work email"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #4f460%, #3730a3 100%)",
                      },
                      py: 1.5,
                    }}
                  >
                    Join Early Access
                  </Button>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 2, color: "#64748B" }}
                >
                  Limited spots available. No credit card required.
                </Typography>
              </Card>
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: "#1E293B", color: "white", pt: 8, pb: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 4 }}>
                  <img
                    src="/src/pages/image/QUBIQ.png"
                    alt="QUBIQ Logo"
                    style={{
                      width: 140,
                      height: "auto",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)", mb: 3, maxWidth: 300 }}
                >
                  Building the future of task management. Join us on our mission
                  to transform how teams work together.
                </Typography>
                <Stack direction="row" spacing={2}>
                  {[
                    { icon: <LinkedInIcon />, label: "LinkedIn" },
                    { icon: <InstagramIcon />, label: "Instagram" },
                  ].map((social) => (
                    <IconButton
                      key={social.label}
                      aria-label={social.label}
                      sx={{
                        color: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                        "&:hover": {
                          bgcolor: "#6366f1",
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12} md={8}>
                <Grid container spacing={4}>
                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", mb: 2, fontWeight: 600 }}
                    >
                      Product
                    </Typography>
                    <Stack spacing={1.5}>
                      {["Features", "Roadmap", "Beta Program", "Pricing"].map(
                        (item) => (
                          <Typography
                            key={item}
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.7)",
                              cursor: "pointer",
                              "&:hover": { color: "#6366f1" },
                            }}
                          >
                            {item}
                          </Typography>
                        )
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", mb: 2, fontWeight: 600 }}
                    >
                      Company
                    </Typography>
                    <Stack spacing={1.5}>
                      {["About", "Careers", "Contact", "Blog"].map((item) => (
                        <Typography
                          key={item}
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            cursor: "pointer",
                            "&:hover": { color: "#6366f1" },
                          }}
                        >
                          {item}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", mb: 2, fontWeight: 600 }}
                    >
                      Resources
                    </Typography>
                    <Stack spacing={1.5}>
                      {["Documentation", "Help Center", "API", "Status"].map(
                        (item) => (
                          <Typography
                            key={item}
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.7)",
                              cursor: "pointer",
                              "&:hover": { color: "#6366f1" },
                            }}
                          >
                            {item}
                          </Typography>
                        )
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", mb: 2, fontWeight: 600 }}
                    >
                      Legal
                    </Typography>
                    <Stack spacing={1.5}>
                      {["Privacy", "Terms", "Security", "Cookies"].map(
                        (item) => (
                          <Typography
                            key={item}
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.7)",
                              cursor: "pointer",
                              "&:hover": { color: "#6366f1" },
                            }}
                          >
                            {item}
                          </Typography>
                        )
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                © {new Date().getFullYear()} QUBIQ. All rights reserved.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  "& img": {
                    height: 32,
                    filter: "grayscale(1) brightness(2)",
                    opacity: 0.7,
                    transition: "opacity 0.2s",
                    "&:hover": {
                      opacity: 1,
                    },
                  },
                }}
              ></Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default QubiqLandingPage;
