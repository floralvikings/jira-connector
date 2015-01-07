"use strict";

module.exports = DashboardClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/dashboard'
 * @param {JiraClient} jiraClient
 * @constructor DashboardClient
 */
function DashboardClient(jiraClient) {
    this.jiraClient = jiraClient;
}