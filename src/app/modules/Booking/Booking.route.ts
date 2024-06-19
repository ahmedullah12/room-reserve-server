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
router.put(
  '/:id',
  auth('admin'),
  validateRequest(BookingValidations.updateBookingSchemaValidation),
  BookingController.updateBooking,
);
router.delete(
  '/:id',
  auth('admin'),
  BookingController.deleteBooking,
);



export const BookingRoutes = router;
