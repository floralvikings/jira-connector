"use strict";

module.exports = VersionClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/version'
 * @param {JiraClient} jiraClient
 * @constructor VersionClient
 */
function VersionClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Creates a version
     *
     * @method createVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to Jira.
     * @param {Object} opts.version See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3549}
     * @param callback Called when the version has been created.
     */
    this.createVersion = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/version'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.version
        };

        this.jiraClient.makeRequest(options, callback);
    };
}