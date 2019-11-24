export interface Scope {
  type: 'PROJECT';
  project: { id: string };
}

export interface IssueType {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
  entityId?: string;
  scope?: Scope;
}
