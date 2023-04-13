import { Request, Response } from "express";
import { PaymentBusiness } from "../Business/PaymentBusiness";
import { PaymentDTO } from "../Models/payments";

export class PaymentController {
  constructor(private paymentBusiness: PaymentBusiness) {}
  public createPayment = async (req: Request, res: Response) => {
    try {
      const {
        clientId,
        method,
        amount,
        cardHolderName,
        cardNumber,
        cardExpDate,
        cardCvv,
      } = req.body;

      const token = req.headers.authorization as string;

      const newPayment: PaymentDTO = {
        clientId,
        method,
        amount,
        cardHolderName,
        cardNumber,
        cardExpDate,
        cardCvv,
      };

      const result = await this.paymentBusiness.createPayment(
        newPayment,
        token
      );

      res.status(200).send({ data: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public getPayment = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const result = await this.paymentBusiness.getPayment(token);
      res.status(200).send({ data: result });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
