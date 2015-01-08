"use strict";

module.exports = StatusClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/status'
 *
 * @param {JiraClient} jiraClient
 * @constructor StatusClient
 */
function StatusClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all statuss visible to the user
     *
     * @method getAllStatuses
     * @memberOf StatusClient#
     * @param opts Ignored
     * @param callback Called when the statuss have been retrieved.
     */
    this.getAllStatuses = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/status'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    };
}