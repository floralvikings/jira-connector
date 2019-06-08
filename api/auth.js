"use strict";

var fs = require('fs');
var path = require('path');

module.exports = AuthClient;

/**
 * Used to access Jira REST endpoints in '/rest/auth/1/session'
 *
 * @param {JiraClient} jiraClient
 * @constructor UserClient
 */
function AuthClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Logs the current user out of JIRA, destroying the existing session, if any.
     *
     * @method logout
     * @memberOf Auth#
     * @param [callback] Called when the user has been logged out.
     * @return {Promise} Resolved when the user has been logged out.
     */
    this.logout = function (callback) {
        var options = {
            uri: this.jiraClient.buildAuthURL('/session'),
            method: 'DELETE',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback, 'User logged out.');
    };

    /**
     * Creates a new session for a user in JIRA.
     *
     * @method login
     * @memberOf Auth#
     * @param opts The request options sent to the Jira API
     * @param opts.username The name of the user to login.
     * @param opts.password The password of the user.
     * @param [callback] Called when the user has been logged in.
     * @return {Promise} Resolved when the user has been logged in.
     */
    this.login = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildAuthURL('/session'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts
        };

        return this.jiraClient.makeRequest(options, callback, 'User logged in.');
    };

    /**
     * Get current User. Returns information about the currently authenticated user's session.
     *
     * @method currentUser
     * @memberOf Auth#
     * @param [callback] Called when the current user has been retrieved.
     * @return {Promise} Resolved when the user has been retrieved.
     */
    this.currentUser = function (callback) {
        var options = {
            uri: this.jiraClient.buildAuthURL('/session'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}
