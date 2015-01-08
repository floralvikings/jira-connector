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
     * @memberOf {LicenseRoleClient#}
     * @param opts Ignored
     * @param callback Called when the license roles have been retrieved.
     */
    this.getAllLicenseRoles = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/licenserole'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Gets the passed license role if it exists.
     *
     * @param opts The request options sent to the Jira API.
     * @param opts.roleId The id of the license role to retrieve.
     * @param callback Called when the license role is retrieved.
     */
    this.getLicenseRole = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/licenserole/' + opts.roleId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    };
}