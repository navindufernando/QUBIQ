import express from "express";
import { PaymentController } from "../contollers/payment.controller";

const PaymentRoute = express.Router();

PaymentRoute.post("/create-checkout-session", PaymentController.createPaymentIntent);

export default PaymentRoute;
