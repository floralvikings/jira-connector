"use strict";

module.exports = ProjectClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/project'
 * @param {JiraClient} jiraClient
 * @constructor ProjectClient
 */
function ProjectClient(jiraClient) {
    this.jiraClient = jiraClient;
}