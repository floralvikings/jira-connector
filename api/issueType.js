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
     * @param [callback] Called when the issue types have been retrieved.
     * @return {Promise} Resolved when the issue types have been retrieved.
     */
    this.getAllIssueTypes = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issuetype'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a full representation of the issue type that has the given id.
     *
     * @method getIssueType
     * @memberOf IssueTypeClient#
     * @param opts The options sent to the Jira API
     * @param opts.issueTypeId A String containing an issue type id
     * @param [callback] Called when the issue type has been retrieved.
     * @return {Promise} Resolved when the issue type has been retrieved.
     */
    this.getIssueType = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issuetype/' + opts.issueTypeId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}