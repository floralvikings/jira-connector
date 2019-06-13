export declare class Backlog {
    moveIssuesToBacklog(opts?: {
        issues?: string[];
    }, callback?: any): Promise<any>;
    moveIssuesToBacklogForBoard(opts: {
        boardId: number;
        issues?: string[];
        rankBeforeIssue?: string;
        rankAfterIssue?: string;
        rankCustomFieldId?: number;
    }, callback?: any): Promise<any>;
}
