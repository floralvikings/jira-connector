"use strict";

module.exports = WorkflowClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/workflow'
 *
 * @param {JiraClient} jiraClient
 * @constructor WorkflowClient
 */
function WorkflowClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all workflows.
     *
     * @method getWorkflows
     * @memberOf WorkflowClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} [opts.workflowName] The name of the workflow to retrieve.
     * @param [callback] Called when the workflow(s) have been retrieved.
     * @return {Promise} Resolved when the workflow(s) have been retrieved.
     */
    this.getWorkflows = function (opts, callback) {
        var qs = {};
        if (opts && typeof opts === 'object' && opts.hasOwnProperty('workflowName')) {
            qs.workflowName = opts.workflowName;
        }
        var options = {
            uri: this.jiraClient.buildURL('/workflow'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: qs
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}
