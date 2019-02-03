"use strict";

module.exports = WorklogClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/worklog'
 *
 * @param {JiraClient} jiraClient
 * @constructor WorkLogClient
 */
function WorklogClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns worklogs id and delete time of worklogs that were deleted since given time. The returns set of worklogs is 
     * limited to 1000 elements. This API will not return worklogs deleted during last minute.
     *
     * @method getWorklogDeleted
     * @memberOf WorklogClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.since A date time in unix timestamp format since when deleted worklogs will be returned.
     *      Default: 0
     * @param [callback] Called when the search results are retrieved.
     * @return {Promise} Resolved when the search results are retrieved.
     */ 
    this.getWorklogDeleted = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/worklog/deleted'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                since: opts.since
            }
        };
        return this.jiraClient.makeRequest(options, callback)
    };

    /**
     * Returns Returns worklogs for given worklog ids. Only worklogs to which the calling user has permissions, 
     * will be included in the result. The returns set of worklogs is limited to 1000 elements.
     *
     * @method worklogList
     * @memberOf WorklogClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {array} [opts.ids] a JSON array named ids which contains a list of issue IDs
     * @param [callback] Called when the search results are retrieved.
     * @return {Promise} Resolved when the search results are retrieved.
     */ 
    this.worklogList = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/worklog/list'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: {
                ids: opts.ids
            }
        };
        return this.jiraClient.makeRequest(options, callback)
    };

    /**
     * Returns worklogs id and update time of worklogs that were updated since given time. The returns set of worklogs is 
     * limited to 1000 elements. This API will not return worklogs deleted during last minute.
     *
     * @method getWorklogUpdated
     * @memberOf WorklogClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.since A date time in unix timestamp format since when updated worklogs will be returned.
     *      Default: 0
     * @param [callback] Called when the search results are retrieved.
     * @return {Promise} Resolved when the search results are retrieved.
     */ 
    this.getWorklogUpdated = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/worklog/updated'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                since: opts.since
            }
        };
        return this.jiraClient.makeRequest(options, callback)
    }
}
