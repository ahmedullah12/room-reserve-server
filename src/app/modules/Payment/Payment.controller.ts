import { Request, Response } from "express";
import { PaymentServices } from "./Payment.service";
import { Booking } from "../Booking/Booking.model";
import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.stripe_secret_key as string)

const confirmationController = async(req: Request, res: Response) => {
    const {transactionId, bookingId} = req.query;
    
    const result = await PaymentServices.confirmationService(transactionId as string, bookingId as string);
    res.send(result)
};

const stripeWebhookController = async(req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
  const event = stripe.webhooks.constructEvent(req.body, sig, config.stripe_webhook_key as string);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    if (session.payment_status === 'paid') {
      // Payment is successful, update the booking status
      await Booking.findByIdAndUpdate(session.metadata?.bookingId, { isConfirmed: true });
    } else {
      // Payment is not successful, update the booking status
      await Booking.findByIdAndUpdate(session.metadata?.bookingId, { isConfirmed: false });
    }
  }

  res.status(200).send(`Webhook received!`);
}

export const PaymentController = {
    confirmationController,
    stripeWebhookController
}