"use strict";

module.exports = DashboardClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/dashboard'
 * @param {JiraClient} jiraClient
 * @constructor DashboardClient
 */
function DashboardClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a list of all dashboards, optionally filtering them.
     *
     * @method getAllDashboards
     * @memberOf DashboardClient#
     * @param opts The request options to send to the Jira API
     * @param [opts.filter] An optional filter that is applied to the list of dashboards. Valid values include
     *     "favourite" for returning only favourite dashboards, and "my" for returning dashboards that are owned by the
     *     calling user.
     * @param [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
     *     maxResults
     * @param [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
     *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
     *     provides, dues to lack or resources or any other condition. When this happens, your results will be
     *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
     *     being used.
     * @param [callback] Called when the dashboards have been retrieved.
     * @return {Promise} Resolved when the dashboards have been retrieved.
     */
    this.getAllDashboards = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/dashboard'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                filter: opts.filter,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a single dashboard.
     *
     * @method getDashboard
     * @memberOf DashboardClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.dashboardId The dashboard id.
     * @param [callback] Called when the dashboard has been retrieved
     * @return {Promise} Resolved when the dashboard has been retrieved
     */
    this.getDashboard = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/dashboard/' + opts.dashboardId),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                filter: opts.filter,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}