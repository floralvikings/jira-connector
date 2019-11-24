import { JiraIssueType, Callback } from '../index';

export class IssueType {
    getAllIssueTypes(
        opts?: {},
        callback?: Callback<JiraIssueType[]>,
    ): Promise<JiraIssueType[]>;

    createIssueType(
        opts: {
            name: string;
            description?: string;
            type?: 'subtype' | 'standard';
        },
        callback?: Callback<JiraIssueType>,
    ): Promise<JiraIssueType>;

    getIssueType(
        opts: { issueTypeId: string },
        callback?: Callback<JiraIssueType>,
    ): Promise<JiraIssueType>;

    updateIssueType(
        opts: {
            issueTypeId: string;
            issueType: Partial<{
                name: string;
                description: string;
                avatarId: string | number;
            }>;
        },
        callback?: Callback<JiraIssueType>,
    ): Promise<JiraIssueType>;

    deleteIssueType(
        opts: {
            issueTypeId: string;
            alternativeIssueTypeId?: string;
        },
        callback?: Callback<void>,
    ): Promise<void>;

    getAlternativeIssueTypes(
        opts: { issueTypeId: string },
        callback?: Callback<JiraIssueType[]>,
    ): Promise<JiraIssueType[]>;
}
