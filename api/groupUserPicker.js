"use strict";

module.exports = GroupUserPickerClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/groupuserpicker'
 * @param {JiraClient} jiraClient
 * @constructor GroupUserPickerClient
 */
function GroupUserPickerClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of users and groups matching query with highlighting. This resource cannot be accessed
     * anonymously.
     *
     * @method findUsersAndGroups
     * @memberOf GroupUserPickerClient#
     * @param {Object} opts The request options to send to the Jira API.
     * @param {string} opts.query A string used to search username, Name or e-mail address
     * @param {number} [opts.maxResults] the maximum number of users to return (defaults to 50). The maximum allowed
     *     value is 1000. If you specify a value that is higher than this number, your search results will be
     *     truncated.
     * @param {boolean} [opts.showAvatar] Whether to show the avatar
     * @param {string} [opts.fieldId] The custom field id, if this request comes from a custom field, such as a user
     *     picker. Optional.
     * @param {string} [opts.projectId] The list of project ids to further restrict the search This parameter can occur
     *     multiple times to pass in multiple project ids. Comma separated value is not supported. This parameter is
     *     only used when fieldId is present.
     * @param {string} [opts.issueTypeId] The list of issue type ids to further restrict the search. This parameter can
     *     occur multiple times to pass in multiple issue type ids. Comma separated value is not supported. Special
     *     values such as -1 (all standard issue types), -2 (all subtask issue types) are supported. This parameter is
     *     only used when fieldId is present.
     * @param [callback] Called when the search is completed.
     * @return {Promise} Resolved when the search is completed.
     */
    this.findUsersAndGroups = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/groupuserpicker'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                query: opts.query,
                maxResults: opts.maxResults,
                showAvatar: opts.showAvatar,
                fieldId: opts.fieldId,
                projectId: opts.projectId,
                issueTypeId: opts.issueTypeId
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}