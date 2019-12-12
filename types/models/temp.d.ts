import { IssuesStatusForFixVersion, Operation } from "./version";

export interface Sprint {
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

export interface PageBeanVersion {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: Value[];
}

export interface Board {
  id: number;
  self: string;
  name: string;
  type: string;
  location: BoardLocation;
}

export interface BoardLocation {
  projectId: number;
  displayName: string;
  projectName: string;
  projectKey: string;
  projectTypeKey: string;
  avatarURI: string;
  name: string;
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
