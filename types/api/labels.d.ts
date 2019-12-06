import { Callback } from 'types';
import { PageBeanString } from 'types/models';

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
