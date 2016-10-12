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
   * The fields that can be set on create can be determined using the
   * /rest/agile/1.0/sprint resource.
   *
   * @method createSprint
   * @memberOf AgileSprintClient#
   * @param {Object} sprint The sprint data in the form of POST body to the
   *   Jira API.
   * @param callback Called when the sprint has been created.
   */
  this.createSprint = function (sprint, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint'),
      method: 'POST',
      followAllRedirects: true,
      json: true,
      body: sprint
    };

    this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a single sprint.
   *
   * @method getSprint
   * @memberOf AgileSprintClient#
   * @param opts The request options sent to the Jira API.
   * @param callback Called when the sprint has been retrieved.
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

    this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Perform a full update of a sprint.
   *
   * @method updateSprint
   * @memberOf AgileSprintClient#
   * @param {Object} sprint The sprint data in the form of PUT body to the
   *   Jira API, including the sprint identifier.
   * @param callback Called when the sprint has been updated.
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

    this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Perform a partial update of a sprint.
   *
   * @method partiallyUpdateSprint
   * @memberOf AgileSprintClient#
   * @param {Object} sprint The sprint data in the form of POST body to the
   *   Jira API, including the sprint identifier.
   * @param callback Called when the sprint has been updated.
   */
  this.partiallyUpdateSprint = function (sprint, callback) {
    var sprintId = sprint.sprintId;
    delete sprint.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint' + sprintId),
      method: 'POST',
      followAllRedirects: true,
      json: true,
      body: sprint
    };

    this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Delete an existing sprint.
   *
   * @method deleteSprint
   * @memberOf AgileSprintClient#
   * @param {Object} opts The request options sent to the Jira API.  Note that
   *   this object must contain a sprintId.
   * @param callback Called when the sprint is deleted.
   */
  this.deleteSprint = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Return all issues in a sprint, for a given sprintId.
   *
   * @method getSprintIssues
   * @memberOf AgileSprintClient#
   * @param {Object} opts The request options sent to the Jira API.
   * @param callback Called when the issues are returned.
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

    this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Move issues to a sprint, for a given sprintId.
   *
   * @method moveSprintIssues
   * @memberOf AgileSprintClient#
   * @param opts The request options sent to the Jira API.
   * @param callback Called when the sprint has been retrieved.
   */
  this.moveSprintIssues = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId + '/issue'),
      method: 'POST',
      json: true,
      followAllRedirects: true
    };

    this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Swap the position of the sprint (given by sprintId) with the second
   * sprint.
   *
   * @method swapSprint
   * @memberOf AgileSprintClient#
   * @param opts The request options sent to the Jira API.
   * @param callback Called when the sprint has been retrived.
   */
  this.swapSprint = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId + '/swap'),
      method: 'POST',
      json: true,
      followAllRedirects: true
    };

    this.jiraClient.makeRequest(options, callback);
  };

  // TODO: Get properties keys
  // TODO: Set property
  // TODO: Get property
  // TODO: Delete property
}
