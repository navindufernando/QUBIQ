import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Typography variant="h3" className="text-green-600 font-bold">
        Payment Successful!
      </Typography>
      <Typography variant="h6" className="text-gray-700 mt-2">
        Thank you for upgrading your plan.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default Success;
