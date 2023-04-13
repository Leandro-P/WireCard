import { CustomError, InvalidRequest } from "../CustomErrors/customErrors";
import { ClientDatabase } from "../Database/ClientDatabase";
import { ClientDTO, ClientLogin } from "../Models/clients";
import { TokenGenerator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";

export class ClientBusiness {
  constructor(
    private clientDatabase: ClientDatabase,
    private idGenerator: IdGenerator,
    private tokenGenerator: TokenGenerator,
    private hashManager: HashManager
  ) {}

  public createClient = async (client: ClientDTO) => {
    try {
      const { name, email, password, cpf } = client;

      if (!name || !email || !password || !cpf) {
        throw new InvalidRequest();
      }

      if (cpf.length < 11) {
        throw new InvalidRequest();
      }

      if (!email.includes("@")) {
        throw new InvalidRequest();
      }

      if (password.length < 8) {
        throw new InvalidRequest();
      }

      const id = this.idGenerator.generateId();
      const hashPassword = await this.hashManager.hash(password)

      const newClilent = {
        id: id,
        name,
        email,
        password:hashPassword,
        cpf,
      };

      await this.clientDatabase.createClient(newClilent);
      const token = this.tokenGenerator.generateToken({ id });
      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public clientLogin = async (login: ClientLogin) => {
    try {
      const { email, password } = login;

      if (!email.includes("@")) {
        throw new InvalidRequest();
      }

      if (password.length < 8) {
        throw new InvalidRequest();
      }

      const client = await this.clientDatabase.clientLogin(email);

      const isValidPass = await this.hashManager.compare(
        password,
        client.password
      );

      if (!isValidPass) {
        throw new InvalidRequest();
      }

      const token = this.tokenGenerator.generateToken({ id: client.id });

      return token;

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
