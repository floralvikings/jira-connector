import JiraClient from '../index';
import { Callback } from '../callback';

export class Auth {
  logout(
    callback?: Callback
  ): Promise<any>;

  login(
    opts: {
      username: string,
      password: string
    },
    callback?: Callback
  ): Promise<any>;

  currentUser(
    callback?: Callback
  ): Promise<any>;
}
