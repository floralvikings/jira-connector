"use strict";

module.exports = PasswordClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/password'
 *
 * @param {JiraClient} jiraClient
 * @constructor PasswordClient
 */
function PasswordClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns user-friendly statements governing the system's password policy.
     *
     * @method getPasswordPolicy
     * @memberOf PasswordClient#
     * @param opts The request options to send to the Jira API
     * @param {boolean} [opts.hasOldPassword=false] Whether or not the user will be required to enter their current
     *     password. Use false (the default) if this is a new user or if an administrator is forcibly changing another
     *     user's password.
     * @param [callback] Called when the password policy has been retrieved.
     * @return {Promise} Resolved when the password policy has been retrieved.
     */
    this.getPasswordPolicy = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/password/policy'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                hasOldPassword: opts.hasOldPassword
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}