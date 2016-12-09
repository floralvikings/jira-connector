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
     * @method getPreference
     * @memberOf MyPreferencesClient#
     * @param opts The request options send to the Jira API.
     * @param opts.key Key of the preference to be returned.
     * @param [callback] Called when the preference has been retrieved.
     * @return {Promise} Resolved when the preference has been retrieved.
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

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Sets preference of the currently logged in user. Preference key must be provided as input parameters (key).
     *
     * @method editPreference
     * @memberOf MyPreferencesClient#
     * @param opts The request options send to the Jira API.
     * @param opts.key Key of the preference to be edited.
     * @param opts.value The new value to set for the preference.
     * @param [callback] Called when the preference has been edited.
     * @return {Promise} Resolved when the preference has been edited.
     */
    this.editPreference = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/mypreferences'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            qs: {
                key: opts.key
            },
            body: opts.value
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Removes preference of the currently logged in user. Preference key must be provided as input parameters (key).
     *
     * @method deletePreference
     * @memberOf MyPreferencesClient#
     * @param opts The request options send to the Jira API.
     * @param opts.key Key of the preference to be deleted.
     * @param [callback] Called when the preference has been deleted.
     * @return {Promise} Resolved when the preference has been deleted.
     */
    this.deletePreference = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/mypreferences'),
            method: 'DELETE',
            json: true,
            followAllRedirects: true,
            qs: {
                key: opts.key
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}