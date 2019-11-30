"use strict";

module.exports = ApplicationPropertiesClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/application-properties'
 * @constructor ApplicationPropertiesClient
 * @param {JiraClient} jiraClient
 */
function ApplicationPropertiesClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Gets an application property.
     * @method getProperties
     * @memberOf ApplicationPropertiesClient#
     * @param {Object} [opts] The options used to make the request.
     * @param {string} [opts.key] A String containing the property key.
     * @param {string} [opts.permissionLevel] When fetching a list specifies the permission level of all items in the list.
     * @param {string} [opts.keyFilter] When fetching a list allows the list to be filtered by the property's start of key e.g.
     *     "jira.lf.*" whould fetch only those permissions that are editable and whose keys start with "jira.lf.". This
     *     is a regex
     * @param {callback} [callback] Called when the properties are retrieved.
     * @return {Promise} Resolved when the properties are retrieved.
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

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify an application property via PUT. The "value" field present in the PUT will override thee existing value.
     *
     * @method getProperties
     * @memberOf ApplicationPropertiesClient#
     * @param {Object} opts The options for modifying the application property.
     * @param opts.id The id of the property to be modified
     * @param opts.property The new data for the property.  See
     *     {@link https://docs.atlassian.com/jira/REST/latest/#d2e4891}
     * @param [callback] Called when the property has been modified
     * @return {Promise} Resolved when the property has been modified
     */
    this.setProperty = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/application-properties'),
            method: 'GET',
            followAllRedirects: true,
            body: opts.property
        };

        return this.jiraClient.makeRequest(options, callback, 'Property Updated');
    };
}