import { Callback } from '../index';

export declare class Backlog {
    moveIssuesToBacklog(opts?: {
        issues?: string[];
    }, callback?: Callback<any>): Promise<any>;
    moveIssuesToBacklogForBoard(opts: {
        boardId: number;
        issues?: string[];
        rankBeforeIssue?: string;
        rankAfterIssue?: string;
        rankCustomFieldId?: number;
    }, callback?: Callback<any>): Promise<any>;
}
