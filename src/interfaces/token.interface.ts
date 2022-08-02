import JwtPayload from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface Token extends JwtPayload {
    data: [{
      id: number,
      username: string,
      classe: string,
      level: number,
      password: string,
    }],
  }
}

// https://stackoverflow.com/questions/68403905/how-to-add-additional-properties-to-jwtpayload-type-from-types-jsonwebtoken
// redeclarando o módulo jsonwebtoken com um Payload estendido
