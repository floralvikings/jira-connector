"use strict";

module.exports = SecurityLevelClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/securitylevel'
 *
 * @param {JiraClient} jiraClient
 * @constructor SecurityLevelClient
 */
function SecurityLevelClient(jiraClient) {
    this.jiraClient = jiraClient;
}