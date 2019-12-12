import { Callback } from "../callback";

export class Backlog {
  moveIssuesToBacklog(
    opts?: {
      issues?: string[];
    },
    callback?: Callback<void>
  ): Promise<void>;

  moveIssuesToBacklogForBoard(
    opts: {
      boardId: number;
      issues?: string[];
      rankBeforeIssue?: string;
      rankAfterIssue?: string;
      rankCustomFieldId?: number;
    },
    callback?: Callback<void>
  ): Promise<void>;
}
