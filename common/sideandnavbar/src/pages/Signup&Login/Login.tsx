import { CheckCircleOutline } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

type LoginProps = {
    formData: {
        email: string;
        password: string;
    };
    handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleForgotPassword: () => void;
};

const Login: React.FC<LoginProps> = ({ formData, handleFormChange, handleSubmit, handleForgotPassword }) => {

    return (
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
                endIcon={<CheckCircleOutline />}
            >
                Sign In
            </Button>
        </Box>
    )
}

export default Login
