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
     * @param [callback] Called when the resolutions have been retrieved.
     * @return {Promise} Resolved when the resolutions have been retrieved.
     */
    this.getAllResolutions = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/resolution'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a full representation of the resolution that has the given id.
     *
     * @method getResolution
     * @memberOf ResolutionClient#
     * @param opts The options sent to the Jira API
     * @param opts.resolutionId A String containing a resolution id
     * @param [callback] Called when the resolution has been retrieved.
     * @return {Promise} Resolved when the resolution has been retrieved.
     */
    this.getResolution = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/resolution/' + opts.resolutionId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}