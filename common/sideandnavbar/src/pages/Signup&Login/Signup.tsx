import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

type SignUpProps = {
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
    handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleForgotPassword: () => void;
};

const Signup: React.FC<SignUpProps> = ({formData, handleFormChange, handleSubmit, handleForgotPassword}) => {
  return (
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
                      endIcon={<CheckCircleOutline />}
                    >
                      Create Account
                    </Button>
                  </Box>
  )
}

export default Signup
