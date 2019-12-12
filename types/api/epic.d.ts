import { Callback } from "../callback";

export class Epic {
  getIssuesWithoutEpic(opts?: {
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback): Promise<any>;
  removeIssuesFromEpic(opts?: {
    issues?: string[];
  }, callback?: Callback): Promise<any>;
  getEpic(opts: {
    epicId: number | string;
  }, callback?: Callback): Promise<any>;
  partiallyUpdateEpic(opts: {
    epicId: number | string;
    name?: string;
    summary?: string;
    color?: any;
    done?: boolean;
  }, callback?: Callback): Promise<any>;
  getIssuesForEpic(opts: {
    epicId: number | string;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback): Promise<any>;
  moveIssuesToEpic(opts: {
    epicId: number | string;
    issues?: string[];
  }, callback?: Callback): Promise<any>;
  rankEpics(opts: {
    epicId: number | string;
    rankBeforeEpic?: string;
    rankAfterEpic?: string;
    rankCustomFieldId?: number;
  }, callback?: Callback): Promise<any>;
}
