import { Request, Response } from "express";
import { ClientBusiness } from "../Business/ClientBusiness";
import { ClientLogin } from "../Models/clients";

export class ClientController {
  constructor(private clientBusiness: ClientBusiness) {}

  public createClient = async (req: Request, res: Response) => {
    try {
      const { name, email, password, cpf } = req.body;

      const newClient = {
        name,
        email,
        password,
        cpf,
      };
      const token = await this.clientBusiness.createClient(newClient);

      res.status(200).send({ token: token });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

  public clientLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const login: ClientLogin = {
        email,
        password,
      };

      const token = await this.clientBusiness.clientLogin(login);

      res.status(200).send({ token: token });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

}
