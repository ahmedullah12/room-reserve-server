import { Router } from 'express';
import { PaymentController } from './Payment.controller';

const router = Router();

// Route
router.post("/confirmation", PaymentController.confirmationController)


export const PaymentRoutes = router;
