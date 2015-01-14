"use strict";

module.exports = UserClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/user'
 *
 * @param jiraClient
 * @constructor UserClient
 */
function UserClient(jiraClient) {
    this.jiraClient = jiraClient;
}