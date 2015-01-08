"use strict";

module.exports = StatusCategoryClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/statuscategory'
 *
 * @param {JiraClient} jiraClient
 * @constructor StatusCategoryClient
 */
function StatusCategoryClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all statusCategories visible to the user
     *
     * @method getAllStatusCategories
     * @memberOf StatusCategoryClient#
     * @param opts Ignored
     * @param callback Called when the statusCategories have been retrieved.
     */
    this.getAllStatusCategories = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/statuscategory'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    };
}