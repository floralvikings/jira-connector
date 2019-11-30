import { ApplicationRoles } from "./applicationRoles";

export interface Author {
  self: string;
  key: string;
  accountId: string;
  accountType: string;
  name: string;
  emailAddress: string;
  avatarUrls: { [key: string]: string };
  displayName: string;
  active: boolean;
  timeZone: string;
  locale: string;
  groups: ApplicationRoles;
  applicationRoles: ApplicationRoles;
  expand: string;
}
