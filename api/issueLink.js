"use strict";

var errorStrings = require('./../lib/error');

module.exports = IssueLinkClient;

function IssueLinkClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Creates an issue link between two issues. The user requires the link issue permission for the issue which will
     * be linked to another issue. The specified link type in the request is used to create the link and will create a
     * link from the first issue to the second issue using the outward description. It also create a link from the
     * second issue to the first issue using the inward description of the issue link type. It will add the supplied
     * comment to the first issue. The comment can have a restriction who can view it. If group is specified, only
     * users of this group can view this comment, if roleLevel is specified only users who have the specified role can
     * view this comment. The user who creates the issue link needs to belong to the specified group or have the
     * specified role.
     *
     * @memberOf IssueLinkClient#
     * @method createIssueLink
     * @param opts The options for the request sent to the Jira API
     * @param opts.issueLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e5010}
     * @param callback Called when the link has been created.
     */
    this.createIssueLink = function (opts, callback) {
        if (!opts.issueLink) {
            throw new Error(errorStrings.NO_ISSUE_LINK_ERROR);
        }

        var options = {
            method: 'POST',
            uri: this.jiraClient.buildURL('/issueLink'),
            json: true,
            followAllRedirects: true,
            body: opts.issueLink
        };

        this.makeRequest(options, callback, 'Issue Link Created');
    };

    /**
     * Helper method to reduce duplicated code.  Uses the JiraClient to make a request, calling back with either
     * the response, or the supplied error string if it exists.
     *
     * @method makeRequest
     * @memberOf IssueLinkClient#
     * @param {Object} options The request options
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