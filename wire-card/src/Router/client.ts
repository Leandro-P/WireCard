import express from "express";
import { ClientBusiness } from "../Business/ClientBusiness";
import { ClientController } from "../Controller/ClientController";
import { ClientDatabase } from "../Database/ClientDatabase";
import { TokenGenerator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";

export const clientRouter = express.Router();

const clientDatabase = new ClientDatabase();
const clientBusiness = new ClientBusiness(
  clientDatabase,
  new IdGenerator(),
  new TokenGenerator(),
  new HashManager()
);
const clientController = new ClientController(clientBusiness);

clientRouter.post("/signup", (req, res) => clientController.createClient(req, res));
clientRouter.post('/login', (req, res) => clientController.clientLogin(req, res));
