"use strict";

module.exports = VersionClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/version'
 * @param {JiraClient} jiraClient
 * @constructor VersionClient
 */
function VersionClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Creates a version
     *
     * @method createVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to Jira.
     * @param {Object} opts.version See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3549}
     * @param callback Called when the version has been created.
     */
    this.createVersion = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/version'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.version
        };

        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify a version's sequence within a project. The move version bean has 2 alternative field value pairs
     * (opts.position or opts.after).  One and only one of these two must be provided.
     *
     * @method moveVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string} opts.versionId The ID of the version to move.
     * @param {string} [opts.position] An absolute position, which may have a value of 'First', 'Last', 'Earlier' or
     *     'Later'. Must be provided if opts.after is missing.
     * @param {string} [opts.after] A version to place this version after. The value should be the self link of another
     *     version. Must be provided if opts.position is missing
     * @param callback Called when the version has been moved.
     */
    this.moveVersion = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/move', 'POST', {position: opts.position, after: opts.after});
        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a project version.
     *
     * @method getVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string|number} opts.versionId The ID of the version to retrieve.
     * @param callback Called when the version is retrieved.
     */
    this.getVersion = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'GET');
        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify an existing version; any omitted fields will be ignored.
     *
     * @method createVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to Jira.
     * @param {string} opts.versionId The ID of the version to edit.
     * @param {Object} opts.version See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3619}
     * @param callback Called when the version has been modified.
     */
    this.editVersion = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'PUT', opts.version);
        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @memberOf FilterClient#
     * @param {Object} opts The arguments passed to the method.
     * @param {number} opts.versionId The ID of the screen to use in the path.
     * @param {Array} [opts.fields] The fields to include
     * @param {Array} [opts.expand] The fields to expand
     * @param {string} path The path of the endpoint following /version/{id}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        var basePath = '/version/' + opts.versionId;
        if (!qs) qs = {};
        if (!body) body = {};

        if (opts.fields) {
            qs.fields = '';
            opts.fields.forEach(function (field) {
                qs.fields += field + ','
            });
            qs.fields = qs.fields.slice(0, -1);
        }

        if (opts.expand) {
            qs.expand = '';
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
            qs.expand = qs.expand.slice(0, -1);
        }

        return {
            uri: this.jiraClient.buildURL(basePath + path),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    };
}