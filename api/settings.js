"use strict";

module.exports = SettingsClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/settings'
 * @param {JiraClient} jiraClient
 * @constructor SettingsClient
 */
function SettingsClient(jiraClient) {
    this.jiraClient = jiraClient;
}