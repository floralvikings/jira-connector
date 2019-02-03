"use strict";

module.exports = AgileBacklogClient;

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/backlog'
 * @param {JiraClient} jiraClient
 * @constructor AgileBacklogClient
 */
function AgileBacklogClient(jiraClient) {
  this.jiraClient = jiraClient;

  /**
   * Move issues to the backlog. This operation is equivalent to remove future and active sprints from a given set of
   * issues. At most 50 issues may be moved at once.
   *
   * @method moveIssuesToBacklog
   * @memberOf AgileBacklogClient#
   * @param opts The request options sent to the Jira API.
   * @param [opts.issues] Array of strings with issues keys or ids
   * @param [callback] Called when the dashboard has been retrieved
   * @return {Promise} Resolved when the dashboard has been retrieved
   */
  this.moveIssuesToBacklog = function (opts, callback) {
    opts = opts || {};
    var options = {
      uri: this.jiraClient.buildAgileURL("/backlog/issue"),
      method: "POST",
      json: true,
      followAllRedirects: true,
      body: {
        issues: opts.issues
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Move issues to the backlog of a particular board (if they are already on that board).
   * This operation is equivalent to remove future and active sprints from a given set of issues if the board has sprints
   * If the board does not have sprints this will put the issues back into the backlog from the board. At most 50 issues
   * may be moved at once.
   *
   * @method moveIssuesToBacklogForBoard
   * @memberOf AgileBacklogClient#
   * @param opts The request options sent to the Jira API.
   * @param opts.boardId The agile board id.
   * @param [opts.issues] Array of strings with issues keys or ids
   * @param [opts.rankBeforeIssue] string
   * @param [opts.rankAfterIssue] string
   * @param [opts.rankCustomFieldId] int64
   * @param [callback] Called when the dashboard has been retrieved
   * @return {Promise} Resolved when the dashboard has been retrieved
   */
  this.moveIssuesToBacklogForBoard = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL("/backlog/" + opts.boardId + "/issue"),
      method: "POST",
      json: true,
      followAllRedirects: true,
      body: {
        issues: opts.issues,
        rankBeforeIssue: opts.rankBeforeIssue,
        rankAfterIssue: opts.rankAfterIssue,
        rankCustomFieldId: opts.rankCustomFieldId
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };
}
