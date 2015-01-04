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
     * @method getProperties
     * @memberOf ApplicationPropertiesClient#
     * @param [opts] The options used to make the request.
     * @param [opts.key] A String containing the property key.
     * @param [opts.permissionLevel] When fetching a list specifies the permission level of all items in the list.
     * @param [opts.keyFilter] When fetching a list allows the list to be filtered by the property's start of key e.g.
     *     "jira.lf.*" whould fetch only those permissions that are editable and whose keys start with "jira.lf.". This
     *     is a regex
     * @param callback Called when the properties are retrieved.
     */
    this.getProperties = function (opts, callback) {
        var qs = {};
        if (opts) {
            if (opts.key) {
                qs.key = opts.key;
            }
            if (opts.keyFilter) {
                qs.keyFilter = opts.keyFilter;
            }
            if (opts.permissionLevel) {
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
     * Modify an application property via PUT. The "value" field present in the PUT will override thee existing value.
     *
     * @method getProperties
     * @memberOf ApplicationPropertiesClient#
     * @param opts The options for modifying the application property.
     * @param opts.id The ID of the property to be modified
     * @param opts.property The new data for the property.  See
     *     {@link https://docs.atlassian.com/jira/REST/latest/#d2e4891}
     * @param callback Called when the property has been modified
     */
    this.setProperty = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/application-properties'),
            method: 'GET',
            followAllRedirects: true,
            body: opts.property
        };

        this.makeRequest(options, callback, 'Property Updated');
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