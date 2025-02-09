import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { MyBookingServices } from './MyBooking.service';
import catchAsync from '../../utils/catchAsync';

const getUsersBookings = catchAsync(async (req, res) => {
  const { result, meta } = await MyBookingServices.getUsersBookingsFromDB(
    req.user,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: result,
    meta,
  });
});

export const MyBookingController = {
  getUsersBookings,
};
