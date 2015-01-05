"use strict";

var errorStrings = require('./../lib/error');

module.exports = AvatarClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issue'
 * @param {JiraClient} jiraClient
 * @constructor AvatarClient
 */
function AvatarClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all system avatars of the given type.
     *
     * @method getAvatars
     * @memberOf AvatarClient#
     * @param opts The options to be used in the API request.
     * @param opts.avatarType The avatar type.  May be 'project' or 'user'.
     * @param callback Called when the avatars are retrieved.
     */
    this.getAvatars = function (opts, callback) {
        if (!opts.avatarType) {
            throw new Error(errorStrings.NO_AVATAR_TYPE_ERROR);
        }
        var options = {
            method: 'GET',
            json: true,
            followAllRedirects: true,
            uri: this.jiraClient.buildURL('/avatar/' + opts.avatarType + '/system')
        };

        this.makeRequest(options, callback);
    };

    /**
     * Helper method to reduce duplicated code.  Uses the JiraClient to make a request, calling back with either
     * the response, or the supplied error string if it exists.
     *
     * @method makeRequest
     * @memberOf IssueClient#
     * @param {Object} options The requiest options
     * @param {Function} callback Called with the Jira APIs response.
     * @param {string} [successString] If supplied, this is reported instead of the response body.
     */
    this.makeRequest = function (options, callback, successString) {
        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, successString ? successString : body);
        });
    };
}