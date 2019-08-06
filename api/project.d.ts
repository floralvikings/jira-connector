export declare class Project {
    getAllProjects(
        opts?: {
            expand?: string;
            recent?: number;
            properties?: string[];
            apiVersion?: string | number | 2 | 3;
        },
        callback?: (err: any, data: any) => void
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
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    deleteProject(
        opts: { projectIdOrKey: string | number },
        callback?: (err: any, data: any) => void
    ): Promise<any>;

    createProject(opts?: any, callback?: (err: any, data: any) => void): Promise<any>;

    getProjectProperties(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

    getProject(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

    getComponents(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

    getStatuses(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

    getVersions(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

    getRoles(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

    getRole(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

    updateRole(opts: any, callback?: (err: any, data: any) => void): Promise<any>;

    addToRole(opts: any, callback?: (err: any, data: any) => void): Promise<any>;
}