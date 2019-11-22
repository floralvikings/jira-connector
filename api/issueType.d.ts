import { JiraIssueType } from '../index';

declare class IssueTypeClient {
  getAllIssueTypes(
    opts?: {},
    callback?: (err: any, data: JiraIssueType[]) => void
  ): Promise<JiraIssueType[]>;

  createIssueType(
    opts: {
      name: string;
      description?: string;
      type?: 'subtype' | 'standard';
    },
    callback?: (err: any, data: JiraIssueType) => void
  ): Promise<JiraIssueType>;

  getIssueType(
    opts: { issueTypeId: string },
    callback?: (err: any, data: JiraIssueType) => void
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
    callback?: (err: any, data: JiraIssueType) => void
  ): Promise<JiraIssueType>;

  deleteIssueType(
    opts: {
      issueTypeId: string;
      alternativeIssueTypeId?: string;
    },
    callback?: (err: any, data: any) => void
  ): Promise<any>;

  getAlternativeIssueTypes(
    opts: { issueTypeId: string },
    callback?: (err: any, data: JiraIssueType[]) => void
  ): Promise<JiraIssueType[]>;
}

export = IssueTypeClient;
