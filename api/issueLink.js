"use strict";

var errorStrings = require('./../lib/error');

module.exports = IssueLinkClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issueLink'
 * @param {JiraClient} jiraClient
 * @constructor IssueLinkClient
 */
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
     * @param [callback] Called when the link has been created.
     * @return {Promise} Resolved when the link has been created.
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

        return this.jiraClient.makeRequest(options, callback, 'Issue Link Created');
    };

    /**
     * Gets an issue link with the specified id.
     *
     * @method getIssueLink
     * @memberOf IssueLinkClient#
     * @param opts The options used in the request to the Jira API
     * @param opts.linkId The id of the link to retrieve.
     * @param [callback] Called when the Issue Link has been retrieved.
     * @return {Promise} Resolved when the Issue Link has been retrieved.
     */
    this.getIssueLink = function (opts, callback) {
        if (!opts.linkId) {
            throw new Error(errorStrings.NO_ISSUE_LINK_ID_ERROR);
        }

        var options = {
            method: 'GET',
            uri: this.jiraClient.buildURL('/issueLink/' + opts.linkId),
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Deletes an issue link with the specified id. To be able to delete an issue link you must be able to view both
     * issues and must have the link issue permission for at least one of the issues.
     *
     * @method deleteIssueLink
     * @memberOf IssueLinkClient#
     * @param opts The options used in the request to the Jira API
     * @param opts.linkId The id of the link to delete.
     * @param [callback] Called when the Issue Link has been deleted.
     * @return {Promise} Resolved when the Issue Link has been deleted.
     */
    this.deleteIssueLink = function (opts, callback) {
        if (!opts.linkId) {
            throw new Error(errorStrings.NO_ISSUE_LINK_ID_ERROR);
        }

        var options = {
            method: 'DELETE',
            uri: this.jiraClient.buildURL('/issueLink/' + opts.linkId),
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback, 'Issue Link Deleted');
    };
}