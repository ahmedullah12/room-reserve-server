import axios from 'axios';
import config from '../../config';

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `https://room-reserve-server.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&bookingId=${paymentData.bookingId}`,
      fail_url: `https://room-reserve-server.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&bookingId=${paymentData.bookingId}`,
      cancel_url: "https://roomreservee.netlify.app/my-bookings",
      amount: paymentData.totalAmount,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: paymentData.customerPhone,
      type: 'json',
    });

    return response.data;
  } catch (err: any) {
    console.log(err);
    throw new Error('Payment initiation failed!!!');
  }
};


export const verifyPayment = async (transactionId: string) => {
    try {
      const response = await axios.get(config.payment_verify_url!, {
        params: {
          store_id: process.env.STORE_ID,
          signature_key: process.env.SIGNATURE_KEY,
          type: "json",
          request_id: transactionId,
        },
      });
      return response.data;
    } catch (err) {
      throw new Error("Payment validation failed!!");
      console.log(err);
    }
  };