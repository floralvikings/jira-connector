"use strict";

module.exports = PriorityClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/priority'
 *
 * @param {JiraClient} jiraClient
 * @constructor PriorityClient
 */
function PriorityClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all issue types visible to the user
     *
     * @method getAllPriorities
     * @memberOf PriorityClient#
     * @param opts Ignored
     * @param callback Called when the priorities have been retrieved.
     */
    this.getAllPriorities = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/priority'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    };
}