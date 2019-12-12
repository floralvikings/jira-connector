import { Callback } from "../callback";
import { Board as BoardModel } from "../models";

export class Board {
  getAllBoards(
    opts?: {
      startAt?: number;
      maxResults?: number;
      type?: string;
      name?: string;
      projectKeyOrId?: string | number;
      accountIdLocation?: string;
      userkeyLocation?: string;
      usernameLocation?: string;
      projectLocation?: string;
      includePrivate?: boolean;
      negateLocationFiltering?: boolean;
      orderBy?: string;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any>;
  createBoard(
    name: string,
    type: string,
    filterId: number,
    location: {
      type: string;
      projectKeyOrId: string;
    },
    callback?: Callback
  ): Promise<any>;
  getBoardByFilterId(opts: {
    filterId: number;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback): Promise<any>;
  getBoard(opts: {
    boardId: number | string;
  }, callback?: Callback<BoardModel>): Promise<BoardModel>;
  deleteBoard(opts: {
    boardId: number | string;
  }, callback?: Callback): Promise<any>;
  getIssuesForBacklog(opts: {
    boardId: number | string;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback): Promise<any>;
  getConfiguration(opts: {
    boardId: number | string;
  }, callback?: Callback): Promise<any>;
  getEpics(opts: {
    boardId: number | string;
    startAt?: number;
    maxResults?: number;
    done?: string;
  }, callback?: Callback): Promise<any>;
  getIssuesWithoutEpic(opts: {
    boardId: number | string;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback): Promise<any>;
  getIssuesForEpic(opts: {
    boardId: number | string;
    epicId: number | string;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback): Promise<any>;
  getFeaturesForBoard(opts: {
    boardId: number | string;
  }, callback?: Callback): Promise<any>;
  toggleFeatures(opts: {
    boardId: number | string;
    boardIdBody?: number | string;
    feature?: string;
    enabling?: boolean;
  }, callback?: Callback): Promise<any>;
  getIssuesForBoard(opts: {
    boardId: number | string;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback): Promise<any>;
  moveIssuesToBoard(opts: {
    boardId: number | string;
    issues?: string[];
    rankBeforeIssue?: string;
    rankAfterIssue?: string;
    rankCustomFieldId?: number | string;
  }, callback?: Callback): Promise<any>;
  getProjects(opts: {
    boardId: number | string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback): Promise<any>;
  getProjectsFull(opts: {
    boardId: number | string;
  }, callback?: Callback): Promise<any>;
  getBoardPropertyKeys(opts: {
    boardId: number | string;
  }, callback?: Callback): Promise<any>;
  getBoardProperty(opts: {
    boardId: number | string;
    propertyKey: string;
  }, callback?: Callback): Promise<any>;
  setBoardProperty(opts: {
    boardId: number | string;
    propertyKey: string;
    property: any;
  }, callback?: Callback): Promise<any>;
  deleteBoardProperty(opts: {
    boardId: number | string;
    propertyKey: string;
  }, callback?: Callback): Promise<any>;
  getAllQuickFilters(opts: {
    boardId: number | string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback): Promise<any>;
  getQuickFilter(opts: {
    boardId: number | string;
    quickFilterId: number | string;
  }, callback?: Callback): Promise<any>;
  getReportsForBoard(opts: {
    boardId: number | string;
  }, callback?: Callback): Promise<any>;
  getAllSprints(opts: {
    boardId: number | string;
    startAt?: number;
    maxResults?: number;
    state?: string;
  }, callback?: Callback): Promise<any>;
  getIssuesForSprint(opts: {
    boardId: number | string;
    sprintId: number | string;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback): Promise<any>;
  getAllVersions(opts: {
    boardId: number | string;
    startAt?: number;
    maxResults?: number;
    released?: string;
  }, callback?: Callback): Promise<any>;
}
