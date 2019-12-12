import { Callback } from "../callback";
import { Sprint as SprintModel } from "../models";

export type SprintId = string | number;

export class Sprint {
  createSprint(
    sprint: Pick<
      SprintModel,
      | 'name' //
      | 'startDate'
      | 'endDate'
      | 'originBoardId'
      | 'goal'
    >,
    callback?: Callback
  ): Promise<any>;
  getSprint(
    opts: {
      sprintId: SprintId;
      filter?: number;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback<SprintModel>
  ): Promise<SprintModel>;
  updateSprint(
    opts: { sprintId: SprintId } & Partial<SprintModel>,
    callback?: Callback<SprintModel>
  ): Promise<SprintModel>;
  partiallyUpdateSprint(
    opts: { sprintId: SprintId } & Partial<SprintModel>,
    callback?: Callback<SprintModel>
  ): Promise<SprintModel>;
  deleteSprint(
    opts: {
      sprintId: SprintId;
      filter?: number;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback
  ): Promise<any>;
  getSprintIssues(
    opts: {
      sprintId: SprintId;
      startAt?: number;
      maxResults?: number;
      jql?: string;
      validateQuery?: boolean;
      fields?: string[];
      expand?: string;
    },
    callback?: Callback
  ): Promise<any>;
  moveSprintIssues(
    opts: {
      sprintId: SprintId;
      issues: string[];
      rankBeforeIssue?: string;
      rankAfterIssue?: string;
      rankCustomFieldId?: string;
    },
    callback?: Callback
  ): Promise<any>;
  swapSprint(
    opts: {
      sprintId: SprintId;
      sprintToSwapWith: string;
    },
    callback?: Callback
  ): Promise<any>;
}
