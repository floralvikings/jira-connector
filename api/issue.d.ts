export interface IHistoryMetadataParticipant {
    [key: string]: any;
    id?: string;
    displayName?: string;
    displayNameKey?: string;
    type?: string;
    avatarUrl?: string;
    url?: string;
}

export interface IHistoryMetadata {
    [key: string]: any;
    type?: string;
    description?: string;
    descriptionKey?: string;
    activityDescription?: string;
    activityDescriptionKey?: string;
    emailDescription?: string;
    emailDescriptionKey?: string;
    actor?: IHistoryMetadataParticipant,
    generator?: IHistoryMetadataParticipant,
    cause?: IHistoryMetadataParticipant,
    extraData?: any;
}

export declare class Issue {
    [method: string]: any;

    editIssue(
        opts: {
            issueKey?: string | number;
            issueId?: string | number;
            notifyUsers?: boolean;
            overrideScreenSecurity?: boolean;
            overrideEditableFlag?: boolean;
            issue?: {
                [key: string]: any;
                transition?: {
                    [key: string]: any;
                    id?: string | number;
                };
                fields?: any;
                update?: any;
                historyMetadata?: IHistoryMetadata,
                properties: any[];
            }
        },
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    addComment(
        opts: {
            [key: string]: any;
            issueId?: string;
            issueKey?: string;
            expand?: string;
            body?: string;
            visibility?: {
                [key: string]: any;
                type?: string | 'role' | 'group';
                value?: string;
            };
            properties?: any[];
        },
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    deleteComment(
        opts: {
            issueId?: string | number;
            issueKey?: string | number;
            commentId: string | number;
        },
        callback?: (err: any, data: any) => void
    ): Promise<string>;

    getChangelog(
        opts: {
            issueId?: number | string,
            issueKey?: number | string,
            startAt?: number,
            maxResults?: number
        },
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    addWorkLog(
        opts: {
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
        },
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    getWorklog(
        opts: {
            issueId?: number | string,
            issueKey?: number | string,
            id: string,
            expand?: string
        },
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    updateWorklog(
        opts: {
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
        },
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    deleteWorklog(
        opts: {
            issueId?: number | string,
            issueKey?: number | string,
            id: string,
            notifyUsers?: boolean,
            adjustEstimate?: string,
            newEstimate?: string,
            increaseBy?: string,
            overrideEditableFlag?: boolean
        },
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    addAttachment(
        opts: {
            filename: string | string[],
            issueId?: string | number,
            issueKey?: string | number,
            headers?: {
                'X-Atlassian-Token'?: string,
                charset?: string,
                [key: string]: any
            }
        },
        callback?: (err: any, data: any) => void
    ): Promise<{
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
