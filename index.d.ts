import AttachmentClient = require('./api/attachment');
import { Backlog } from './api/backlog';
import { Board } from './api/board';
import { Epic } from './api/epic';
import { Issue } from './api/issue';
import { Project } from './api/project';
import AgileSprintClient = require('./api/sprint');
import { User } from './api/user';
import { Search } from './api/search';
import IssueTypeClient = require('./api/issueType');

export = JiraClient;

interface IConfig {
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
    }
    cookie_jar?: any;
    promise?: PromiseLike<any> | any;
    request?: any;
    rejectUnauthorized?: any;
}

declare class JiraClient {
    constructor(config: IConfig);

    public applicationProperties: any;
    public attachment: AttachmentClient;
    public auditing: any;
    public auth: any;
    public avatar: any;
    public backlog: Backlog;
    public board: Board;
    public comment: any;
    public component: any;
    public customFieldOption: any;
    public dashboard: any;
    public epic: Epic;
    public field: any;
    public filter: any;
    public group: any;
    public groupUserPicker: any;
    public groups: any;
    public issue: Issue;
    public issueLink: any;
    public issueLinkType: any;
    public issueType: IssueTypeClient;
    public jql: any;
    public labels: any;
    public licenseRole: any;
    public licenseValidator: any;
    public myPermissions: any;
    public myPreferences: any;
    public myself: any;
    public password: any;
    public permissions: any;
    public permissionScheme: any;
    public priority: any;
    public project: Project;
    public projectCategory: any;
    public projectValidate: any;
    public reindex: any;
    public resolution: any;
    public roles: any;
    public screens: any;
    public search: Search;
    public securityLevel: any;
    public serverInfo: any;
    public settings: any;
    public sprint: AgileSprintClient;
    public status: any;
    public statusCategory: any;
    public user: User;
    public version: any;
    public webhook: any;
    public workflow: any;
    public workflowScheme: any;
    public worklog: any;

    public buildAgileURL(path: string, forcedVersion?: number | string): string;
    public buildAuthURL(path: string, forcedVersion?: number | string): string;
    public buildURL(path: string, forcedVersion?: number | string): string;
    public buildWebhookURL(path: string, forcedVersion?: number | string): string;
    public makeRequest(options: { [key: string]: any }, callback?: any, successString?: string): any;
}

declare namespace JiraClient {
    namespace oauth_util {
        function getAuthorizeURL(config: any, callback: any): any;

        function swapRequestTokenWithAccessToken(config: any, callback: any): void;
    }

    export type Callback<TData = any> = (err: any, data: TData) => void;

    export interface JiraIssueType {
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

    export interface AttachmentMetadata {
        id: number;
        self: string;
        filename: string;
        author: Author;
        created: string;
        size: number;
        mimeType: string;
        properties: Properties;
        content: string;
        thumbnail: string;
    }

    export interface AttachmentSettings {
        enabled: boolean;
        uploadLimit: number;
    }

    export type JiraScope = JiraProjectScope;

    export interface JiraProjectScope {
        type: 'PROJECT';
        project: { id: string };
    }

    export interface Author {
        self: string;
        key: string;
        accountId: string;
        accountType: string;
        name: string;
        emailAddress: string;
        avatarUrls: { [key: string]: string };
        displayName: string;
        active: boolean;
        timeZone: string;
        locale: string;
        groups: ApplicationRoles;
        applicationRoles: ApplicationRoles;
        expand: string;
    }

    export interface ApplicationRoles {
        size: number;
        items: Properties[];
        pagingCallback: Properties;
        callback: Properties;
        "max-results": number;
    }

    export interface Properties {
        [key: string]: string;
                         }
    export interface JiraSprint {
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
}
