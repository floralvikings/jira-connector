import {
    Backlog,
    Board,
    Epic,
    Issue,
    IssueType,
    Project,
    Search,
    Sprint,
    User,
} from './api';

export interface Config {
    host: string;
    port?: number;

    timeout?: number;

    protocol?: string;
    path_prefix?: string;
    strictSSL?: boolean;
    version?: string;
    basic_auth?: {
        email?: string;
        api_token?: string;
        username?: string;
        password?: string;
        base64?: string;
    };
    oauth?: {
        consumer_key: string;
        private_key: string;
        token: string;
        token_secret: string;
    };
    cookie_jar?: any;
    promise?: PromiseLike<any>;
    request?: any;
    rejectUnauthorized?: any;
}

export default class JiraClient {
    constructor(config: Config);

    applicationProperties: any;
    attachment: any;
    auditing: any;
    auth: any;
    avatar: any;
    backlog: Backlog;
    board: Board;
    comment: any;
    component: any;
    customFieldOption: any;
    dashboard: any;
    epic: Epic;
    field: any;
    filter: any;
    group: any;
    groupUserPicker: any;
    groups: any;
    issue: Issue;
    issueLink: any;
    issueLinkType: any;
    issueType: IssueType;
    jql: any;
    labels: any;
    licenseRole: any;
    licenseValidator: any;
    myPermissions: any;
    myPreferences: any;
    myself: any;
    password: any;
    permissions: any;
    permissionScheme: any;
    priority: any;
    project: Project;
    projectCategory: any;
    projectValidate: any;
    reindex: any;
    resolution: any;
    roles: any;
    screens: any;
    search: Search;
    securityLevel: any;
    serverInfo: any;
    settings: any;
    sprint: Sprint;
    status: any;
    statusCategory: any;
    user: User;
    version: any;
    webhook: any;
    workflow: any;
    workflowScheme: any;
    worklog: any;

    buildAgileURL(path: string, forcedVersion?: number | string): string;
    buildAuthURL(path: string, forcedVersion?: number | string): string;
    buildURL(path: string, forcedVersion?: number | string): string;
    buildWebhookURL(path: string, forcedVersion?: number | string): string;
    makeRequest(options: { [key: string]: any }, callback?: any, successString?: string): any;

    static oauth_util: {
        getAuthorizeURL(config: any, callback: any): any,
        swapRequestTokenWithAccessToken(config: any, callback: any): void;
    };
}

export type Callback<TData = any> = (err: any, data: TData) => void;

export namespace JiraClient {
    type Callback<TData = any> = (err: any, data: TData) => void;

    interface JiraIssueType {
        self: string;
        id: string;
        description: string;
        iconUrl: string;
        name: string;
        subtask: boolean;
        avatarId: number;
        entityId?: string;
        scope?: JiraScope;
    }

    type JiraScope = JiraProjectScope;

    interface JiraProjectScope {
        type: 'PROJECT';
        project: { id: string };
    }

    interface JiraSprint {
        id: string;
        self: string;
        state: 'active' | 'closed' | 'future';
        name: string;
        startDate: string;
        endDate: string;
        originBoardId: number;
        goal: string;
        completeDate?: string;
    }

    interface PageBeanVersion {
        self: string;
        nextPage: string;
        maxResults: number;
        startAt: number;
        total: number;
        isLast: boolean;
        values: Value[];
    }

    interface JiraBoard {
        id: number;
        self: string;
        name: string;
        type: string;
        location: BoardLocation;
    }

    interface BoardLocation {
        projectId: number;
        displayName: string;
        projectName: string;
        projectKey: string;
        projectTypeKey: string;
        avatarURI: string;
        name: string;
    }

    interface Value {
        expand: string;
        self: string;
        id: string;
        description: string;
        name: string;
        archived: boolean;
        released: boolean;
        startDate: string;
        releaseDate: string;
        overdue: boolean;
        userStartDate: string;
        userReleaseDate: string;
        project: string;
        projectId: number;
        moveUnfixedIssuesTo: string;
        operations: Operation[];
        issuesStatusForFixVersion: IssuesStatusForFixVersion;
    }

    interface IssuesStatusForFixVersion {
        unmapped: number;
        toDo: number;
        inProgress: number;
        done: number;
    }

    interface Operation {
        id: string;
        styleClass: string;
        iconClass: string;
        label: string;
        title: string;
        href: string;
        weight: number;
    }
}
