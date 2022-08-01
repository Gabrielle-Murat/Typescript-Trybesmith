import connection from '../models/connection';
import LoginModel from '../models/login.model';
import Login from '../interfaces/login.interface';
import User from '../interfaces/user.interface';

export default class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async userLogin(loginInfo: Login): Promise<User[] | string> {
    const user = await this.model.userLogin(loginInfo);

    if (user.length === 0) return 'invalid';
    return user;
  }
}
