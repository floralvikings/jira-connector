"use strict";

module.exports = SearchClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/search'
 *
 * @param {JiraClient} jiraClient
 * @constructor SearchClient
 */
function SearchClient(jiraClient) {
    this.jiraClient = jiraClient;
}