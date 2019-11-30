export interface Version {
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
