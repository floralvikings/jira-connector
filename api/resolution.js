"use strict";

module.exports = ResolutionClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/resolution'
 *
 * @param {JiraClient} jiraClient
 * @constructor ResolutionClient
 */
function ResolutionClient(jiraClient) {
    this.jiraClient = jiraClient;
}