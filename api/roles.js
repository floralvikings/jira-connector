"use strict";

module.exports = RoleClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/role'
 *
 * @param {JiraClient} jiraClient
 * @constructor RoleClient
 */
function RoleClient(jiraClient) {
  this.jiraClient = jiraClient;

  /**
   * Get all the ProjectRoles available in Jira. Currently this list is global.
   *
   * @method getAll
   * @memberOf RoleClient#
   * @param opts The request options sent to the Jira API.
   * @param [callback] Called when the permissions have been returned.
   * @return {Promise} Resolved when the permissions have been returned.
   */
  this.getAll = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/role'),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  /**
   * Creates a new ProjectRole to be available in Jira.
   * The created role does not have any default actors assigned.
   *
   * @method createRole
   * @memberOf RoleClient#
   * @param opts The request options sent to the Jira API.
   * @param opts.role See {@link https://developer.atlassian.com/cloud/jira/platform/rest/#api-api-2-role-post}
   * @param [callback] Called when the scheme has been created.
   * @return {Promise} Resolved when the scheme has been created.
   */
  this.createRole = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/role'),
      method: 'POST',
      json: true,
      followAllRedirects: true,
      body: opts.role
    };

    return this.jiraClient.makeRequest(options, callback);
  }

  /**
   * Get a specific ProjectRole available in Jira.
   *
   * @method getRoleById
   * @memberOf RoleClient#
   * @param opts The request options sent to the Jira API.
   * @param [callback] Called when the permissions have been returned.
   * @return {Promise} Resolved when the permissions have been returned.
   */
  this.getRoleById = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/role/' + opts.roleId),
      method: 'GET',
      json: true,
      followAllRedirects: true,
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Fully updates a roles. Both name and description must be given.
   *
   * @method updateRole
   * @memberOf RoleClient#
   * @param opts The request options sent to the Jira API.
   * @param opts.roldId Identifier for teh role.
   * @param opts.role Object containing the name and description to be updated.
   * @param [callback] Called when the permissions have been returned.
   * @return {Promise} Resolved when the permissions have been returned.
   */
  this.updateRole = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/role/' + opts.roleId),
      method: 'PUT',
      json: true,
      followAllRedirects: true,
      body: opts.role,
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
  * Deletes a role. May return 403 in the future
  *
  * @method deleteRole
  * @memberOf RoleClient#
  * @param {Object} opts The request options sent to the Jira API.
  * @param {String} opts.roldId Identifier for the role.
  * @param {String} opts.swap if given, removes a role even if it is used in scheme by replacing the role with the given one
  * @param [callback] Called when the permissions have been returned.
  * @return {Promise} Resolved when the permissions have been returned.
  */
  this.deleteRole = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/role/' + opts.roleId),
      method: 'DELETE',
      json: true,
      followAllRedirects: true,
      qs: {
        swap: opts.swap
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
  * Gets default actors for the given role.
  *
  * @method getActors
  * @memberOf RoleClient#
  * @param {Object} opts The request options sent to the Jira API.
  * @param {String} opts.roldId Identifier for the role.
  * @param [callback] Called when the permissions have been returned.
  * @return {Promise} Resolved when the permissions have been returned.
  */
  this.getActors = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/role/' + opts.roleId + '/actors'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
  * Adds default actors to the given role.
  * The request data should contain a list of usernames or a list of groups to add.
  *
  * @method addActors
  * @memberOf RoleClient#
  * @param {Object} opts The request options sent to the Jira API.
  * @param {String} opts.roldId Identifier for the role.
  * @param {Array} opts.group Array of group ids.
  * @param {Array} opts.user Array of user ids.
  * @param [callback] Called when the permissions have been returned.
  * @return {Promise} Resolved when the permissions have been returned.
  */
  this.addActors = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/role/' + opts.roleId + '/actors'),
      method: 'POST',
      json: true,
      followAllRedirects: true,
      body: {
        user: opts.user,
        group: opts.group,
      },
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
  * Removes default actor from the given role.
  *
  * @method removeActor
  * @memberOf RoleClient#
  * @param {Object} opts The request options sent to the Jira API.
  * @param {String} opts.roldId Identifier for the role.
  * @param {String} opts.group group id.
  * @param {String} opts.user user id.
  * @param [callback] Called when the permissions have been returned.
  * @return {Promise} Resolved when the permissions have been returned.
  */
  this.removeActor = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/role/' + opts.roleId + '/actors'),
      method: 'DELETE',
      json: true,
      followAllRedirects: true,
      qs: {
        user: opts.user,
        group: opts.group,
      },
    };

    return this.jiraClient.makeRequest(options, callback);
  };
}