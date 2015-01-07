"use strict";

module.exports = AutoCompleteDataClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/autocompletedata'
 *
 * @param {JiraClient} jiraClient
 * @constructor AutoCompleteDataClient
 */
function AutoCompleteDataClient(jiraClient) {
    this.jiraClient = jiraClient;
}