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

    addAttachment(opts: {
        filename: string | string[],
        issueId?: string | number,
        issueKey?: string | number,
        headers?: {
            'X-Atlassian-Token': any,
            charset: string | any,
            [key: string]: any
        }
    }, callback?: any): Promise<{
        [key: string]: any,
        self: string,
        id: string,
        filename: string,
        author: {
            self: string,
            accountId: string,
            emailAddress: string,
            avatarUrls: {
                '48x48': string,
                '24x24': string,
                '16x16': string,
                '32x32': string
            },
            displayName: string,
            active: boolean,
            timeZone: string
        },
        created: string,
        size: number,
        mimeType: string,
        content: string,
        thumbnail: string
    }[] | any>;
}