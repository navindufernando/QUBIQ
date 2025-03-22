import React from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Pricing = () => {
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    "pk_test_51R5WGmEOzvSoDscmjlaYEZgSBDE2P4JDtXSksMN5xNWBclL3AMY7Z0H3OU3EL8W2ucMClRLmgKLnOOTrbx6PiIOC003XvvQ49w"
  );

  const handleCardClick = (plan: string) => {
    if (plan === "free") {
      navigate("/RoleSelection");
    } else if (plan === "pro") {
      handlePremiumPlan(plan);
    }
  };

  const handlePremiumPlan = async (plan: string) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/payments/create-checkout-session",
        {
          plan,
        }
      );

      const stripe = await stripePromise;
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (error) {
      console.log("Error creating Stripe Checkout session:", error);
    }
  };

  const pricingPlans = [
    {
      name: "Free Plan",
      price: "$0 / week",
      features: [
        "✔ Basic task management",
        "✔ Limited integrations",
        "✔ Community support",
        "✔ Access on web & mobile",
      ],
      buttonText: "Get Started",
      highlight: false,
      type: "free",
    },
    {
      name: "Pro Plan",
      price: "$5 / week",
      features: [
        "✔ Advanced task management",
        "✔ Unlimited integrations",
        "✔ Priority support",
        "✔ Team collaboration",
      ],
      buttonText: "Upgrade Now",
      highlight: true,
      type: "pro",
    },
    {
      name: "Enterprise Plan",
      price: "$15 / week",
      features: [
        "✔ All Pro Plan features",
        "✔ Custom workflows",
        "✔ Dedicated account manager",
        "✔ Enhanced security",
      ],
      buttonText: "Contact Us",
      highlight: false,
      type: "enterprise",
    },
  ];

  return (
    <div className="flex flex-col items-center bg-[#E1DDFF] min-h-screen py-16 px-6">
      {/* Page Heading */}
      <Typography variant="h3" className="font-extrabold text-5xl">
        Choose Your <span className="text-[#6366F1]">QUBIQ</span> Plan
      </Typography>
      <Typography variant="h5" className="text-gray-600 mt-2 font-medium">
        Find the perfect plan for your needs.
      </Typography>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 max-w-6xl w-full">
        {pricingPlans.map((plan, index) => (
          <Card
            key={index}
            sx={{
              padding: "32px", // Equivalent to p-8
              borderRadius: "24px", // Equivalent to rounded-3xl
              boxShadow: "lg",
              border: plan.highlight
                ? "2px solid #6366F1"
                : "1px solid #D1D5DB", // Highlighted card gets primary color
              backgroundColor: plan.highlight ? "white" : "#F3F4F6", // Equivalent to bg-gray-100
              transition: "all 0.3s ease-in-out",
              minHeight: "500px", // Increased card height
              "&:hover": {
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)", // Equivalent to hover:shadow-2xl
              },
            }}
          >
            <CardContent className="flex flex-col h-full">
              {/* Plan Name */}
              <Typography
                variant="h4"
                sx={{
                  color: "#6366F1", // Primary color for important text
                  fontWeight: "800", // Equivalent to font-extrabold
                }}
              >
                {plan.name}
              </Typography>

              {/* Plan Price */}
              <Typography
                variant="h6"
                sx={{
                  color: "#1F2937",
                  mt: 2,
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                {plan.price}
              </Typography>

              {/* Features List */}
              <ul className="mt-4 text-gray-700 space-y-2 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-lg">
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Call-to-Action Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6366F1",
                  "&:hover": {
                    backgroundColor: "#4F52DB",
                  },
                  color: "white",
                  fontSize: "1.125rem", // Equivalent to text-lg
                  fontWeight: "600", // Equivalent to font-semibold
                  padding: "12px 16px",
                  borderRadius: "12px",
                  textTransform: "none",
                }}
                fullWidth
                onClick={() => handleCardClick(plan.type)}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
