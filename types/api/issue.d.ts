import { Callback } from "../callback";

export interface HistoryMetadataParticipant {
  [key: string]: any;
  id?: string;
  displayName?: string;
  displayNameKey?: string;
  type?: string;
  avatarUrl?: string;
  url?: string;
}

export interface HistoryMetadata {
  [key: string]: any;
  type?: string;
  description?: string;
  descriptionKey?: string;
  activityDescription?: string;
  activityDescriptionKey?: string;
  emailDescription?: string;
  emailDescriptionKey?: string;
  actor?: HistoryMetadataParticipant;
  generator?: HistoryMetadataParticipant;
  cause?: HistoryMetadataParticipant;
  extraData?: any;
}

export class Issue {
  [method: string]: any;

  editIssue(
    opts: {
      issueKey?: string | number;
      issueId?: string | number;
      notifyUsers?: boolean;
      overrideScreenSecurity?: boolean;
      overrideEditableFlag?: boolean;
      issue?: {
        [key: string]: any;
        transition?: {
          [key: string]: any;
          id?: string | number;
        };
        fields?: any;
        update?: any;
        historyMetadata?: HistoryMetadata,
        properties: any[];
      }
    },
    callback?: Callback
  ): Promise<any>;

  addComment(
    opts: {
      [key: string]: any;
      issueId?: string;
      issueKey?: string;
      expand?: string;
      body?: string;
      visibility?: {
        [key: string]: any;
        type?: string | 'role' | 'group';
        value?: string;
      };
      properties?: any[];
    },
    callback?: Callback
  ): Promise<any>;

  deleteComment(
    opts: {
      issueId?: string | number;
      issueKey?: string | number;
      commentId: string | number;
    },
    callback?: Callback
  ): Promise<string>;

  getChangelog(
    opts: {
      issueId?: number | string,
      issueKey?: number | string,
      startAt?: number,
      maxResults?: number
    },
    callback?: Callback
  ): Promise<any>;

  addWorkLog(
    opts: {
      [key: string]: any,
      issueId?: number | string,
      issueKey?: number | string,
      notifyUsers?: boolean,
      adjustEstimate?: 'auto' | 'new' | 'manual' | 'leave',
      newEstimate?: string,
      reduceBy?: string,
      expand?: string,
      overrideEditableFlag?: boolean,
      comment?: any,
      visibility?: {
        [key: string]: any,
        type?: 'group' | 'role',
        value?: string
      },
      started?: string,
      timeSpent?: string,
      timeSpentSeconds?: number | string,
      properties?: Array<{
        [key: string]: any
      }>
    },
    callback?: Callback
  ): Promise<any>;

  getWorklog(
    opts: {
      issueId?: number | string,
      issueKey?: number | string,
      id: string,
      expand?: string
    },
    callback?: Callback
  ): Promise<any>;

  updateWorklog(
    opts: {
      [key: string]: any,
      issueId?: number | string,
      issueKey?: number | string,
      id: string,
      notifyUsers?: boolean,
      adjustEstimate?: 'auto' | 'new' | 'manual' | 'leave',
      newEstimate?: string,
      expand?: string,
      overrideEditableFlag?: boolean,
      comment?: any,
      visibility?: {
        [key: string]: any,
        type?: 'group' | 'role',
        value?: string
      },
      started?: string,
      timeSpent?: string,
      timeSpentSeconds?: number | string,
      properties?: Array<{
        [key: string]: any
      }>
    },
    callback?: Callback
  ): Promise<any>;

  deleteWorklog(
    opts: {
      issueId?: number | string,
      issueKey?: number | string,
      id: string,
      notifyUsers?: boolean,
      adjustEstimate?: string,
      newEstimate?: string,
      increaseBy?: string,
      overrideEditableFlag?: boolean
    },
    callback?: Callback
  ): Promise<any>;

  addAttachment(
    opts: {
      filename: string | string[],
      issueId?: string | number,
      issueKey?: string | number,
      headers?: {
        'X-Atlassian-Token'?: string,
        charset?: string,
        [key: string]: any
      }
    },
    callback?: Callback
  ): Promise<Array<{
    [key: string]: any,
    self: string,
    id: string,
    filename: string,
    author: {
      self: string,
      accountId: string,
      emailAddress: string,
      avatarUrls: {
        '48x48': string,
        '24x24': string,
        '16x16': string,
        '32x32': string
      },
      displayName: string,
      active: boolean,
      timeZone: string
    },
    created: string,
    size: number,
    mimeType: string,
    content: string,
    thumbnail: string
  }>>;
}
