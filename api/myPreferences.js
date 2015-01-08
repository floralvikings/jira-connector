"use strict";

module.exports = MyPreferencesClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/mypreferences'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyPreferencesClient
 */
function MyPreferencesClient(jiraClient) {
    this.jiraClient = jiraClient;
}