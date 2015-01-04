"use strict";

module.exports = ApplicationPropertiesClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/application-properties'
 * @constructor IssueClient
 * @param {JiraClient} jiraClient
 */
function ApplicationPropertiesClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Gets an application property.
     * @param [opts] The options used to make the request.
     * @param [opts.key] A String containing the property key.
     * @param [opts.permissionLevel] When fetching a list specifies the permission level of all items in the list.
     * @param [opts.keyFilter] When fetching a list allows the list to be filtered by the property's start of key e.g.
     *     "jira.lf.*" whould fetch only those permissions that are editable and whose keys start with "jira.lf.". This
     *     is a regex
     * @param callback
     */
    this.getProperties = function (opts, callback) {
        var qs = {};
        if (opts) {
            if (opts.key) {
                qs.key = opts.key;
            }
            if(opts.keyFilter) {
                qs.keyFilter = opts.keyFilter;
            }
            if(opts.permissionLevel) {
                qs.keyFilter = opts.permissionLevel;
            }
        }

        var options = {
            uri: this.jiraClient.buildURL('/application-properties'),
            method: 'GET',
            followAllRedirects: true,
            qs: qs
        };

        this.makeRequest(options, callback);
    };

    /**
     * Helper method to reduce duplicated code.  Uses the JiraClient to make a request, calling back with either
     * the response, or the supplied error string if it exists.
     *
     * @method makeRequest
     * @memberOf ApplicationPropertiesClient#
     * @param {Object} options The requiest options; probably built with {@link IssueClient#buildRequestOptions}
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