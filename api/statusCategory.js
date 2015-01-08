"use strict";

module.exports = StatusCategoryClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/statuscategory'
 *
 * @param {JiraClient} jiraClient
 * @constructor StatusCategoryClient
 */
function StatusCategoryClient(jiraClient) {
    this.jiraClient = jiraClient;
}