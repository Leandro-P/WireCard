import { Client } from "../Models/clients";
import BaseDatabase from "./BaseDatabase";

export class ClientDatabase extends BaseDatabase {
  public static table = "Wirecard_clients";

  public createClient = async (client: Client) => {
    await ClientDatabase.connection(ClientDatabase.table).insert({
      id: client.id,
      name: client.name,
      email: client.email,
      password: client.password,
      cpf: client.cpf,
    });
  };

  public clientLogin = async (email: string) => {
    const result = await ClientDatabase.connection(ClientDatabase.table)
      .select()
      .where({ email });
    return result[0];
  };
}
