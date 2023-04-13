export enum PaymentMethod {
  BANK_SLIP = "BANK_SLIP",
  CARD = "CARD",
}

export enum PaymentStatus {
  APPROVED = "APPROVED",
  ANALYSIS = "ANALYSIS",
  DENIED = "DENIED",
}

export type Payment = {
  paymentId: string;
  clientId: string;
  method: PaymentMethod;
  amount: number;
  cardHolderName: string;
  cardNumber: string;
  cardExpDate: string;
  cardCvv: string;
  status: PaymentStatus;
};

export interface PaymentDTO {
  clientId: string;
  method: PaymentMethod;
  amount: number;
  cardHolderName: string;
  cardNumber: string;
  cardExpDate: string;
  cardCvv: string;
}
