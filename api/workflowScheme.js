"use strict";

module.exports = WorkflowSchemeClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/workflowscheme'
 * @param {JiraClient} jiraClient
 * @constructor WorkflowSchemeClient
 */
function WorkflowSchemeClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Create a new workflow scheme. The body contains a representation of the new scheme. Values not passed are
     * assumed to be set to their defaults.
     *
     * @method createWorkflowScheme
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowScheme See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2196}
     * @param callback Called when the workflow scheme has been created.
     */
    this.createWorkflowScheme = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/workflowscheme'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.workflowScheme
        };
        this.jiraClient.makeRequest(options, callback);
    };
}