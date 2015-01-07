"use strict";

module.exports = LicenseValidatorClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/licenseValidator'
 *
 * @param {JiraClient} jiraClient
 * @constructor LicenseValidatorClient
 */
function LicenseValidatorClient(jiraClient) {
    this.jiraClient = jiraClient;

}