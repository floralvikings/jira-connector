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
}