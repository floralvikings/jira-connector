import JiraClient from '../index';
import { Callback } from '../callback';

export class AuditingClient {
  jiraClient: JiraClient;

  constructor(
    jiraClient: JiraClient
  );

  getAudits(
    opts: {
      offset: number,
      limit: number,
      filter: any,
      from: number,
      to: number
    },
    callback?: Callback<any>
  ): Promise<any>;

  createAudit(
    opts: {
      audit: any
    },
    callback?: Callback<any>
  ): Promise<any>;
}
