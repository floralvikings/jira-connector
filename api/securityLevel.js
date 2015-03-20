"use strict";

module.exports = SecurityLevelClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/securitylevel'
 *
 * @param {JiraClient} jiraClient
 * @constructor SecurityLevelClient
 */
function SecurityLevelClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a full representation of the security level that has the given id.
     *
     * @method getSecurityLevel
     * @memberOf SecurityLevelClient#
     * @param opts The request options to send to the Jira API.
     * @param opts.securityLevelId The id of the security level to retrieve
     * @param callback Called when the security level has been retrieved.
     */
    this.getSecurityLevel = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/securitylevel/' + opts.securityLevelId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    }
}