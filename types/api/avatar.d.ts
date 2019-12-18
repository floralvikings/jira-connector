import JiraClient from '../index';
import { Callback } from '../callback';

export class Avatar {
  getAvatars(
    opts: {
      avatarType: 'project' | 'user'
    },
    callback?: Callback
  ): Promise<any>;

  createTemporaryAvatar(
    opts: {
      avatarType: 'project' | 'user',
      avatarFilename: string,
      avatarFileSize: number,
      avatarFilePath: string
    },
    callback?: Callback
  ): Promise<any>;

  cropTemporaryAvatar(
    opts: {
      avatarType: 'project' | 'user',
      crop: any
    },
    callback?: Callback
  ): Promise<any>;
}
