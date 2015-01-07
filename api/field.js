"use strict";

module.exports = FieldClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/field'
 *
 * @param {JiraClient} jiraClient
 * @constructor FieldClient
 */
function FieldClient(jiraClient) {
    this.jiraClient = jiraClient
}