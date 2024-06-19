import { Router } from "express";
import auth from "../../middlewares/auth";
import { MyBookingController } from "./MyBooking.controller";


const router = Router();

router.get("/", auth("user"), MyBookingController.getUsersBookings);

export const MyBookingRoutes = router;