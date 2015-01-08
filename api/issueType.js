"use strict";

module.exports = IssueTypeClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issuetype'
 *
 * @param {JiraClient} jiraClient
 * @constructor IssueTypeClient
 */
function IssueTypeClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all issue types visible to the user
     *
     * @method getAllIssueTypes
     * @memberOf IssueTypeClient#
     * @param opts Ignored
     * @param callback Called when the issue types have been retrieved.
     */
    this.getAllIssueTypes = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issuetype'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    };
}