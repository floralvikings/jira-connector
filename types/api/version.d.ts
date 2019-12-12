import { Callback } from "../callback";
import { Version as VersionModel } from "../models";

export class Version {
  createVersion(
    opts: {
      expand?: string;
      description?: string;
      name?: string;
      archived?: boolean;
      released?: boolean;
      startDate?: string;
      releaseDate?: string;
      project?: string;
      projectId?: number;
      moveUnfixedIssuesTo?: string;
    },
    callback?: Callback<VersionModel>
  ): Promise<VersionModel>;

  moveVersion(
    opts: {
      versionId: string;
      after?: string;
      position?: string;
    },
    callback?: Callback<VersionModel>
  ): Promise<VersionModel>;

  getAllVersions(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  getVersion(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  editVersion(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  getRelatedIssueCounts(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  getUnresolvedIssueCount(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  getRemoteLinks(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  createRemoteLink(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  getRemoteLink(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  deleteRemoteLink(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  deleteVersion(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  deleteAllRemoteLinks(
    opts: any,
    callback?: Callback
  ): Promise<any>;

  getGlobalRemoteLink(
    opts: any,
    callback?: Callback
  ): Promise<any>;
}
