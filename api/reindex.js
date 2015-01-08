"use strict";

module.exports = ReindexClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/reindex'
 *
 * @param {JiraClient} jiraClient
 * @constructor ReindexClient
 */
function ReindexClient(jiraClient) {
    this.jiraClient = jiraClient;
}