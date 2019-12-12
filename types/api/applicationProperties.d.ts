import { Callback } from "../callback";

export class ApplicationProperties {
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
