"use strict";

module.exports = DevelopmentInformationClient;

/**
 * Used to access Jira REST endpoints in ' /rest/devinfo/0.10'
 * @param {JiraClient} jiraClient
 * @constructor DevelopmentInformationClient
 */
function DevelopmentInformationClient(jiraClient) {
  this.jiraClient = jiraClient;

  this.store = function (params, callback) {
    const options = {
      uri: this.jiraClient.buildAbstractURL("/devinfo/0.10/bulk"),
      method: 'POST',
      headers: {
        Authorization: params.Authorization
      },
      json: true,
      followAllRedirects: true,
      body: {
        repositories: params.repositories,
        preventTransitions: params.preventTransitions,
        properties: params.properties,
        providerMetadata: params.providerMetadata,
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  this.getRepository = function (params, callback) {
    const options = {
      uri: this.jiraClient.buildAbstractURL("/devinfo/0.10/repository/" + params.repositoryId),
      method: 'GET',
      headers: {
        Authorization: params.Authorization
      },
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  this.deleteRepository = function (params, callback) {
    const options = {
      uri: this.jiraClient.buildAbstractURL("/devinfo/0.10/repository/" + params.repositoryId),
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization
      },
      json: true,
      followAllRedirects: true,
      qs: {
        _updateSequenceId: params._updateSequenceId
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  this.deleteByProperties = function (params, callback) {
    const options = {
      uri: this.jiraClient.buildAbstractURL("/devinfo/0.10/bulkByProperties"),
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization
      },
      json: true,
      followAllRedirects: true,
      qs: {
        _updateSequenceId: params._updateSequenceId
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  this.checkExists = function (params, callback) {
    const options = {
      uri: this.jiraClient.buildAbstractURL("/devinfo/0.10/existsByProperties"),
      method: 'GET',
      headers: {
        Authorization: params.Authorization
      },
      json: true,
      followAllRedirects: true,
      qs: {
        _updateSequenceId: params._updateSequenceId
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  this.deleteEntity = function (params, callback) {
    const options = {
      uri: this.jiraClient.buildAbstractURL(
        "/devinfo/0.10/repository/" +
        params.repositoryId + "/" +
        params.entityType + "/" +
        params.entityId
      ),
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization
      },
      json: true,
      followAllRedirects: true,
      qs: {
        _updateSequenceId: params._updateSequenceId
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  }
}
