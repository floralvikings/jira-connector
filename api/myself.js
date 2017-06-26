"use strict";

module.exports = MyselfClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/myself'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyselfClient
 */
function MyselfClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns currently logged user. This resource cannot be accessed anonymously.
     *
     * @method getMyself
     * @memberOf MyselfClient#
     * @param opts Ignored
     * @param [callback] Called when the current user is retrieved.
     * @return {Promise} Resolved when the current user is retrieved.
     */
    this.getMyself = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/myself'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify currently logged user. The "value" fields present will override the existing value. Fields skipped in
     * request will not be changed. Only email and display name can be change that way.
     *
     * @method editMyself
     * @memberOf MyselfClient#
     * @param opts The request options send to the Jira API.
     * @param opts.newData The new data.  See {@link https://docs.atlassian.com/jira/REST/latest/#d2e1242}
     * @param [callback] Called when the user's data has been modified
     * @return {Promise} Resolved when the user's data has been modified
     */
    this.editMyself = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/myself'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: opts.newData
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify caller password.
     *
     * @method changePassword
     * @memberOf MyselfClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.newData The new data
     * @param [callback] Called when the password has been changed.
     * @return {Promise} Resolved when the password has been changed.
     */
    this.changePassword = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/myself/password'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: opts.newData
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}