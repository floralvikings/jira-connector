"use strict";

module.exports = AgileBoardClient;

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/dashboard'
 * @param {JiraClient} jiraClient
 * @constructor AgileBoardClient
 */
function AgileBoardClient(jiraClient) {
  this.jiraClient = jiraClient;

  /**
   * Get a list of all dashboards, optionally filtering them.
   *
   * @method getAllBoards
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param [opts.type] Limits returning boards of a specific type: `scrum` or `kanban`.
   * @param [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param [opts.name] Filters results to boards that match or partially match the specified name.
   * @param [opts.projectKeyOrId] Filters results to boards that are relevant to a project. Relevance meaning that
   *     the jql filter defined in board contains a reference to a project.
   * @param [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param [callback] Called when the dashboards have been retrieved.
   * @return {Promise} Resolved when the dashboards have been retrieved.
   */
  this.getAllBoards = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        type: opts.type,
        startAt: opts.startAt,
        name: opts.name,
        projectKeyOrId: opts.projectKeyOrId,
        maxResults: opts.maxResults
      }
    };

      return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a single agile board.
   *
   * @method getBoard
   * @memberOf AgileBoardClient#
   * @param opts The request options sent to the Jira API.
   * @param opts.boardId The agile board id.
   * @param [callback] Called when the dashboard has been retrieved
   * @return {Promise} Resolved when the dashboard has been retrieved
   */
  this.getBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId),
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
   * Get a list of all issues associated with an agile board
   *
   * @method getIssuesForBoard
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param opts.boardId The agile board id.
   * @param [opts.startAt] The index of the first issue to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param [opts.maxResults] A hint as to the the maximum number of issues to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param [callback] Called when the issues have been retrieved.
   * @return {Promise} Resolved when the issues have been retrieved.
   */
  this.getIssuesForBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/issue'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql
      }
    };

      return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a list of sprints associated with an agile board
   *
   * @method getSprintsForBoard
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param opts.boardId The agile board id.
   * @param [opts.startAt] The index of the first sprint to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param [opts.maxResults] A hint as to the the maximum number of sprints to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param [opts.state] Optionally filter by state, e.g. 'active'.
   * @param callback Called when the sprints have been retrieved.
   * @return {Promise} Resolved when the sprints have been retrieved.
   */
  this.getSprintsForBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/sprint'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        state: opts.state
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a list of all issues from the board's backlog, for the given board Id.
   *
   * @method getIssuesForBacklog
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param opts.boardId The agile board id.
   * @param {string} jql Filters results using a JQL query.
   * @param {boolean} validateQuery Specifies whether to valide the JQL query.
   * @param {string} fields The list of fields to return for each issue.
   * @param [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param [opts.maxResults] A hint as to the the maximum number of issues to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param [callback] Called when the backlog issues have been retrieved.
   * @return {Promise} Resolved when the backlog issues have been retrieved.
   */
  this.getIssuesForBacklog = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/backlog'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        validateQuery: opts.validateQuery,
        fields: opts.fields
      }
    };

      return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a list of projects associated board
   *
   * @method getProjectsForBoard
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param opts.boardId The agile board id.
   * @param [opts.startAt] The index of the first sprint to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param [opts.maxResults] A hint as to the the maximum number of sprints to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param callback Called when the sprints have been retrieved.
   * @return {Promise} Resolved when the sprints have been retrieved.
   */
  this.getProjectsForBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/project'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };
}
