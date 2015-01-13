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

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @memberOf {FilterClient#}
     * @param {Object} opts The arguments passed to the method.
     * @param {string} opts.filterId The ID of the filter to use in the path.
     * @param {Array} [opts.fields] The fields to include
     * @param {Array} [opts.expand] The fields to expand
     * @param {string} path The path of the endpoint following /issue/{idOrKey}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        var basePath = '/filter/' + opts.filterId;
        if (!qs) qs = {};
        if (!body) body = {};

        if (opts.fields) {
            qs.fields = '';
            opts.fields.forEach(function (field) {
                qs.fields += field + ','
            });
        }
        qs.fields = qs.fields.slice(0, -1);

        if (opts.expand) {
            qs.expand = '';
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }
        qs.expand = qs.expand.slice(0, -1);

        return {
            uri: this.jiraClient.buildURL(basePath + path),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    }
}