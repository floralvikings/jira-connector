import { Callback } from "./callback";

export interface PageBeanVersion {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Value[];
}

export interface Value {
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

export interface IssuesStatusForFixVersion {
    unmapped: number;
    toDo: number;
    inProgress: number;
    done: number;
}

export interface Operation {
    id: string;
    styleClass: string;
    iconClass: string;
    label: string;
    title: string;
    href: string;
    weight: number;
}


export declare class Project {
    getAllProjects(
        opts?: {
            expand?: string;
            recent?: number;
            properties?: string[];
            apiVersion?: string | number | 2 | 3;
        },
        callback?: Callback
    ): Promise<any>;

    updateProject(
        opts: {
            projectIdOrKey: string | number;
            expand?: string;
            key?: string;
            name?: string;
            projectTypeKey?: string;
            projectTemplateKey?: string;
            description?: string;
            lead?: string;
            leadAccountId?: string;
            url?: string;
            assigneeType?: string;
            avatarId?: number;
            issueSecurityScheme?: number;
            permissionScheme?: number;
            notificationScheme?: number;
            categoryId?: number;
        },
        callback?: Callback
    ): Promise<any>;

    deleteProject(
        opts: { projectIdOrKey: string | number },
        callback?: Callback
    ): Promise<any>;

    createProject(opts?: any, callback?: Callback): Promise<any>;

    getProjectProperties(opts: any, callback?: Callback): Promise<any>;

    getProject(opts: any, callback?: Callback): Promise<any>;

    getComponents(opts: any, callback?: Callback): Promise<any>;

    getStatuses(opts: any, callback?: Callback): Promise<any>;

    getVersions(opts: any, callback?: Callback): Promise<any>;

    getVersionsPaginated(opts: {
        projectIdOrKey: string;
        startAt?: number;
        maxResults?: number;
        orderBy?: string;
        query?: string;
        status?: string;
        expand?: any[];
    }, callback?: Callback): Promise<PageBeanVersion>;

    getRoles(opts: any, callback?: Callback): Promise<any>;

    getRole(opts: any, callback?: Callback): Promise<any>;

    updateRole(opts: any, callback?: Callback): Promise<any>;

    addToRole(opts: any, callback?: Callback): Promise<any>;
}