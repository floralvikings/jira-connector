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

    /**
     *
     * @method validateLicense
     * @memberOf LicenseValidatorClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.license The license to validate.
     * @param [callback] Called when the license has been validated, or fails to validate.
     * @return {Promise} Resolved when the license has been validated, or fails to validate.
     */
    this.validateLicense = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/licenseValidator'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.license
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}