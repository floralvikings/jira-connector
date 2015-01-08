"use strict";

module.exports = LicenseRoleClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/licenserole'
 * @param {JiraClient} jiraClient
 * @constructor LicenseRoleClient
 */
function LicenseRoleClient(jiraClient) {
    this.jiraClient = jiraClient;
}