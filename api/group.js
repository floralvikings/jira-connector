"use strict";

module.exports = GroupClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/group'
 *
 * These are considered experimental according to the Jira Docs, use at your own risk.
 *
 * @param {JiraClient} jiraClient
 * @constructor GroupClient
 */
function GroupClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Creates a group by given group parameter Returns REST representation for the requested group.
     *
     * @method createGroup
     * @memberOf {GroupClient#}
     * @param opts The request options sent to jira
     * @param opts.group The group to create.  See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2011}
     * @param callback Called when the group is created
     */
    this.createGroup = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/group'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.group
        };

        this.jiraClient.makeRequest(options, callback);
    };
}