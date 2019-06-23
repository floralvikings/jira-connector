"use strict";

module.exports = AgileEpicClient;

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/epic'
 * @param {JiraClient} jiraClient
 * @constructor AgileEpicClient
 */
function AgileEpicClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all issues that do not belong to any epic. This only includes issues that
     * the user has permission to view. Issues returned from this resource include Agile fields,
     * like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.  
     * 
     * @method getIssuesWithoutEpic
     * @memberOf AgileEpicClient
     * @param { Object } [opts] The request options to send to the Jira API
     * @param { number } [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
     *     maxResults
     * @param { number } [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
     *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
     *     provides, dues to lack or resources or any other condition. When this happens, your results will be
     *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
     *     being used.
     * @param { string } [opts.jql]
     * @param { boolean } [opts.validateQuery]
     * @param { Array<string> } [opts.fields]
     * @param { string } [opts.expand]
     * @param { Function } [callback] Called when the dashboards have been retrieved.
     * @return { Promise } Resolved when the dashboards have been retrieved.
     */
    this.getIssuesWithoutEpic = function (opts, callback) {
        var endpoint = this.jiraClient.buildAgileURL('/epic/none/issue');
        opts = opts || {};

        var options = {
            uri: endpoint,
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                startAt: opts.startAt,
                maxResults: opts.maxResults,
                jql: opts.jql,
                validateQuery: opts.validateQuery,
                fields: opts.fields ? opts.fields.join(',') : undefined,
                expand: opts.expand
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Removes issues from epics.
     * The user needs to have the edit issue permission for all issue they want to remove from epics.
     * The maximum number of issues that can be moved in one operation is 50.
     * 
     * @method removeIssuesFromEpic
     * @memberOf AgileEpicClient
     * @param opts The request options to send to the Jira API
     * @param { string[] } [opts.issues]
     * @param { Function } [callback] Called when the dashboards have been retrieved.
     * @return { Promise } Resolved when the dashboards have been retrieved.
     */
    this.removeIssuesFromEpic = function (opts, callback) {
        var endpoint = this.jiraClient.buildAgileURL('/epic/none/issue');
        opts = opts || {};

        var options = {
            uri: endpoint,
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: {
                issues: opts.issues
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Returns the epic for a given epic ID. This epic will only be returned if the user has permission to view it.
     * 
     * @method getEpic
     * @memberOf AgileEpicClient
     * @param opts The request options to send to the Jira API
     * @param { number | string } opts.epicId
     * @param { Function } [callback] Called when the dashboards have been retrieved.
     * @return { Promise } Resolved when the dashboards have been retrieved.
     */
    this.getEpic = function (opts, callback) {
        var endpoint = this.jiraClient.buildAgileURL('/epic/' + opts.epicId);

        var options = {
            uri: endpoint,
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Performs a partial update of the epic. A partial update means that fields not present
     * in the request JSON will not be updated. Valid values for color are color_1 to color_9.
     * 
     * @method partiallyUpdateEpic
     * @memberOf AgileEpicClient
     * @param opts The request options to send to the Jira API
     * @param { number | string } opts.epicId
     * @param { string } [opts.name]
     * @param { string } [opts.summary]
     * @param { any } [opts.color]
     * @param { boolean } [opts.done]
     * @param { Function } [callback] Called when the dashboards have been retrieved.
     * @return { Promise } Resolved when the dashboards have been retrieved.
     */
    this.partiallyUpdateEpic = function (opts, callback) {
        var endpoint = this.jiraClient.buildAgileURL('/epic/' + opts.epicId);

        var options = {
            uri: endpoint,
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: {
                name: opts.name,
                summary: opts.summary,
                color: opts.color,
                done: opts.done
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Get a list of all issues associated with an agile epic   
     * 
     * @method getIssuesForEpic
     * @memberOf AgileEpicClient
     * @param opts The request options to send to the Jira API
     * @param { string | number } opts.epicId epic id or epic key
     * @param { number } [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
     *     maxResults
     * @param { number } [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
     *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
     *     provides, dues to lack or resources or any other condition. When this happens, your results will be
     *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
     *     being used.
     * @param { string } [opts.jql]
     * @param { boolean } [opts.validateQuery]
     * @param { Array<string> } [opts.fields]
     * @param { string } [opts.expand]
     * @param { Function } [callback] Called when the dashboards have been retrieved.
     * @return { Promise } Resolved when the dashboards have been retrieved.
     */
    this.getIssuesForEpic = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildAgileURL('/epic/' + opts.epicId + '/issue'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                startAt: opts.startAt,
                maxResults: opts.maxResults,
                jql: opts.jql,
                validateQuery: opts.validateQuery,
                fields: opts.fields ? opts.fields.join(',') : undefined,
                expand: opts.expand
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Moves issues to an epic, for a given epic id. Issues can be only in a single epic at the same time.
     * That means that already assigned issues to an epic, will not be assigned to the previous epic anymore.
     * The user needs to have the edit issue permission for all issue they want to move and to the epic.
     * The maximum number of issues that can be moved in one operation is 50.
     * 
     * @method moveIssuesToEpic
     * @memberOf AgileEpicClient
     * @param opts The request options to send to the Jira API
     * @param { number | string } opts.epicId
     * @param { string[] } [opts.issues]
     * @param { Function } [callback] Called when the dashboards have been retrieved.
     * @return { Promise } Resolved when the dashboards have been retrieved.
     */
    this.moveIssuesToEpic = function (opts, callback) {
        var endpoint = this.jiraClient.buildAgileURL('/epic/' + opts.epicId + '/issue');

        var options = {
            uri: endpoint,
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: {
                issues: opts.issues
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Moves (ranks) an epic before or after a given epic.
     * 
     * If rankCustomFieldId is not defined, the default rank field will be used.
     * 
     * @method rankEpics
     * @memberOf AgileEpicClient
     * @param opts The request options to send to the Jira API
     * @param { number | string } opts.epicId
     * @param { string } [opts.rankBeforeEpic]
     * @param { string } [opts.rankAfterEpic]
     * @param { number } [opts.rankCustomFieldId]
     * @param { Function } [callback] Called when the dashboards have been retrieved.
     * @return { Promise } Resolved when the dashboards have been retrieved.
     */
    this.rankEpics = function (opts, callback) {
        var endpoint = this.jiraClient.buildAgileURL('/epic/' + opts.epicId + '/rank');

        var options = {
            uri: endpoint,
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: {
                rankBeforeEpic: opts.rankBeforeEpic,
                rankAfterEpic: opts.rankAfterEpic,
                rankCustomFieldId: opts.rankCustomFieldId
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}
