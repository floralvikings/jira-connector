"use strict";

module.exports = ComponentClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/component'
 *
 * @param {JiraClient} jiraClient
 * @constructor ComponentClient
 */
function ComponentClient(jiraClient) {
    this.jiraClient = jiraClient;
}