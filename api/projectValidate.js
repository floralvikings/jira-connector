"use strict";

module.exports = ProjectValidateClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/projectvalidate'
 *
 * @param {JiraClient} jiraClient
 * @constructor ProjectValidateClient
 */
function ProjectValidateClient(jiraClient) {
    this.jiraClient = jiraClient;
}