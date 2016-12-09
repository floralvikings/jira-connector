"use strict";

module.exports = JqlClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/jql/autocompletedata'
 *
 * @param {JiraClient} jiraClient
 * @constructor JqlClient
 */
function JqlClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns the auto complete data required for JQL searches.
     *
     * @method getAutoCompleteData
     * @memberOf JqlClient#
     * @param opts The options sent to the Jira API.  Ignored by this function.
     * @param [callback] Called when the autocomplete data is returned.
     * @return {Promise} Resolved when the autocomplete data is returned.
     */
    this.getAutoCompleteData = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/jql/autocompletedata'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback)
    }
}