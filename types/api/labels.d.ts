import { Callback } from "../callback";
import { PageBeanString } from "../models";

export class Labels {
  getLabels(
    ops: {
      query: string;
    },
    callback?: Callback
  ): Promise<any>;

  getAllLabels(
    opts?: {
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback<PageBeanString>
  ): Promise<PageBeanString>;
}
