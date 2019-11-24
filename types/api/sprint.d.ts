import { Sprint as SprintType, Callback } from '../index';

export type SprintId = string | number;

export class Sprint {
    createSprint(
        sprint: Pick<
        SprintType,
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
        callback?: Callback<SprintType>
    ): Promise<SprintType>;
    updateSprint(
        opts: { sprintId: SprintId } & Partial<SprintType>,
        callback?: Callback<SprintType>
    ): Promise<SprintType>;
    partiallyUpdateSprint(
        opts: { sprintId: SprintId } & Partial<SprintType>,
        callback?: Callback<SprintType>
    ): Promise<SprintType>;
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
