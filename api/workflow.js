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
}