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
     * Create user. By default created user will not be notified with email. If password field is not set then password
     * will be randomly generated.
     *
     * @method createUser
     * @memberOf UserClient#
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
    };

    /**
     * Modify user. The "value" fields present will override the existing value. Fields skipped in request will not be
     * changed.
     *
     * @method editUser
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API
     * @param opts.user See {@link https://docs.atlassian.com/jira/REST/latest/#d2e4081}
     * @param opts.username The name of the user to edit.
     * @param opts.userKey The key of the user to edit.
     * @param callback Called when the user has been edited.
     */
    this.editUser = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                key: opts.userKey
            },
            body: opts.user
        };

        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns a list of users that match the search string and can be assigned issues for all the given projects. This
     * resource cannot be accessed anonymously.
     *
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The name of the user to search.
     * @param {Array} opts.projectKeys The keys of the projects we are finding assignable users for
     * @param {number} [opts.startAt] The index of the first user to return (0-based)
     * @param {number} [opts.maxResults] The maximum number of users to return (defaults to 50). The maximum allowed
     *     value is 1000. If you specify a value that is higher than this number, your search results will be
     *     truncated.
     * @param callback Called when the search results have been retrieved.
     */
    this.multiProjectSearch = function (opts, callback) {
        var projectKeyString = '';
        if (opts.projectKeys) {
            opts.projectKeys.forEach(function (key) {
                projectKeyString += key + ',';
            });
            projectKeyString = projectKeyString.slice(0, -1);
        }
        var options = {
            uri: this.jiraClient.buildURL('/user/assignable/multiProjectSearch'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                projectKeys: projectKeyString,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        };
        this.jiraClient.makeRequest(options, callback);
    };
}