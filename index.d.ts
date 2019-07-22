import { Backlog } from './api/backlog';
import { Board } from './api/board';
import { Epic } from './api/epic';
import { Issue } from './api/issue';
import { Project } from './api/project';
import { User } from './api/user';

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
    public attachment: any;
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
    public issueType: any;
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
    public search: any;
    public securityLevel: any;
    public serverInfo: any;
    public settings: any;
    public sprint: any;
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
}
