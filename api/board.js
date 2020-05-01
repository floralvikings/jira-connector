'use strict';

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
   * @param {Object} [opts] The request options to send to the Jira API
   * @param {string} [opts.type] Limits returning boards of a specific type: `scrum` or `kanban`.
   * @param {number} [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param {string} [opts.name] Filters results to boards that match or partially match the specified name.
   * @param {string} [opts.projectKeyOrId] Filters results to boards that are relevant to a project. Relevance meaning that
   *     the jql filter defined in board contains a reference to a project.
   * @param {number} [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param {string} [opts.accountIdLocation]
   * @param {string} [opts.userkeyLocation]
   * @param {string} [opts.usernameLocation]
   * @param {string} [opts.projectLocation]
   * @param {boolean} [opts.includePrivate] Appends private boards to the end of the list. The name and type fields are
   *      excluded for security reasons.
   * @param {boolean} [opts.negateLocationFiltering] If set to true, negate filters used for querying by location.
   *      By default false.
   * @param {string} [opts.orderBy] Ordering of the results by a given field. If not provided, values will not be
   *      sorted. Valid values: name.
   * @param {string} [opts.expand] List of fields to expand for each board. Valid values: admins, permissions.
   * @param {function} [callback] Called when the dashboards have been retrieved.
   * @return {Promise} Resolved when the dashboards have been retrieved.
   */
  this.getAllBoards = function (opts, callback) {
    opts = opts || {};

    var options = {
      uri: this.jiraClient.buildAgileURL('/board'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        type: opts.type,
        name: opts.name,
        projectKeyOrId: opts.projectKeyOrId,
        accountIdLocation: opts.accountIdLocation,
        userkeyLocation: opts.userkeyLocation,
        usernameLocation: opts.usernameLocation,
        projectLocation: opts.projectLocation,
        includePrivate: opts.includePrivate,
        negateLocationFiltering: opts.negateLocationFiltering,
        orderBy: opts.orderBy,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Creates a board
   *
   * @method createBoard
   * @memberOf AgileBoardClient#
   * @param {string} name Must be less than 255 characters.
   * @param {string} type Valid values: scrum, kanban
   * @param {number} filterId ID of a filter that the user has permissions to view. Note, if the
   *  user does not have the 'Create shared objects' permission and tries to create a shared board,
   *  a private board will be created instead (remember that board sharing depends on the filter sharing).
   * @param {object} location The container that the board will be located in. location must include the
   *  type property (Valid values: project, user). If choosing 'project', then a project must be specified
   *  by a projectKeyOrId property in location. If choosing 'user', the current user is chosen by default.
   *  The projectKeyOrId property should not be provided.
   * @param {function} [callback] Called when the sprint has been created.
   * @return {Promise} Resolved when the sprint has been created.
   */
  this.createBoard = function (name, type, filterId, location, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board'),
      method: 'POST',
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

  // TODO add JsDoc
  this.getBoardByFilterId = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('board/filter/' + opts.filterId),
      method: 'GET',
      followAllRedirects: true,
      json: true,
      qs: {
        startAt: opts.startAt,
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
   * @param {number} opts.boardId The agile board id.
   * @param {function} [callback] Called when the dashboard has been retrieved
   * @return {Promise} Resolved when the dashboard has been retrieved
   */
  this.getBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId),
      method: 'GET',
      json: true,
      followAllRedirects: true,
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Deletes the board. Admin without the view permission can still remove the board.
   *
   * @method deleteBoard
   * @memberOf AgileBoardClient#
   * @param opts The request options sent to the Jira API.
   * @param {number} opts.boardId The agile board id.
   * @param {function} [callback] Called when the dashboard has been retrieved
   * @return {Promise} Resolved when the dashboard has been retrieved
   */
  this.deleteBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId),
      method: 'DELETE',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a list of all issues from the board's backlog, for the given board Id.
   *
   * @method getIssuesForBacklog
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param {number} opts.boardId The agile board id.
   * @param {string} [opts.jql] Filters results using a JQL query.
   * @param {boolean} [opts.validateQuery] Specifies whether to valide the JQL query.
   * @param {Array<string> | string} [opts.fields] The list of fields to return for each issue.
   * @param {number} [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
   *     maxResults
   * @param {number} [opts.maxResults] A hint as to the the maximum number of issues to return in each call. Note that the
   *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
   *     provides, dues to lack or resources or any other condition. When this happens, your results will be
   *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
   *     being used.
   * @param {function} [callback] Called when the backlog issues have been retrieved.
   * @return {Promise} Resolved when the backlog issues have been retrieved.
   */
  this.getIssuesForBacklog = function (opts, callback) {
    let fields;

    if (opts.fields) {
      if (typeof opts.fields === 'string') fields = opts.fields; // backward compatibility
      else fields = opts.fields.join(',');
    }

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
        fields: fields,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get configuration for a board
   *
   * @method getConfiguration
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param {number} opts.boardId The agile board id.
   * @param {function} [callback] Called when the board configuration has been retrieved.
   * @return {Promise} Resolved when the board configuration has been retrieved.
   */
  this.getConfiguration = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL(
        '/board/' + opts.boardId + '/configuration'
      ),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Returns all epics from the board, for the given board ID. This only includes epics that the user has permission to
   * view. Note, if the user does not have permission to view the board, no epics will be returned at all.
   *
   * @method getEpics
   * @memberOf AgileBoardClient#
   * @param opts The request options to send to the Jira API
   * @param {number} opts.boardId The agile board id.
   * @param {number} [opts.startAt] The starting index of the returned epics. Base index: 0. See the 'Pagination'
   *      section at the top of this page for more details.
   * @param {number} [opts.maxResults] The maximum number of epics to return per page. Default: 50. See the 'Pagination'
   *      section at the top of this page for more details.
   * @param {string} [opts.done] Filters results to epics that are either done or not done. Valid values: true, false.
   * @param {function} [callback] Called when the board configuration has been retrieved.
   * @return {Promise} Resolved when the board configuration has been retrieved.
   */
  this.getEpics = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL(
        '/board/' + opts.boardId + '/epic'
      ),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        done: opts.done
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Returns all issues that do not belong to any epic on a board, for a given board ID. This only includes issues that
   * the user has permission to view. Issues returned from this resource include Agile fields, like sprint,
   * closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.
   * 
   * @method getIssuesWithoutEpic
   * @memberOf AgileBoardClient#
   * @param opts
   * @param {number | string} opts.boardId
   * @param {number} [opts.startAt] The starting index of the returned issues. Base index: 0. See the 'Pagination'
   *      section at the top of this page for more details.
   * @param {number} [opts.maxResults] The maximum number of issues to return per page. Default: 50. See the
   *      'Pagination' section at the top of this page for more details. Note, the total number of issues returned is
   *      limited by the property 'jira.search.views.default.max' in your Jira instance. If you exceed this limit,
   *      your results will be truncated.
   * @param {string} [opts.jql] Filters results using a JQL query. If you define an order in your JQL query, it will
   *      override the default order of the returned issues.
   *      Note that username and userkey have been deprecated as search terms for this parameter. See the migration guide
   *      for details. Use accountId instead.
   * @param {boolean} [opts.validateQuery] Specifies whether to validate the JQL query or not. Default: true.
   * @param {Array<string>} [opts.fields] The list of fields to return for each issue. By default, all navigable and
   *      Agile fields are returned.
   * @param {string} [opts.expand] A comma-separated list of the parameters to expand.
   * @param {function} [callback] Called when the board configuration has been retrieved.
   * @return {Promise} Resolved when the board configuration has been retrieved.
   */
  this.getIssuesWithoutEpic = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL(
        '/board/' + opts.boardId + '/epic/none/issue'
      ),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        validateQuery: opts.validateQuery,
        fields: opts.fields ? opts.fields.join(',') : undefined,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.getIssuesForEpic = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/epic/' + opts.epicId + '/issue'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        validateQuery: opts.validateQuery,
        fields: opts.fields ? opts.fields.join(',') : undefined,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.getFeaturesForBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board' + opts.boardId + '/features'),
      method: 'GET',
      json: true,
      followAllRedirects: true
    }

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.toggleFeatures = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board' + opts.boardId + '/features'),
      method: 'PUT',
      json: true,
      followAllRedirects: true,
      body: {
        boardId: opts.boardIdBody,
        feature: opts.feature,
        enabling: opts.enabling
      }
    }

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
  this.getIssuesForBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/issue'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        validateQuery: opts.validateQuery,
        fields: opts.fields ? opts.fields.join(',') : undefined,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.moveIssuesToBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/issue'),
      method: 'POST',
      json: true,
      followAllRedirects: true,
      qs: {
        issues: opts.issues ? opts.issues.join(',') : undefined,
        rankBeforeIssue: opts.rankBeforeIssue,
        rankAfterIssue: opts.rankAfterIssue,
        rankCustomFieldId: opts.rankCustomFieldId
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.getProjects = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/project'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.getProjectsFull = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/project/full'),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.getBoardPropertyKeys = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/properties'),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  // TODO add JsDoc
  this.getBoardProperty = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/properties/' + opts.propertyKey),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  /**
   * Sets the value of the specified board's property. You can use this resource to store a
   * custom data against the board identified by the id. The user who stores the data is required
   * to have permissions to modify the board.
   * 
   * @method setBoardProperty
   * @memberof AgileBoardClient
   * @param {Object} opts
   * @param {string | number} opts.boardId
   * @param {string | number} opts.propertyKey
   * @param {any} opts.property specified board's property.
   * @param {callback} [callback]
   * @returns {Promise}
   */
  this.setBoardProperty = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/properties/' + opts.propertyKey),
      method: 'PUT',
      json: true,
      followAllRedirects: true,
      body: opts.property
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  // TODO add JsDoc
  this.deleteBoardProperty = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/properties/' + opts.propertyKey),
      method: 'DELETE',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  // TODO add JsDoc
  this.getAllQuickFilters = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/quickfilter'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  // TODO add JsDoc
  this.getQuickFilter = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/quickfilter/' + opts.quickFilterId),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  /**
   * Get a list of sprints associated with an agile board
   * 
   * @deprecated Use board.getAllSprints
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
    return this.getAllSprints(opts, callback);
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
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get reports for associated board
   *
   * @method getReportsForBoard
   * @memberOf AgileBoardClient#
   * @param {Object} opts The request options to send to the Jira API
   * @param {number} opts.boardId The agile board id.
   * @param {function} [callback] Called when the sprints have been retrieved.
   * @return {Promise} Resolved when the sprints have been retrieved.
   */
  this.getReportsForBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/reports'),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.getAllSprints = function (opts, callback) {
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

  // TODO add JsDoc
  this.getIssuesForSprint = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/sprint/' + opts.sprintId + '/issue'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        validateQuery: opts.validateQuery,
        fields: opts.fields ? opts.fields.join(',') : undefined,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  // TODO add JsDoc
  this.getAllVersions = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/board/' + opts.boardId + '/version'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        released: opts.released
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };
}
