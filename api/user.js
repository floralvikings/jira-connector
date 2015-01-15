"use strict";

module.exports = UserClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/user'
 *
 * @param jiraClient
 * @constructor UserClient
 */
function UserClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a user. This resource cannot be accessed anonymously.
     *
     * @method getUser
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API
     * @param opts.username The name of the user to retrieve.
     * @param opts.userKey The key of the user to retrieve.
     * @param callback Called when the user has been retrieved.
     */
    this.getUser = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                key: opts.userKey
            }
        };

        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Removes user.
     *
     * @method deleteUser
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API
     * @param opts.username The name of the user to delete.
     * @param opts.userKey The key of the user to delete.
     * @param callback Called when the user has been deleted.
     */
    this.deleteUser = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user'),
            method: 'DELETE',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                key: opts.userKey
            }
        };

        this.jiraClient.makeRequest(options, callback, 'User removed.');
    };

    /**
     *
     * @param opts The request options sent to the Jira API.
     * @param opts.user See {@link https://docs.atlassian.com/jira/REST/latest/#d2e4049}
     * @param callback Called when the user has been created.
     */
    this.createUser = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.user
        };

        this.jiraClient.makeRequest(options, callback);
    }
}