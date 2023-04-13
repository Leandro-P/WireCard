import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../Models/clients";


export class TokenGenerator {
  public generateToken = (id: AuthenticationData) => {
    const token = jwt.sign({ id }, process.env.JWT_KEY as string, {
      expiresIn: "2h",
    });

    return token;
  };

  public getToken = (token: string): AuthenticationData => {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return payload;
  };
}
