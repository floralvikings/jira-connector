"use strict";


/**
 * Used to access Jira REST endpoints in '/rest/api/2/issueLinkType'
 * @param {JiraClient} jiraClient
 * @constructor IssueLinkTypeClient
 */
function IssueLinkTypeClient(jiraClient) {


    /**
     * Helper method to reduce duplicated code.  Uses the JiraClient to make a request, calling back with either
     * the response, or the supplied error string if it exists.
     *
     * @method makeRequest
     * @memberOf IssueLinkClient#
     * @param {Object} options The request options
     * @param {Function} callback Called with the Jira APIs response.
     * @param {string} [successString] If supplied, this is reported instead of the response body.
     */
    this.makeRequest = function (options, callback, successString) {
        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, successString ? successString : body);
        });
    };
}