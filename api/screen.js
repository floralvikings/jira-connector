"use strict";

module.exports = ScreenClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/screen'
 *
 * @param {JiraClient} jiraClient
 * @constructor ScreenClient
 */
function ScreenClient(jiraClient) {
    this.jiraClient = jiraClient;
}