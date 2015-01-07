"use strict";

module.exports = MyPermissionsClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/mypermissions'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyPermissionsClient
 */
function MyPermissionsClient(jiraClient) {
    this.jiraClient = jiraClient;
}