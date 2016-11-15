"use strict";

module.exports = GroupsClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/groups'
 *
 * @param {JiraClient} jiraClient
 * @constructor GroupsClient
 */
function GroupsClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns groups with substrings matching a given query. This is mainly for use with the group picker, so the
     * returned groups contain html to be used as picker suggestions. The groups are also wrapped in a single response
     * object that also contains a header for use in the picker, specifically Showing X of Y matching groups. The
     * number of groups returned is limited by the system property "jira.ajax.autocomplete.limit" The groups will be
     * unique and sorted.
     *
     * @method findGroups
     * @memberOf GroupsClient#
     * @param {Object} opts The request options to use in the Jira API.
     * @param {string} opts.query A string against which to match groups.  Leave this blank to return all groups.
     * @param {string} opts.exclude A string specifying groups to exclude.
     * @param {number} opts.maxResults The maximum number of results to return.
     * @param [callback] Called when the groups have been retrieved.
     * @return {Promise} Resolved when the groups have been retrieved.
     */
    this.findGroups = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/groups/picker'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                query: opts.query,
                exclude: opts.exclude,
                maxResults: opts.maxResults
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}