"use strict";

module.exports = MyselfClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/myself'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyselfClient
 */
function MyselfClient(jiraClient) {
    this.jiraClient = jiraClient;
}