import { JiraSprint } from '../index';

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
        callback?: any
    ): Promise<any>;
    getSprint(
        opts: {
            sprintId: SprintId;
            filter?: number;
            startAt?: number;
            maxResults?: number;
        },
        callback?: any
    ): Promise<JiraSprint>;
    updateSprint(
        opts: { sprintId: SprintId } & Partial<JiraSprint>,
        callback?: any
    ): Promise<JiraSprint>;
    partiallyUpdateSprint(
        opts: { sprintId: SprintId } & Partial<JiraSprint>,
        callback?: any
    ): Promise<JiraSprint>;
    deleteSprint(
        opts: {
            sprintId: SprintId;
            filter?: number;
            startAt?: number;
            maxResults?: number;
        },
        callback?: any
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
        callback?: any
    ): Promise<any>;
    moveSprintIssues(
        opts: {
            sprintId: SprintId;
            issues: string[];
            rankBeforeIssue?: string;
            rankAfterIssue?: string;
            rankCustomFieldId?: string;
        },
        callback?: any
    ): Promise<any>;
    swapSprint(
        opts: {
            sprintId: SprintId;
            sprintToSwapWith: string;
        },
        callback?: any
    ): Promise<any>;
}
