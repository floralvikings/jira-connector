import JiraClient from '../index';
import { Callback } from '../callback';

export class AvatarClient {
  jiraClient: JiraClient;

  constructor(jiraClient: JiraClient);

  getAvatars(
    opts: {
      avatarType: 'project' | 'user'
    },
    callback?: Callback<any>
  ): Promise<any>;

  createTemporaryAvatar(
    opts: {
      avatarType: 'project' | 'user',
      avatarFilename: string,
      avatarFileSize: number,
      avatarFilePath: string
    },
    callback?: Callback<any>
  ): Promise<any>;

  cropTemporaryAvatar(
    opts: {
      avatarType: 'project' | 'user',
      crop: any
    },
    callback?: Callback<any>
  ): Promise<any>;
}
