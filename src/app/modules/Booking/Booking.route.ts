import { Router } from 'express';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { BookingValidations } from './Booking.validation';
import { BookingController } from './Booking.controller';

const router = Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidations.createBookingSchemaValidation),
  BookingController.createBooking,
);
router.get('/', auth('admin'), BookingController.getAllBooking);
router.get('/:id', BookingController.getSingleBooking);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(BookingValidations.updateBookingSchemaValidation),
  BookingController.updateBooking,
);
router.delete('/:id', auth('admin'), BookingController.deleteBooking);
router.delete('/:id/cancel', BookingController.cancelBooking);
router.put('/:id/approve', BookingController.approveBooking);
router.put('/:id/reject', BookingController.rejectBooking);
router.put(
  '/:bookingId/payment-with-amarpay',
  BookingController.confirmBookingWithAmarpay,
);
router.put(
  '/:bookingId/payment-with-stripe',
  BookingController.confirmBookingWithStripe,
);

export const BookingRoutes = router;
