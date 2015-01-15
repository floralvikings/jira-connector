"use strict";

module.exports = WorkflowSchemeClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/workflowscheme'
 * @param {JiraClient} jiraClient
 * @constructor WorkflowSchemeClient
 */
function WorkflowSchemeClient(jiraClient) {
    this.jiraClient = jiraClient;
}