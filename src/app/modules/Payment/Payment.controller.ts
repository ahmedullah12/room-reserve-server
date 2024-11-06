import { Request, Response } from 'express';
import { PaymentServices } from './Payment.service';
import { Booking } from '../Booking/Booking.model';
import Stripe from 'stripe';
import config from '../../config';
import { ConfirmState } from '../Booking/Booking.constant';

const stripe = new Stripe(config.stripe_secret_key as string);

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, bookingId } = req.query;

  const result = await PaymentServices.confirmationService(
    transactionId as string,
    bookingId as string,
  );
  res.send(result);
};

const stripeWebhookController = async (req: Request, res: Response) => {
  const webhookSecret = config.stripe_webhook_key as string;
  const requestPayload = req.body;
  const requestPayloadString = JSON.stringify(requestPayload, null, 2);
  const requestHeader = stripe.webhooks.generateTestHeaderString({
    payload: requestPayloadString,
    secret: webhookSecret,
  });

  try {
    const event = stripe.webhooks.constructEvent(
      requestPayloadString,
      requestHeader,
      webhookSecret,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await Booking.findByIdAndUpdate(session.metadata?.bookingId, {
        isConfirmed:
          session.payment_status === 'paid'
            ? ConfirmState.confirmed
            : ConfirmState.unconfirmed,
      });
    }

    res.status(200).send(`Webhook received!`);
  } catch (error: any) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

export const PaymentController = {
  confirmationController,
  stripeWebhookController,
};
