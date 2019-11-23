import { JiraSprint, Callback } from '../index';

type SprintId = string | number;

export declare class Sprint {
    createSprint(
        sprint: Pick<
            JiraSprint,
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
        callback?: Callback<JiraSprint>
    ): Promise<JiraSprint>;
    updateSprint(
        opts: { sprintId: SprintId } & Partial<JiraSprint>,
        callback?: Callback<JiraSprint>
    ): Promise<JiraSprint>;
    partiallyUpdateSprint(
        opts: { sprintId: SprintId } & Partial<JiraSprint>,
        callback?: Callback<JiraSprint>
    ): Promise<JiraSprint>;
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
