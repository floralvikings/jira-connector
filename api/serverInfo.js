"use strict";

module.exports = ServerInfoClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/serverInfo'
 * @param {JiraClient} jiraClient
 * @constructor ServerInfoClient
 */
function ServerInfoClient(jiraClient) {
    this.jiraClient = jiraClient;
}