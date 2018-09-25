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
     * @memberOf GroupClient#
     * @param opts The request options sent to jira
     * @param opts.group The group to create.  See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2011}
     * @param [callback] Called when the group is created
     * @return {Promise} Resolved when the group is created
     */
    this.createGroup = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/group'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.group
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns REST representation for the requested group. Allows to get list of active users belonging to the
     * specified group and its subgroups if "users" expand option is provided. You can page through users list by using
     * indexes in expand param. For example to get users from index 10 to index 15 use "users[10:15]" expand value.
     * This will return 6 users (if there are at least 16 users in this group). Indexes are 0-based and inclusive.
     * DEPRECATED. This resource is deprecated, please use group/member API instead. (15-Feb-2018)
     *
     * @method getGroup
     * @memberOf GroupClient#
     * @param opts The request options sent to the Jira API
     * @param opts.groupName A name of requested group.
     * @param opts.expand Array of fields to expand. Currently only available expand is "users".
     * @param [callback] Called when the group is retrieved.
     * @return {Promise} Resolved when the group is retrieved.
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

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * This resource returns a paginated list of users who are members of the specified group and its subgroups.
     * Users in the page are ordered by user names.
     * User of this resource is required to have sysadmin or admin permissions.
     *
     * @method getMembers
     * @memberOf GroupClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {String} opts.groupName A name of requested group.
     * @param {Boolean} opts.includeInactiveUsers inactive users will be included in the response if set to true. Default false.
     * @param {Number} opts.startAt the index of the first user in group to return (0 based).
     * @param {Number} opts.maxResults the maximum number of users to return (max 50).
     * @param [callback] Called when the group is retrieved.
     * @return {Promise} Resolved when the group is retrieved.
     */
    this.getMembers = function (opts, callback) {
        var qs = {
            groupname: opts.groupName,
            includeInactiveUsers: opts.includeInactiveUsers,
            startAt: opts.startAt,
            maxResults: opts.maxResults,
        };

        var options = {
            uri: this.jiraClient.buildURL('/group/member'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: qs
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Adds given user to a group. Returns the current state of the group.
     *
     * @method addUserToGroup
     * @memberOf GroupClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.groupName A name of requested group.
     * @param {string} opts.userName The name of the user to add to the group.
     * @param [callback] Called when the user has been added to the group.
     * @return {Promise} Resolved when the user has been added to the group.
     */
    this.addUserToGroup = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/group/user'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            qs: {
                groupname: opts.groupName
            },
            body: {
                name: opts.userName
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Removes given user from a group. Returns no content
     *
     * @method removeUserFromGroup
     * @memberOf GroupClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.groupName A name of requested group.
     * @param {string} opts.userName The name of the user to add to the group.
     * @param [callback] Called when the user has been added to the group.
     * @return {Promise} Resolved when the user has been added to the group.
     */
    this.removeUserFromGroup = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/group/user'),
            method: 'DELETE',
            json: true,
            followAllRedirects: true,
            qs: {
                groupname: opts.groupName,
                username: opts.userName
            }
        };

        return this.jiraClient.makeRequest(options, callback, 'User Removed from Group');
    };

    /**
     * Deletes a group by given group parameter. Returns no content
     *
     * @method deleteGroup
     * @memberOf GroupClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.groupName A group to delete.
     * @param {string} [opts.swapGroup] A group to transfer visibility restrictions of the group that is being deleted
     * @param [callback] Called when the group has been deleted.
     * @return {Promise} Resolved when the group has been deleted.
     */
    this.deleteGroup = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/group'),
            method: 'DELETE',
            json: true,
            followAllRedirects: true,
            qs: {
                groupname: opts.groupName,
                swapGroup: opts.swapGroup
            }
        };

        return this.jiraClient.makeRequest(options, callback, 'Group Deleted');
    };
}