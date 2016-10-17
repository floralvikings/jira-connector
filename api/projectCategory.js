"use strict";

module.exports = ProjectCategoryClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/projectCategory'
 *
 * @param {JiraClient} jiraClient
 * @constructor ProjectCategoryClient
 */
function ProjectCategoryClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all projectCategories visible to the user
     *
     * @method getAllProjectCategories
     * @memberOf ProjectCategoryClient#
     * @param opts Ignored
     * @param [callback] Called when the statusCategories have been retrieved.
     * @return {Promise} Resolved when the statusCategories have been retrieved.
     */
    this.getAllProjectCategories = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/projectCategory'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a full representation of the projectCategory that has the given id.
     *
     * @method getProjectCategory
     * @memberOf ProjectCategoryClient#
     * @param opts The options sent to the Jira API
     * @param opts.projectCategoryId A String containing a projectCategory id
     * @param [callback] Called when the projectCategory has been retrieved.
     * @return {Promise} Resolved when the projectCategory has been retrieved.
     */
    this.getProjectCategory = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/projectCategory/' + opts.projectCategoryId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}
