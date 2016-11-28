"use strict";

var errorStrings = require('./../lib/error');

module.exports = AuditingClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/auditing'
 * @param {JiraClient} jiraClient
 * @constructor AuditingClient
 */
function AuditingClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns auditing records filtered using provided parameters
     *
     * @method getAudits
     * @memberOf AuditingClient#
     * @param opts The filtering options for retrieving audits.
     * @param [opts.offset] The number of record from which search starts
     * @param [opts.limit] Maximum number of returned results (if is limit is <= 0 or > 1000, it will be set do default
     *     value: 1000)
     * @param [opts.filter] Text query; each record that will be returned must contain the provided text in one of its
     *     fields
     * @param [opts.from] Timestamp in past; 'from' must be less or equal 'to', otherwise the result set will be empty
     *     only records that where created in the same moment or after the 'from' timestamp will be provided in
     *     response
     * @param [opts.to] Timestamp in past; 'from' must be less or equal 'to', otherwise the result set will be empty
     *     only records that where created in the same moment or earlier than the 'to' timestamp will be provided in
     *     response
     * @param [callback] Called when the audits are retrieved.
     * @return {Promise} Resolved when the audits are retrieved.
     */
    this.getAudits = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/auditing/record'),
            json: true,
            followAllRedirects: true,
            method: 'GET',
            qs: {
                offset: opts.offset,
                limit: opts.limit,
                filter: opts.filter,
                from: opts.from,
                to: opts.to
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     *
     * @method createAudit
     * @memberOf AuditingClient#
     * @param opts The request options.
     * @param opts.audit See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2557}
     * @param [callback] Called when the audit is created.
     * @return {Promise} Resolved when the audit is created.
     */
    this.createAudit = function (opts, callback) {
        if (!opts.audit) {
            throw new Error(errorStrings.NO_AUDIT_ERROR);
        }

        var options = {
            uri: this.jiraClient.buildURL('/auditing/record'),
            json: true,
            followAllRedirects: true,
            method: 'POST',
            body: opts.audit
        };

        return this.jiraClient.makeRequest(options, callback, 'Audit Record Added');
    };
}