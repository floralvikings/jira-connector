import { Callback } from "../callback";

export interface UserInfo {
  self: string;
  key: string;
  accountId: string;
  name: string;
  emailAddress: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  groups: ApplicationRoles;
  applicationRoles: ApplicationRoles;
}

export interface ApplicationRoles {
  size: number;
  items: any[];
}

export interface AvatarUrls {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
}

export class User {
  getUser(
    opts: {
      accountId?: string;
      username?: string;
      userKey?: string;
      expand?: string;
    },
    callback?: Callback<UserInfo>,
  ): Promise<UserInfo>;

  deleteUser(opts: any, callback?: Callback): Promise<any>;
  createUser(opts: any, callback?: Callback): Promise<any>;
  editUser(opts: any, callback?: Callback): Promise<any>;
  multiProjectSearchAssignable(opts: any, callback?: Callback): Promise<any>;
  searchAssignable(opts: any, callback?: Callback): Promise<any>;
  createTemporaryAvatar(opts: any, callback?: Callback): Promise<any>;
  convertTemporaryAvatar(opts: any, callback?: Callback): Promise<any>;
  deleteAvatar(opts: any, callback?: Callback): Promise<any>;
  getAvatars(opts: any, callback?: Callback): Promise<any>;
  getDefaultColumns(opts: any, callback?: Callback): Promise<any>;
  setDefaultColumns(opts: any, callback?: Callback): Promise<any>;
  resetDefaultColumns(opts: any, callback?: Callback): Promise<any>;
  changePassword(opts: any, callback?: Callback): Promise<any>;
  searchPermissions(opts: any, callback?: Callback): Promise<any>;
  searchPicker(opts: any, callback?: Callback): Promise<any>;
  search(opts: any, callback?: Callback): Promise<any>;

  all(opts: {
    startAt?: number,
    maxResults?: number
  }, callback?: Callback): Promise<any>;

  viewIssueSearch(opts: any, callback?: Callback): Promise<any>;
}
