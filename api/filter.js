"use strict";

module.exports = FilterClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/filter'
 *
 * @param {JiraClient} jiraClient
 * @constructor FilterClient
 */
function FilterClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Creates a new filter, and returns newly created filter. Currently sets permissions just using the users default
     * sharing permissions
     *
     * @method createFilter
     * @memberOf {FilterClient#}
     * @param {Object} opts The request options sent to the Jira API
     * @param {Array} [opts.expand] The parameters to expand.
     * @param {Object} opts.filter The filter to create.  See
     *      {@link https://docs.atlassian.com/jira/REST/latest/#d2e3347}
     * @param callback Called when the filter has been created.
     */
    this.createFilter = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/filter'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            qs: {},
            body: opts.filter
        };

        if (opts.expand) {
            options.qs.expand = '';
            opts.expand.forEach(function (ex) {
                options.qs.expand += ex + ','
            });
        }

        this.jiraClient.makeRequest(options, callback);
    };
}