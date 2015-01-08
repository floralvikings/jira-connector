"use strict";

module.exports = PriorityClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/priority'
 *
 * @param {JiraClient} jiraClient
 * @constructor PriorityClient
 */
function PriorityClient(jiraClient) {
    this.jiraClient = jiraClient;
}