import { Request, Response } from "express";
import { PaymentServices } from "./Payment.service";

const confirmationController = async(req: Request, res: Response) => {
    const {transactionId, bookingId} = req.query;
    
    const result = await PaymentServices.confirmationService(transactionId as string, bookingId as string);
    res.send(result)
};

export const PaymentController = {
    confirmationController
}