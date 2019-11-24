import { JiraIssueType } from '../index';
import { Callback } from './callback';

declare class ApplicationPropertiesClient {
  getProperties(
    opts?: {
      key?: string;
      permissionLevel?: string;
      keyFilter?: string;
    },
    callback?: Callback,
  ): Promise<any>;

  setProperty(
    opts: {
      id: any;
      property: any;
    },
    callback?: Callback,
  ): Promise<any>;
}

export = ApplicationPropertiesClient;
