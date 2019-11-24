"use strict";

module.exports = AgileSprintClient;

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/sprint'
 * @param {JiraClient} jiraClient
 * @constructor AgileSprintClient
 */
function AgileSprintClient(jiraClient) {
  this.jiraClient = jiraClient;

  /**
   * Creates a sprint from a JSON representation.
   *
   * @method createSprint
   * @memberOf AgileSprintClient#
   * @param {Object} sprint The sprint data in the form of POST body to the
   *   Jira API.
   * @param {callback} [callback] Called when the sprint has been created.
   * @return {Promise} Resolved when the sprint has been created.
   */
  this.createSprint = function (sprint, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint'),
      method: 'POST',
      followAllRedirects: true,
      json: true,
      body: sprint
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a single sprint.
   *
   * @method getSprint
   * @memberOf AgileSprintClient#
   * @param {object} opts The request options sent to the Jira API.
   * @param {string} opts.sprintId The sprint id.
   * @param {string} [opts.filter]
   * @param {string} [opts.startAt]
   * @param {string} [opts.maxResults]
   * @param {callback} [callback] Called when the sprint has been retrieved.
   * @return {Promise} Resolved when the sprint has been retrieved.
   */
  this.getSprint = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        filter: opts.filter,
        startAt: opts.startAt,
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Perform a full update of a sprint.
   *
   * @method updateSprint
   * @memberOf AgileSprintClient#
   * @param {Object} sprint The sprint data in the form of PUT body to the
   *   Jira API.
   * @param {string} sprint.sprintId The id of the sprint.  EX: 331
   * @param {callback} [callback] Called when the sprint has been updated.
   * @return {Promise} Resolved when the sprint has been updated.
   */
  this.updateSprint = function (sprint, callback) {
    var sprintId = sprint.sprintId;
    delete sprint.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + sprintId),
      method: 'PUT',
      followAllRedirects: true,
      json: true,
      body: sprint
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Perform a partial update of a sprint.
   *
   * @method partiallyUpdateSprint
   * @memberOf AgileSprintClient#
   * @param {Object} sprint The sprint data in the form of POST body to the
   *   Jira API.
   * @param {string} [sprint.sprintId] The id of the sprint.  EX: 331.
   * @param {callback} [callback] Called when the sprint has been updated.
   * @return {Promise} Resolved when the sprint has been updated.
   */
  this.partiallyUpdateSprint = function (sprint, callback) {
    var sprintId = sprint.sprintId;
    delete sprint.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + sprintId),
      method: 'POST',
      followAllRedirects: true,
      json: true,
      body: sprint
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Delete an existing sprint.
   *
   * @method deleteSprint
   * @memberOf AgileSprintClient#
   * @param {Object} opts The request options sent to the Jira API.
   * @param {string} opts.sprintId The id of the sprint.  EX: 331
   * @param {string} [opts.filter]
   * @param {string} [opts.startAt]
   * @param {string} [opts.maxResults]
   * @param {callback} [callback] Called when the sprint is deleted.
   * @return {Promise} Resolved when the sprint is deleted.
   */
  this.deleteSprint = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId),
      method: 'DELETE',
      json: true,
      followAllRedirects: true,
      qs: {
        filter: opts.filter,
        startAt: opts.startAt,
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Return all issues in a sprint, for a given sprint id.
   *
   * @method getSprintIssues
   * @memberOf AgileSprintClient#
   * @param {Object} opts The request options sent to the Jira API.
   * @param {string} opts.sprintId The sprint id.
   * @param {string} [opts.startAt]
   * @param {string} [opts.maxResults]
   * @param {string} [opts.jql] Filters results using a JQL query.
   * @param {boolean} [opts.validateQuery] Specifies whether to valide the JQL query.
   * @param {string} [opts.fields] The list of fields to return for each issue.
   * @param {string} [opts.expand] A comma-separated list of the parameters to expand.
   * @param {callback} [callback] Called when the issues are returned.
   * @return {Promise} Resolved when the issues are returned.
   */
  this.getSprintIssues = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId + '/issue'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        validateQuery: opts.validateQuery,
        fields: opts.fields,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Move issues to a sprint, for a given sprint id.
   *
   * @method moveSprintIssues
   * @memberOf AgileSprintClient#
   * @param {Object} opts The issue data in the form of POST body to the
   *   Jira API.
   * @param {string} opts.sprintId The sprint id.
   * @param {string[]} opts.issues Ids of the issues to move.
   * @param {string} [opts.rankBeforeIssue]
   * @param {string} [opts.rankAfterIssue]
   * @param {string} [opts.rankCustomField]
   * @param {callback} [callback] Called when the sprint has been retrieved.
   * @return {Promise} Resolved when the sprint has been retrieved.
   */
  this.moveSprintIssues = function (opts, callback) {
    var sprintId = opts.sprintId;
    delete opts.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + sprintId + '/issue'),
      method: 'POST',
      followAllRedirects: true,
      json: true,
      body: opts
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Swap the position of the sprint (given by sprint id) with the second
   * sprint.
   *
   * @method swapSprint
   * @memberOf AgileSprintClient#
   * @param {Object} opts The data in the form of POST body to the Jira API.
   * @param {string} opts.sprintId The id of the sprint.  EX: 311
   * @param {string} opts.sprintToSwapWith The id of the sprint.  EX: 311
   * @param {callback} [callback] Called when the sprint has been retrieved.
   * @return {Promise} Resolved when the sprint has been retrieved.
   */
  this.swapSprint = function (opts, callback) {
    var sprintId = opts.sprintId;
    delete opts.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + sprintId + '/swap'),
      method: 'POST',
      followAllRedirects: true,
      json: true,
      body: opts
    };

    return this.jiraClient.makeRequest(options, callback);
  };

}
