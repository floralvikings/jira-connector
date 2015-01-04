"use strict";

module.exports = ApplicationPropertiesClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/application-properties'
 * @constructor IssueClient
 * @param {JiraClient} jiraClient
 */
function ApplicationPropertiesClient(jiraClient) {
    this.jiraClient = jiraClient;
}