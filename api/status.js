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
     * Returns a list of all statuses visible to the user
     *
     * @method getAllStatuses
     * @memberOf StatusClient#
     * @param opts Ignored
     * @param [callback] Called when statuses have been retrieved.
     * @return {Promise} Resolved when statuses have been retrieved.
     */
    this.getAllStatuses = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/status'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a full representation of the status that has the given id.
     *
     * @method getStatus
     * @memberOf StatusClient#
     * @param opts The options sent to the Jira API
     * @param opts.statusId A String containing a status id
     * @param [callback] Called when the status has been retrieved.
     * @return {Promise} Resolved when the status has been retrieved.
     */
    this.getStatus = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/status/' + opts.statusId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}