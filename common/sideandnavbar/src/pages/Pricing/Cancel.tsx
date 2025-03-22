import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h3" className="text-red-600 font-bold">
        Payment Canceled
      </Typography>
      <Typography variant="h6" className="text-gray-700 mt-2">
        Your payment was not completed.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        className="mt-4"
        onClick={() => navigate("/pricing")}
      >
        Try Again
      </Button>
    </div>
  );
};

export default Cancel;
