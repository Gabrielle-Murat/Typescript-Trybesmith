import { Pool } from 'mysql2/promise';
import Login from '../interfaces/login.interface';
import User from '../interfaces/user.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async userLogin(loginInfo: Login): Promise<User[]> {
    const { username, password } = loginInfo;
    const result = await this.connection.execute(
      `
        SELECT * FROM Trybesmith.Users AS usr
        WHERE usr.username = ? AND usr.password = ?;
      `,
      [username, password],
    );
    const [user] = result;
    return user as User[];
  }
}
