import { Config } from './config';
import {
    ApplicationProperties,
    Attachment,
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

export * from './config';
export * from './callback';
export * from './models';

export default class JiraClient {
    constructor(config: Config);

    applicationProperties: ApplicationProperties;
    attachment: Attachment;
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
