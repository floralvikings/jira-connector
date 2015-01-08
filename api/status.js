"use strict";

module.exports = StatusClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/status'
 *
 * @param {JiraClient} jiraClient
 * @constructor StatusClient
 */
function StatusClient(jiraClient) {
    this.jiraClient = jiraClient;
}