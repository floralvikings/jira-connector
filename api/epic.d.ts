export = Epic;

declare class Epic {
    getIssuesWithoutEpic(opts?: {
        startAt?: number;
        maxResults?: number;
        jql?: string;
        validateQuery?: boolean;
        fields?: string[];
        expand?: string;
    }, callback?: any): any;
    removeIssuesFromEpic(opts?: {
        issues?: string[];
    }, callback?: any): any;
    getEpic(opts: {
        epicId: number | string;
    }, callback?: any): any;
    partiallyUpdateEpic(opts: {
        epicId: number | string;
        name?: string;
        summary?: string;
        color?: any;
        done?: boolean;
    }, callback?: any): any;
    getIssuesForEpic(opts: {
        epicId: number | string;
        startAt?: number;
        maxResults?: number;
        jql?: string;
        validateQuery?: boolean;
        fields?: string[];
        expand?: string;
    }, callback?: any): any;
    moveIssuesToEpic(opts: {
        epicId: number | string;
        issues?: string[];
    }, callback?: any): any;
    rankEpics(opts: {
        epicId: number | string;
        rankBeforeEpic?: string;
        rankAfterEpic?: string;
        rankCustomFieldId?: number;
    }, callback?: any): any;
}
