export declare class Epic {
    getIssuesWithoutEpic(opts?: {
        startAt?: number;
        maxResults?: number;
        jql?: string;
        validateQuery?: boolean;
        fields?: string[];
        expand?: string;
    }, callback?: any): Promise<any>;
    removeIssuesFromEpic(opts?: {
        issues?: string[];
    }, callback?: any): Promise<any>;
    getEpic(opts: {
        epicId: number | string;
    }, callback?: any): Promise<any>;
    partiallyUpdateEpic(opts: {
        epicId: number | string;
        name?: string;
        summary?: string;
        color?: any;
        done?: boolean;
    }, callback?: any): Promise<any>;
    getIssuesForEpic(opts: {
        epicId: number | string;
        startAt?: number;
        maxResults?: number;
        jql?: string;
        validateQuery?: boolean;
        fields?: string[];
        expand?: string;
    }, callback?: any): Promise<any>;
    moveIssuesToEpic(opts: {
        epicId: number | string;
        issues?: string[];
    }, callback?: any): Promise<any>;
    rankEpics(opts: {
        epicId: number | string;
        rankBeforeEpic?: string;
        rankAfterEpic?: string;
        rankCustomFieldId?: number;
    }, callback?: any): Promise<any>;
}
