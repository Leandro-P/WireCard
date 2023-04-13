import express from "express";
import { PaymentBusiness } from "../Business/PaymentBusiness";
import { PaymentController } from "../Controller/PaymentController";
import { PaymentDatabase } from "../Database/PaymentDatabase";
import { TokenGenerator } from "../Services/Authenticator";
import { IdGenerator } from "../Services/IdGenerator";

export const paymentRouter = express.Router();

const paymentDatabase = new PaymentDatabase();
const paymentBusiness = new PaymentBusiness(
  paymentDatabase,
  new IdGenerator(),
  new TokenGenerator()
);
const paymentController = new PaymentController(paymentBusiness);

paymentRouter.post("/create-payment", (req, res)=> paymentController.createPayment(req,res))
paymentRouter.get("/get-payments", (req, res)=> paymentController.getPayment(req,res))