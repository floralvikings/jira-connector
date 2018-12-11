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
  this.getAllBoards = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL("/board"),
      method: "GET",
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
  this.getBoard = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL("/board/" + opts.boardId),
      method: "GET",
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
   * @param [opts.jql] Filters results using a JQL query. If you define an order in your JQL query, it will override
   *     the default order of the returned issues. Note that username and userkey have been deprecated as search terms
   *     for this parameter. See the migration guide for details. Use accountId instead.
   * @param [opts.fields] The list of fields to return for each issue. By default, all navigable and Agile fields are
   *     returned.
   * @param [opts.expand] The parameters to expand
   * @param [callback] Called when the issues have been retrieved.
   * @return {Promise} Resolved when the issues have been retrieved.
   */
  this.getIssuesForBoard = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL("/board/" + opts.boardId + "/issue"),
      method: "GET",
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        fields: opts.fields.join(','),
        expand: opts.expand
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
  this.getSprintsForBoard = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL("/board/" + opts.boardId + "/sprint"),
      method: "GET",
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
  this.getIssuesForBacklog = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL("/board/" + opts.boardId + "/backlog"),
      method: "GET",
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
   * Get configuration for a board
   *
   * @method getBoardConfiguration
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param opts.boardId The agile board id.
   * @param [callback] Called when the board configuration has been retrieved.
   * @return {Promise} Resolved when the board configuration has been retrieved.
   */
  this.getBoardConfiguration = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL(
        "/board/" + opts.boardId + "/configuration"
      ),
      method: "GET",
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Creates a board
   *
   * @method createBoard
   * @memberOf AgileSprintClient#
   * @param {string} name Must be less than 255 characters.
   * @param {string} type Valid values: scrum, kanban
   * @param {number} filterId ID of a filter that the user has permissions to view. Note, if the
   *  user does not have the 'Create shared objects' permission and tries to create a shared board,
   *  a private board will be created instead (remember that board sharing depends on the filter sharing).
   * @param {object} location The container that the board will be located in. location must include the
   *  type property (Valid values: project, user). If choosing 'project', then a project must be specified
   *  by a projectKeyOrId property in location. If choosing 'user', the current user is chosen by default.
   *  The projectKeyOrId property should not be provided.
   * @param [callback] Called when the sprint has been created.
   * @return {Promise} Resolved when the sprint has been created.
   */
  this.createBoard = function(name, type, filterId, location, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL("/board"),
      method: "POST",
      followAllRedirects: true,
      json: true,
      body: {
        name,
        type,
        filterId,
        location
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
  this.getProjectsForBoard = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL("/board/" + opts.boardId + "/project"),
      method: "GET",
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };
}
