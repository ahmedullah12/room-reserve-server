import { Router } from 'express';
import { PaymentController } from './Payment.controller';

const router = Router();

// Route
router.post("/confirmation", PaymentController.confirmationController);
router.post("/stripe-webhook", PaymentController.stripeWebhookController);


export const PaymentRoutes = router;
