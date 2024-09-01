/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { join } from "path";
import { readFileSync } from "fs";
import { verifyPayment } from "./Payment.utils";
import { Booking } from "../Booking/Booking.model";

const confirmationService = async (transactionId: string, bookingId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await Booking.findOneAndUpdate(
      { _id: bookingId },  // Ensure you use the correct field for the ID
      { isConfirmed: "confirmed" },
      { new: true }
    );
    message = "Successfully Paid!!!";
  } else {
    message = "Payment Failed!!!";
  }

  const filePath = join(__dirname, "../../../../public/confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  // Replace placeholders with actual data
  template = template.replace("{{message}}", message);
  template = template.replace("{{bookingId}}", bookingId);

  return template;
};

export const PaymentServices = {
  confirmationService,
};
