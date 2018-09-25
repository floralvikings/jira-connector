"use strict";

module.exports = PermissionsClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/permissions'
 *
 * @param {JiraClient} jiraClient
 * @constructor PermissionsClient
 */
function PermissionsClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all permissions that are present in the JIRA instance
     * - Global, Project and the global ones added by plugins
     *
     * @method getAllPermissions
     * @memberOf PermissionsClient#
     * @param opts The request options sent to the Jira API.
     * @param [callback] Called when the permissions have been returned.
     * @return {Promise} Resolved when the permissions have been returned.
     */
    this.getAllPermissions = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/permissions'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}