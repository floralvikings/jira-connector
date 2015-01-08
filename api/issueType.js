"use strict";

module.exports = IssueTypeClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issuetype'
 *
 * @param {JiraClient} jiraClient
 * @constructor IssueTypeClient
 */
function IssueTypeClient(jiraClient) {
    this.jiraClient = jiraClient;
}