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
     * @param [callback] Called when the statusCategories have been retrieved.
     * @return {Promise} Resolved when the statusCategories have been retrieved.
     */
    this.getAllStatusCategories = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/statuscategory'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a full representation of the statusCategory that has the given id or key.
     *
     * @method getStatusCategory
     * @memberOf StatusCategoryClient#
     * @param opts The options sent to the Jira API
     * @param opts.statusCategoryIdOrKey A String containing a statusCategory id
     * @param [callback] Called when the statusCategory has been retrieved.
     * @return {Promise} Resolved when the statusCategory has been retrieved.
     */
    this.getStatusCategory = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/statuscategory/' + opts.statusCategoryIdOrKey),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}