"use strict";

module.exports = CustomFieldOptionClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/customFieldOptions'
 *
 * @param {JiraClient} jiraClient
 * @constructor CustomFieldOptionsClient
 */
function CustomFieldOptionClient(jiraClient) {
    this.jiraClient = jiraClient;
}