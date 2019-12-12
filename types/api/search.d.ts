import { Callback } from "../callback";

export interface IssueResponse {
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

export interface SearchResult {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: IssueResponse[];
  warningMessages: string[];
  names: any;
  schema: any;
}

export class Search {
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
      timeout?: number;
      fields?: string[];
    },
    callback?: Callback<SearchResult>
  ): Promise<SearchResult>;
}
