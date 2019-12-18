import JiraClient from '../index';
import { Callback } from '../callback';

export class Auditing {
  getAudits(
    opts: {
      offset: number,
      limit: number,
      filter: any,
      from: number,
      to: number
    },
    callback?: Callback
  ): Promise<any>;

  createAudit(
    opts: {
      audit: any
    },
    callback?: Callback
  ): Promise<any>;
}
