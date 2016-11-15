"use strict";

module.exports = FieldClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/field'
 *
 * @param {JiraClient} jiraClient
 * @constructor FieldClient
 */
function FieldClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all fields, both System and Custom
     *
     * @method getAllFields
     * @memberOf FieldClient#
     * @param opts Ignored
     * @param [callback] Called when the fields have been retrieved.
     * @return {Promise} Resolved when the fields have been retrieved.
     */
    this.getAllFields = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/field'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Creates a custom field using a definition (object encapsulating custom field data)
     *
     * @method createCustomField
     * @memberOf FieldClient#
     * @param opts The request options to send to Jira
     * @param opts.field See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3412}
     * @param [callback] Called when the custom field has been created.
     * @return {Promise} Resolved when the custom field has been created.
     */
    this.createCustomField = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/field'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.field
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}