import JiraClient from '../index';
import { Callback } from '../callback';

export class AuthClient {
  jiraClient: JiraClient;

  constructor(jiraClient: JiraClient);

  logout(
    callback?: Callback<any>
  ): Promise<any>;

  login(
    opts: {
      username: string,
      password: string
    },
    callback?: Callback<any>
  ): Promise<any>;

  currentUser(
    callback?: Callback<any>
  ): Promise<any>;
}
