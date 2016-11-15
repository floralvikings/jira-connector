"use strict";

module.exports = LicenseRoleClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/licenserole'
 * @param {JiraClient} jiraClient
 * @constructor LicenseRoleClient
 */
function LicenseRoleClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all license roles in the system.
     *
     * @method getAllLicenseRoles
     * @memberOf LicenseRoleClient#
     * @param opts Ignored
     * @param [callback] Called when the license roles have been retrieved.
     * @return {Promise} Resolved when the license roles have been retrieved.
     */
    this.getAllLicenseRoles = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/licenserole'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Gets the passed license role if it exists.
     *
     * @method getLicenseRole
     * @memberOf LicenseRoleClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.roleId The id of the license role to retrieve.
     * @param [callback] Called when the license role is retrieved.
     * @return {Promise} Resolved when the license role is retrieved.
     */
    this.getLicenseRole = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/licenserole/' + opts.roleId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Updates the license role with the passed data. Only the groups of the role may be updated. Requests to change
     * the id or the name of the role will be silently ignored.
     *
     * @method editLicenseRole
     * @memberOf LicenseRoleClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.roleId The id of the license role to retrieve.
     * @param opts.role The new data to place in the role.  See
     *  {@link https://docs.atlassian.com/jira/REST/latest/#d2e365}
     * @param [callback] Called when the license role is edited.
     * @return {Promise} Resolved when the license role is edited.
     */
    this.editLicenseRole = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/licenserole/' + opts.roleId),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: opts.role
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}