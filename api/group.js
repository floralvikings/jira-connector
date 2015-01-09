"use strict";

module.exports = GroupClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/group'
 *
 * @param {JiraClient} jiraClient
 * @constructor GroupClient
 */
function GroupClient(jiraClient) {
    this.jiraClient = jiraClient;
}