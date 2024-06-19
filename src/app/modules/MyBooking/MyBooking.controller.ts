import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { MyBookingServices } from "./MyBooking.service";
import catchAsync from "../../utils/catchAsync";

const getUsersBookings = catchAsync(async(req, res) => {

    const result = await MyBookingServices.getUsersBookingsFromDB(req.user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result,
    })
});

export const MyBookingController = {
    getUsersBookings
}