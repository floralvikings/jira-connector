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
     * @param {Object} opts Details about a project version.
     * @param {string} [opts.version] Body. See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3549}
     * @param {string} [opts.expand] 
     * @param {string} [opts.description] The description of the version. Optional when creating or updating a version.
     * @param {string} [opts.name] The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters.
     * @param {boolean} [opts.archived] Indicates that the version is archived. Optional when creating or updating a version.
     * @param {boolean} [opts.released] Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version.
     * @param {string} [opts.startDate] The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.
     * @param {string} [opts.releaseDate] The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.
     * @deprecated @param {string} [opts.project] Deprecated. Use projectId. 
     * @param {number} [opts.projectId] The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version.
     * @param {string} [opts.moveUnfixedIssuesTo] The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version.
     * @param {callback} [callback] Called when the version has been created.
     * @return {Promise} Resolved when the version has been created.
     */
    this.createVersion = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/version'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.version || {
                expand: opts.expand,
                description: opts.description,
                name: opts.name,
                archived: opts.archived,
                released: opts.released,
                startDate: opts.startDate,
                releaseDate: opts.releaseDate,
                project: opts.project,
                projectId: opts.projectId,
                moveUnfixedIssuesTo: opts.moveUnfixedIssuesTo,
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify a version's sequence within a project. The move version bean has 2 alternative field value pairs
     * (opts.position or opts.after).  One and only one of these two must be provided.
     *
     * @method moveVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string} opts.versionId The id of the version to move.
     * @param {string} [opts.position] An absolute position, which may have a value of 'First', 'Last', 'Earlier' or
     *     'Later'. Must be provided if opts.after is missing.
     * @param {string} [opts.after] A version to place this version after. The value should be the self link of another
     *     version. Must be provided if opts.position is missing
     * @param [callback] Called when the version has been moved.
     * @return {Promise} Resolved when the version has been moved.
     */
    this.moveVersion = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/move', 'POST', { position: opts.position, after: opts.after });
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
    * Get a all versions from specific board.
    *
    * @method getAllVersions
    * @memberOf VersionClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param {string|number} opts.boardId The id of the board which contains versions to retrieve.
    * @param {callback} [callback] Called when all versions are retrieved.
    * @return {Promise} Resolved when all versions are retrieved.
    */
    this.getAllVersions = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildAgileURL(`/board/${opts.boardId}/version`),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                filter: opts.filter,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        }
        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Get a project version.
     *
     * @method getVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string|number} opts.versionId The id of the version to retrieve.
     * @param {callback} [callback] Called when the version is retrieved.
     * @return {Promise} Resolved when the version is retrieved.
     */
    this.getVersion = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify an existing version; any omitted fields will be ignored.
     *
     * @method editVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to Jira.
     * @param {string} opts.versionId The id of the version to edit.
     * @param {Object} opts.version See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3619}
     * @param {callback} [callback] Called when the version has been modified.
     * @return {Promise} Resolved when the version has been modified.
     */
    this.editVersion = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'PUT', opts.version);
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a bean containing the number of fixed in and affected issues for the given version.
     *
     * @method getRelatedIssueCounts
     * @memberOf VersionClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.versionId The version for which to retrieve related issues.
     * @param {callback} [callback] Called when the count has been retrieved.
     * @return {Promise} Resolved when the count has been retrieved.
     */
    this.getRelatedIssueCounts = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/relatedIssueCounts', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get the number of unresolved issues for the given version
     *
     * @method getUnresolvedIssueCount
     * @memberOf VersionClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.versionId The version for which to retrieve unresolved issues.
     * @param {callback} [callback] Called when the count has been retrieved.
     * @return {Promise} Resolved when the count has been retrieved.
     */
    this.getUnresolvedIssueCount = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/unresolvedIssueCount', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get the remote version links associated with the given version id.
     *
     * @method getRemoteLinks
     * @memberOf VersionClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.versionId The version for which to retrieve remote links.
     * @param {callback} [callback] Called when the links have been retrieved.
     * @return {Promise} Resolved when the links have been retrieved.
     */
    this.getRemoteLinks = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/remotelink', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Create a remote version link via POST. The link's global id will be taken from the JSON payload if provided;
     * otherwise, it will be generated.
     *
     * @method createRemoteLink
     * @memberOf VersionClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.versionId The version for which to retrieve unresolved issues.
     * @param opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3753}
     * @param {callback} [callback] Called when the remote link has been created.
     * @return {Promise} Resolved when the remote link has been created.
     */
    this.createRemoteLink = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/remotelink', 'POST', opts.remoteLink);
        return this.jiraClient.makeRequest(options, callback, 'Remotelink Created');
    };

    /**
     * Get a REST sub-resource representing a remote version link.
     *
     * @method getRemoteLinks
     * @memberOf VersionClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.versionId The version for which to retrieve the remote link
     * @param opts.remoteLinkId The global id of the remote link
     * @param {callback} [callback] Called when the link has been retrieved.
     * @return {Promise} Resolved when the link has been retrieved.
     */
    this.getRemoteLink = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/remotelink/' + opts.remoteLinkId, 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Delete a remote version link.
     *
     * @method deleteRemoteLink
     * @memberOf VersionClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.versionId The version id
     * @param opts.remoteLinkId The global id of the remote link
     * @param {callback} [callback] Called when the link has been deleted.
     * @return {Promise} Resolved when the link has been deleted.
     */
    this.deleteRemoteLink = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/remotelink/' + opts.remoteLinkId, 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Remote Link Deleted');
    };

    /**
     * Delete a project version.
     *
     * @method deleteVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string|number} opts.versionId The id of the version to delete.
     * @param {callback} [callback] Called when the version is deleted.
     * @return {Promise} Resolved when the version is deleted.
     */
    this.deleteVersion = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Version Deleted');
    };

    /**
     * Delete all remote version links for a given version id.
     *
     * @method deleteAllRemoteLinks
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string|number} opts.versionId The id of the version to delete.
     * @param {callback} [callback] Called when the version is deleted.
     * @return {Promise} Resolved when the version is deleted.
     */
    this.deleteAllRemoteLinks = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/remotelink', 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Remote Links Deleted');
    };

    /**
     * Returns the remote version links for a given global id.
     *
     * @method getGlobalRemoteLink
     * @memberOf VersionClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.globalId The global id of the remote resource that is linked to the versions
     * @param {callback} [callback] Called when the remote link is returned.
     * @return {Promise} Resolved when the remote link is returned.
     */
    this.getGlobalRemoteLink = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/version/remotelink'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: { globalId: opts.globalId }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @memberOf FilterClient#
     * @param {Object} opts The arguments passed to the method.
     * @param {number} opts.versionId The id of the screen to use in the path.
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
