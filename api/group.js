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

    /**
     * Returns REST representation for the requested group. Allows to get list of active users belonging to the
     * specified group and its subgroups if "users" expand option is provided. You can page through users list by using
     * indexes in expand param. For example to get users from index 10 to index 15 use "users[10:15]" expand value.
     * This will return 6 users (if there are at least 16 users in this group). Indexes are 0-based and inclusive.
     *
     * @method getGroup
     * @memberOf {GroupClient#}
     * @param opts The request options sent to the Jira API
     * @param opts.groupName A name of requested group.
     * @param opts.expand Array of fields to expand. Currently only available expand is "users".
     * @param callback Called when the group is retrieved.
     */
    this.getGroup = function (opts, callback) {
        var qs = {
            groupname: opts.groupName
        };

        if (opts.expand) {
            qs.expand = '';
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        var options = {
            uri: this.jiraClient.buildURL('/group'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: qs
        };

        this.jiraClient.makeRequest(options, callback);
    }
}