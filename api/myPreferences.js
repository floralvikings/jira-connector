"use strict";

module.exports = MyPreferencesClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/mypreferences'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyPreferencesClient
 */
function MyPreferencesClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Gets preference of the currently logged in user. Preference key must be provided as input parameter (key).
     * The value is returned exactly as it is.
     *
     * @method getPreferences
     * @memberOf {MyPreferencesClient#}
     * @param opts The request options send to the Jira API.
     * @param opts.key Key of the preference to be returned.
     * @param callback Called when the preference has been retrieved.
     */
    this.getPreference = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/mypreferences'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                key: opts.key
            }
        };

        this.jiraClient.makeRequest(options, callback);
    };
}