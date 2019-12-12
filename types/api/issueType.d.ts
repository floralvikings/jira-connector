import { Callback } from "../callback";
import { IssueType as IssueTypeModel } from "../models";

export class IssueType {
  getAllIssueTypes(
    opts?: {},
    callback?: Callback<IssueTypeModel[]>,
  ): Promise<IssueTypeModel[]>;

  createIssueType(
    opts: {
      name: string;
      description?: string;
      type?: 'subtype' | 'standard';
    },
    callback?: Callback<IssueTypeModel>,
  ): Promise<IssueTypeModel>;

  getIssueType(
    opts: { issueTypeId: string },
    callback?: Callback<IssueTypeModel>,
  ): Promise<IssueTypeModel>;

  updateIssueType(
    opts: {
      issueTypeId: string;
      issueType: Partial<{
        name: string;
        description: string;
        avatarId: string | number;
      }>;
    },
    callback?: Callback<IssueTypeModel>,
  ): Promise<IssueTypeModel>;

  deleteIssueType(
    opts: {
      issueTypeId: string;
      alternativeIssueTypeId?: string;
    },
    callback?: Callback<void>,
  ): Promise<void>;

  getAlternativeIssueTypes(
    opts: { issueTypeId: string },
    callback?: Callback<IssueTypeModel[]>,
  ): Promise<IssueTypeModel[]>;
}
