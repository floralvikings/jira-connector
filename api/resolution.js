"use strict";

module.exports = ResolutionClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/resolution'
 *
 * @param {JiraClient} jiraClient
 * @constructor ResolutionClient
 */
function ResolutionClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all resolutions visible to the user
     *
     * @method getAllResolutions
     * @memberOf ResolutionClient#
     * @param opts Ignored
     * @param callback Called when the resolutions have been retrieved.
     */
    this.getAllResolutions = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/resolution'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    };
}