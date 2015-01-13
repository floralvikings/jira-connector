"use strict";

module.exports = ScreenClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/screen'
 *
 * @param {JiraClient} jiraClient
 * @constructor ScreenClient
 */
function ScreenClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Gets available fields for screen. i.e ones that haven't already been added.
     *
     * @method getAvailableFields
     * @memberOf {ScreenClient#}
     * @param {Object} opts The request options sent to Jira
     * @param {number} opts.screenId The ID of the screen to retrieve.
     * @param callback Called when the available fields have been retrieved
     */
    this.getAvailableFields = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/screens/' + opts.screenId + '/availableFields'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };
        this.jiraClient.makeRequest(options, callback);
    }
}