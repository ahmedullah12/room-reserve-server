import cron from 'node-cron';
import { BookingServices } from '../modules/Booking/Booking.service';

const setupBookingCronJobs = () => {
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      console.log('Running expired bookings check...');
      await BookingServices.checkAndCancelExpiredBookings();
      console.log('Completed expired bookings check');
    } catch (error) {
      console.error('Error in booking cron job:', error);
    }
  });
};

// Optional: Add a function to check for any unprocessed bookings on server startup
const checkUnprocessedBookings = async () => {
  try {
    console.log('Checking for unprocessed bookings on startup...');
    await BookingServices.checkAndCancelExpiredBookings();
    console.log('Completed startup booking check');
  } catch (error) {
    console.error('Error checking unprocessed bookings:', error);
  }
};

export const cronJobs = {
  setupBookingCronJobs,
  checkUnprocessedBookings,
};
