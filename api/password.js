"use strict";

module.exports = PasswordClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/password'
 *
 * @param {JiraClient} jiraClient
 * @constructor PasswordClient
 */
function PasswordClient(jiraClient) {
    this.jiraClient = jiraClient;
}