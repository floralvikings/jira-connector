export declare class Issue {
    [method: string]: Promise<any>;
    addWorkLog(opts: {
        [key: string]: any,
        issueId?: number | string,
        issueKey?: number | string,
        notifyUsers?: boolean,
        adjustEstimate?: 'auto' | 'new' | 'manual' | 'leave',
        newEstimate?: string,
        reduceBy?: string,
        expand?: string,
        overrideEditableFlag?: boolean,
        comment?: any,
        visibility?: {
            [key: string]: any,
            type?: 'group' | 'role',
            value?: string
        },
        started?: string,
        timeSpent?: string,
        timeSpentSeconds?: number | string,
        properties?: {
            [key: string]: any
        }[]
    }, callback?: any): Promise<any>;

    getWorklog(opts: {
        issueId?: number | string,
        issueKey?: number | string,
        id: string,
        expand?: string
    }, callback?: any): Promise<any>;

    updateWorklog(opts: {
        [key: string]: any,
        issueId?: number | string,
        issueKey?: number | string,
        id: string,
        notifyUsers?: boolean,
        adjustEstimate?: 'auto' | 'new' | 'manual' | 'leave',
        newEstimate?: string,
        expand?: string,
        overrideEditableFlag?: boolean,
        comment?: any,
        visibility?: {
            [key: string]: any,
            type?: 'group' | 'role',
            value?: string
        },
        started?: string,
        timeSpent?: string,
        timeSpentSeconds?: number | string,
        properties?: {
            [key: string]: any
        }[]
    }, callback?: any): Promise<any>;

    deleteWorklog(opts: {
        issueId?: number | string,
        issueKey?: number | string,
        id: string,
        notifyUsers?: boolean,
        adjustEstimate?: string,
        newEstimate?: string,
        increaseBy?: string,
        overrideEditableFlag?: boolean
    }, callback?: any): Promise<any>;
}