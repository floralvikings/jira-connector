interface Issue {
    expand: string;
    id: string;
    self: string;
    key: string;
    renderedFields: any;
    properties: any;
    names: any;
    schema: any;
    transitions: any[];
    operations: any;
    editmeta: any;
    changelog: any;
    versionedRepresentations: any;
    fieldsToInclude: any;
    fields: any;
}

interface ISearchResult {
    expand: string;
    startAt: number;
    maxResults: number;
    total: number;
    issues: Issue[];
    warningMessages: string[];
    names: any;
    schema: any;
}

export declare class Search {
    search(
        opts: {
            method?: 'GET' | 'POST' | 'get' | 'post'
            jql?: string;
            startAt?: number;
            maxResults?: number;
            validateQuery?: string | boolean | 'strict' | 'warn' | 'none' | 'true' | 'false';
            expand?: string[];
            properties?: string[];
            fieldsByKeys?: boolean;
        },
        callback?: (err: any, data: any) => void
    ): Promise<ISearchResult | any>;
}
