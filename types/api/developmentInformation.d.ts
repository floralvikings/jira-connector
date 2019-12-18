import { Callback } from "../callback";

export class DevelopmentInformation {
  store(
    params: {
      Authorization: string,
      repositories: any[],
      preventTransitions?: boolean,
      properties?: any,
      providerMetadata?: any,
    },
    callback?: Callback
  ): Promise<any>;

  getRepository(
    params: {
      Authorization: string,
      repositoryId: string
    },
    callback?: Callback
  ): Promise<any>;

  deleteRepository(
    params: {
      Authorization: string,
      repositoryId: string,
      _updateSequenceId?: number
    },
    callback?: Callback
  ): Promise<any>;

  deleteByProperties(
    params: {
      Authorization: string,
      _updateSequenceId?: number
    },
    callback?: Callback
  ): Promise<any>;

  checkExists(
    params: {
      Authorization: string,
      _updateSequenceId?: number
    },
    callback?: Callback
  ): Promise<any>;

  deleteEntity(
    params: {
      Authorization: string,
      repositoryId: string,
      entityType: 'commit' | 'branch' | 'pull_request',
      entityId: string,
      _updateSequenceId?: number
    },
    callback?: Callback
  ): Promise<any>;
}
