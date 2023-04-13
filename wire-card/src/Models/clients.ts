export type Client = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
};

export interface ClientDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export type AuthenticationData = {
  id: string;
};

export type ClientLogin = {
  email: string;
  password: string;
};
