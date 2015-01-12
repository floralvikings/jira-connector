"use strict";

module.exports = FilterClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/filter'
 *
 * @param {JiraClient} jiraClient
 * @constructor FilterClient
 */
function FilterClient(jiraClient) {
    this.jiraClient = jiraClient;
}