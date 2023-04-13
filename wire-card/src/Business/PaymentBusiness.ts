import { InvalidRequest } from "../CustomErrors/customErrors";
import { PaymentDatabase } from "../Database/PaymentDatabase";
import {
  Payment,
  PaymentDTO,
  PaymentMethod,
  PaymentStatus,
} from "../Models/payments";
import { TokenGenerator } from "../Services/Authenticator";
import { IdGenerator } from "../Services/IdGenerator";

export class PaymentBusiness {
  constructor(
    private paymentDatabase: PaymentDatabase,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator
  ) {}
  public createPayment = async (payment: PaymentDTO, token: string) => {
    try {
      const {
        clientId,
        method,
        amount,
        cardHolderName,
        cardNumber,
        cardExpDate,
        cardCvv,
      } = payment;

      if (!token) {
        throw new InvalidRequest();
      }

      const authData = this.tokenGenerator.getToken(token);

      if (!authData.id) {
        throw new InvalidRequest();
      }

      let status = PaymentStatus.ANALYSIS;

      if (payment.method === PaymentMethod.CARD) {
        status = PaymentStatus.APPROVED;
      }

      const id = this.idGenerator.generateId();

      const newPayment: Payment = {
        paymentId: id,
        clientId,
        method,
        amount,
        cardHolderName,
        cardNumber,
        cardExpDate,
        cardCvv,
        status,
      };

      await this.paymentDatabase.createPayment(newPayment);
      return newPayment
    } catch (error: any) {
      throw new InvalidRequest();
    }
  };

  public getPayment = async (token: string) => {
    try {
      if (!token) {
        throw new InvalidRequest();
      }

      const authData = this.tokenGenerator.getToken(token);
      if (!authData.id) {
        throw new InvalidRequest();
      }
      const result = await this.paymentDatabase.getPayments();
      if (result.length < 1) {
        throw new InvalidRequest();
      }

      return result;
    } catch (error: any) {
      throw new InvalidRequest();
    }
  };
}
