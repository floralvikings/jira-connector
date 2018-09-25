"use strict";

module.exports = PermissionSchemeClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/permissionscheme'
 *
 * @param {JiraClient} jiraClient
 * @constructor PermissionSchemeClient
 */
function PermissionSchemeClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all permission schemes.
     *
     * By default only shortened beans are returned.
     * If you want to include permissions of all the schemes, then specify the permissions expand parameter.
     * Permissions will be included also if you specify any other expand parameter.
     *
     * @method getAllPermissionSchemes
     * @memberOf PermissionSchemeClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {String|Array} opts.expand
     * @param [callback] Called when the schemes have been returned.
     * @return {Promise} Resolved when the schemes have been returned.
     */
    this.getAllPermissionSchemes = function (opts, callback) {
        var expand = opts.expand
        if (opts.expand && opts.expand instanceof Array) {
            expand = opts.expand.join(',');
        }
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                expand: expand
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Create a new permission scheme. This method can create schemes with a defined permission set, or without.
     *
     * @method createPermissionScheme
     * @memberOf PermissionSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.scheme See {@link https://developer.atlassian.com/cloud/jira/platform/rest/#api-api-2-permissionscheme-post}
     * @param [callback] Called when the scheme has been created.
     * @return {Promise} Resolved when the scheme has been created.
     */
    this.createPermissionScheme = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.scheme
        };

        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Get a PermissionScheme. This resource cannot be accessed anonymously.
     *
     * @method getPermissionScheme
     * @memberOf PermissionSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.schemeId The id of the scheme to retrieve.
     * @param {Object} opts.expand The fields to be expanded.
     * @param [callback] Called when the scheme has been retrieved.
     * @return {Promise} Resolved when the scheme has been retrieved.
     */
    this.getPermissionScheme = function (opts, callback) {
        var expand = opts.expand
        if (opts.expand && opts.expand instanceof Array) {
            expand = opts.expand.join(',');
        }
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme/' + opts.schemeId),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                expand: expand
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Updates a permission scheme.
     * 
     * If the permissions list is present then it will be set in the permission scheme,
     * which basically means it will overwrite any permission grants that existed in the permission scheme.
     * Sending an empty list will remove all permission grants from the permission scheme.
     * 
     * To update just the name and description, do not send permissions list at all.
     * To add or remove a single permission grant instead of updating the whole list
     * at once use the {schemeId}/permission/ resource.
     *
     * @method editPermissionScheme
     * @memberOf PermissionSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.schemeId The id of the scheme to retrieve.
     * @param opts.scheme The body of the scheme to edit.
     * @param [callback] Called when the user has been edited.
     * @return {Promise} Resolved when the user has been edited.
     */
    this.editPermissionScheme = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme/' + opts.schemeId),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: opts.scheme
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Removes Permission Scheme.
     *
     * @method deletePermissionScheme
     * @memberOf PermissionSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.schemeId The name of the scheme to delete.
     * @param [callback] Called when the scheme has been deleted.
     * @return {Promise} Resolved when the scheme has been deleted.
     */
    this.deletePermissionScheme = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme/' + opts.schemeId),
            method: 'DELETE',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback, 'Permission Scheme removed.');
    };

    /**
     * Returns all permission grants of the given permission scheme.
     *
     * @method getPermissionSchemeGrants
     * @memberOf PermissionSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.schemeId The id of the scheme to which the permission grant belongs.
     * @param {Object} opts.expand The fields to be expanded.
     * @param [callback] Called when the scheme grants have been retrieved.
     * @return {Promise} Resolved when the scheme grants have been retrieved.
     */
    this.getPermissionSchemeGrants = function (opts, callback) {
        var expand = opts.expand
        if (opts.expand && opts.expand instanceof Array) {
            expand = opts.expand.join(',');
        }
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme/' + opts.schemeId + '/permission'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                expand: expand
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Creates a permission grant in a permission scheme.
     *
     * @method createPermissionGrantInScheme
     * @memberOf PermissionSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.schemeId The id of the scheme to which the permission grant belongs.
     * @param opts.grant See {@link https://docs.atlassian.com/software/jira/docs/api/REST/7.6.1/#api/2/permissionscheme-createPermissionGrant}
     * @param [callback] Called when the permission grant has been created.
     * @return {Promise} Resolved when the permission grant has been created.
     */
    this.createPermissionGrantInScheme = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme/' + opts.schemeId + '/permission'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.grant
        };

        return this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Deletes a permission grant from a permission scheme.
     *
     * @method deletePermissionGrantFromScheme
     * @memberOf PermissionSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.schemeId The name of the scheme to delete.
     * @param opts.permissionId The id of the permission to delete.
     * @param [callback] Called when the scheme has been deleted.
     * @return {Promise} Resolved when the scheme has been deleted.
     */
    this.deletePermissionGrantFromScheme = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme/' + opts.schemeId + '/permission/' + opts.permissionId),
            method: 'DELETE',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback, 'Permission removed from scheme.');
    };

    /**
     * Returns a permission grant identified by the given id.
     *
     * @method getPermissionSchemeGrantById
     * @memberOf PermissionSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.schemeId The id of the scheme to which the permission grant belongs.
     * @param opts.permissionId The id of the permission to fetch.
     * @param {Object} opts.expand The fields to be expanded.
     * @param [callback] Called when the scheme grants have been retrieved.
     * @return {Promise} Resolved when the scheme grants have been retrieved.
     */
    this.getPermissionSchemeGrantById = function (opts, callback) {
        var expand = opts.expand
        if (opts.expand && opts.expand instanceof Array) {
            expand = opts.expand.join(',');
        }
        var options = {
            uri: this.jiraClient.buildURL('/permissionscheme/' + opts.schemeId + '/permission/' + opts.permissionId),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                expand: expand
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}