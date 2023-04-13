import { Payment } from "../Models/payments";
import BaseDatabase from "./BaseDatabase";

export class PaymentDatabase extends BaseDatabase {
  public static table = "Wirecard_payments";

  public createPayment = async (payment: Payment) => {
    await PaymentDatabase.connection(PaymentDatabase.table).insert({
      payment_id: payment.paymentId,
      client_id: payment.clientId,
      method: payment.method,
      amount: payment.amount,
      card_holder_name: payment.cardHolderName,
      card_number: payment.cardNumber,
      card_exp_date: payment.cardExpDate,
      card_cvv: payment.cardCvv,
      status: payment.status,
    });
  };

  public getPayments = async () => {
    const result = await PaymentDatabase.connection(PaymentDatabase.table).select();

    return result[0];
  };
}
