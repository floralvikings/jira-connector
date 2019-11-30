import { Properties } from './properties';

export interface ApplicationRoles {
  size: number;
  items: Properties[];
  pagingCallback: Properties;
  callback: Properties;
  "max-results": number;
}
