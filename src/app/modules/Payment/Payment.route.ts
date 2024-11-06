import { Router } from 'express';
import { PaymentController } from './Payment.controller';
import express from 'express';

const router = Router();

// Route
router.post('/confirmation', PaymentController.confirmationController);
router.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  PaymentController.stripeWebhookController,
);

export const PaymentRoutes = router;
