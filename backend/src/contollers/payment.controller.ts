// payment.controller.ts 
// Handles HTTP requests and responses for payment
import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

export class PaymentController {

    static async createPaymentIntent(req: Request, res: Response): Promise<any> {
        console.log("started")
        dotenv.config();
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-02-24.acacia',
        });

        const pricingDetails: Record<string, { price: number; name: string}> = {
            pro: { price: 500, name: "Pro Plan" }, // $5
            enterprise: { price: 1500, name: "Enterprise Plan"}, // $15
        }

        try {
            const { plan } = req.body;
            const pricing = pricingDetails[plan];
        
            if (!pricing) {
                return res.status(400).json({ error: "Invalid plan" });
            }
        
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: pricing.name,
                            },
                            unit_amount: pricing.price,
                        },
                        quantity: 1,
                    },
                ],
                success_url: "http://localhost:5173/success",
                cancel_url: "http://localhost:5173/cancel",
            });
        
            res.json({ sessionId: session.id });
          } catch (error: any) {
            res.status(500).json({ error: error.message });
          }
    }
}