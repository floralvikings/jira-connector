"use strict";

var fs = require('fs');
var path = require('path');

module.exports = UserClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/user'
 *
 * @param {JiraClient} jiraClient
 * @constructor UserClient
 */
function UserClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a user. This resource cannot be accessed anonymously.
     *
     * @method getUser
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API
     * @param opts.username The name of the user to retrieve.
     * @param opts.userKey The key of the user to retrieve.
     * @param {Object} opts.expand The fields to be expanded.
     * @param [callback] Called when the user has been retrieved.
     * @return {Promise} Resolved when the user has been retrieved.
     */
    this.getUser = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                key: opts.userKey,
                expand: opts.expand
            }
        };

        if (opts.expand) {
            options.qs.expand = '';
            opts.expand.forEach(function (ex) {
                options.qs.expand += ex + ','
            });
        }

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Removes user.
     *
     * @method deleteUser
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API
     * @param opts.username The name of the user to delete.
     * @param opts.userKey The key of the user to delete.
     * @param [callback] Called when the user has been deleted.
     * @return {Promise} Resolved when the user has been deleted.
     */
    this.deleteUser = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user'),
            method: 'DELETE',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                key: opts.userKey
            }
        };

        return this.jiraClient.makeRequest(options, callback, 'User removed.');
    };

    /**
     * Create user. By default created user will not be notified with email. If password field is not set then password
     * will be randomly generated.
     *
     * @method createUser
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.user See {@link https://docs.atlassian.com/jira/REST/latest/#d2e4049}
     * @param [callback] Called when the user has been created.
     * @return {Promise} Resolved when the user has been created.
     */
    this.createUser = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.user
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify user. The "value" fields present will override the existing value. Fields skipped in request will not be
     * changed.
     *
     * @method editUser
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API
     * @param opts.user See {@link https://docs.atlassian.com/jira/REST/latest/#d2e4081}
     * @param opts.username The name of the user to edit.
     * @param opts.userKey The key of the user to edit.
     * @param [callback] Called when the user has been edited.
     * @return {Promise} Resolved when the user has been edited.
     */
    this.editUser = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                key: opts.userKey
            },
            body: opts.user
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns a list of users that match the search string and can be assigned issues for all the given projects. This
     * resource cannot be accessed anonymously.
     *
     * @method multiProjectSearchAssignable
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The name of the user to search.
     * @param {Array} opts.projectKeys The keys of the projects we are finding assignable users for
     * @param {number} [opts.startAt] The index of the first user to return (0-based)
     * @param {number} [opts.maxResults] The maximum number of users to return (defaults to 50). The maximum allowed
     *     value is 1000. If you specify a value that is higher than this number, your search results will be
     *     truncated.
     * @param [callback] Called when the search results have been retrieved.
     * @return {Promise} Resolved when the search results have been retrieved.
     */
    this.multiProjectSearchAssignable = function (opts, callback) {
        var projectKeyString = '';
        if (opts.projectKeys) {
            opts.projectKeys.forEach(function (key) {
                projectKeyString += key + ',';
            });
            projectKeyString = projectKeyString.slice(0, -1);
        }
        var options = {
            uri: this.jiraClient.buildURL('/user/assignable/multiProjectSearch'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                projectKeys: projectKeyString,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns a list of users that match the search string. This resource cannot be accessed anonymously. Please note
     * that this resource should be called with an issue key when a list of assignable users is retrieved for editing.
     * For create only a project key should be supplied. The list of assignable users may be incorrect if it's called
     * with the project key for editing.
     *
     * @method searchAssignable
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The username
     * @param {string} opts.project The key of the project we are finding assignable users for
     * @param {string} [opts.issueKey] The issue key for the issue being edited we need to find assignable users for.
     * @param {number} [opts.startAt] The index of the first user to return (0-based)
     * @param {number} [opts.maxResults] The maximum number of users to return (defaults to 50). The maximum allowed
     *     value is 1000. If you specify a value that is higher than this number, your search results will be
     *     truncated.
     * @param {number} [opts.actionDescriptorId]
     * @param [callback] Called when the search results have been retrieved.
     * @return {Promise} Resolved when the search results have been retrieved.
     */
    this.searchAssignable = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/assignable/search'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                project: opts.project,
                issueKey: opts.issueKey,
                startAt: opts.startAt,
                maxResults: opts.maxResults,
                actionDescriptorId: opts.actionDescriptorId
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Creates temporary avatar. Creating a temporary avatar is part of a 3-step process in uploading a new avatar for
     * a user: upload, crop, confirm.
     *
     * @method createTemporaryAvatar
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The username
     * @param {string} opts.filepath The path to the file to upload.
     * @param [callback] Called when the temporary avatar has been uploaded.
     * @return {Promise} Resolved when the temporary avatar has been uploaded.
     */
    this.createTemporaryAvatar = function (opts, callback) {
        var extension = path.extname(opts.filepath).slice(1);
        var baseName = path.basename(opts.filepath);
        var fileSize = fs.statSync(opts.filepath).size;

        extension = extension == 'jpg' ? 'jpeg' : extension;

        var options = {
            uri: this.jiraClient.buildURL('/user/avatar/temporary'),
            method: 'POST',
            followAllRedirects: true,
            qs: {
                username: opts.username,
                filename: baseName,
                size: fileSize
            },
            body: fs.readFileSync(opts.filepath),
            headers: {
                "X-Atlassian-Token": 'no-check',
                "Content-Type": 'image/' + extension
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Converts temporary avatar into a real avatar
     *
     * @method convertTemporaryAvatar
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The username
     * @param {Object} opts.avatarId The id of the temporary avatar to convert.
     * @param [callback] Called when the avatar has been converted
     * @return {Promise} Resolved when the avatar has been converted
     */
    this.convertTemporaryAvatar = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/avatar/'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username
            },
            body: {id: opts.avatarId},
            headers: {
                "X-Atlassian-Token": 'no-check'
            }
        };
        return this.jiraClient.makeRequest(options, callback, 'Avatar Converted');
    };

    /**
     * Deletes avatar
     *
     * @method deleteAvatar
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The username
     * @param {Object} opts.avatarId The id of the temporary avatar to delete.
     * @param [callback] Called when the avatar has been deleted.
     * @return {Promise} Resolved when the avatar has been deleted.
     */
    this.deleteAvatar = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/avatar/' + opts.avatarId),
            method: 'DELETE',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username
            }
        };
        return this.jiraClient.makeRequest(options, callback, 'Avatar Deleted');
    };

    /**
     * Returns all avatars which are visible for the currently logged in user.
     *
     * @method getAvatars
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The username
     * @param [callback] Called when the avatars have been retrieved.
     * @return {Promise} Resolved when the avatars have been retrieved.
     */
    this.getAvatars = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/avatars'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns the default columns for the given user. Admin permission will be required to get columns for a user
     * other than the currently logged in user.
     *
     * @method getDefaultColumns
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The username
     * @param [callback] Called when the columns have been retrieved.
     * @return {Promise} Resolved when the columns have been retrieved.
     */
    this.getDefaultColumns = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/columns'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Sets the default columns for the given user. Admin permission will be required to get columns for a user other
     * than the currently logged in user.
     *
     * @method setDefaultColumns
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The username
     * @param {Array} opts.columns The names of the new columns.  See {@link
        *     https://docs.atlassian.com/jira/REST/latest/#d2e4566}
     * @param [callback] Called when the columns have been set.
     * @return {Promise} Resolved when the columns have been set.
     */
    this.setDefaultColumns = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/columns'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username
            },
            body: {
                columns: opts.columns
            }
        };
        return this.jiraClient.makeRequest(options, callback, 'Default Columns Set');
    };

    /**
     * Reset the default columns for the given user to the system default. Admin permission will be required to get
     * columns for a user other than the currently logged in user.
     *
     * @method resetDefaultColumns
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {string} opts.username The username
     * @param [callback] Called when the columns have been reset.
     * @return {Promise} Resolved when the columns have been reset.
     */
    this.resetDefaultColumns = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/columns'),
            method: 'DELETE',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username
            }
        };
        return this.jiraClient.makeRequest(options, callback, 'Default Columns Reset');
    };

    /**
     * Modify user password.
     *
     * @method changePassword
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API
     * @param opts.username The name of the user for which to change the password.
     * @param opts.userKey The key of the user for which to change the password.
     * @param opts.password The new password.
     * @param [callback] Called when the password has been set.
     * @return {Promise} Resolved when the password has been set.
     */
    this.changePassword = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/password'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                key: opts.userKey
            },
            body: {
                password: opts.password
            }
        };
        return this.jiraClient.makeRequest(options, callback, 'Password Changed');
    };

    /**
     * Returns a list of active users that match the search string and have all specified permissions for the project
     * or issue.
     *
     * This resource can be accessed by users with ADMINISTER_PROJECT permission for the project or global
     * ADMIN or SYSADMIN rights.
     *
     * @method searchPermissions
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the jira API
     * @param {string} opts.username The username filter, list includes all users if unspecified
     * @param {Array} opts.permissions Array of permissions for project or issue returned users must have, see
     *     [Permissions]{@link
        *     https://developer.atlassian.com/static/javadoc/jira/6.0/reference/com/atlassian/jira/security/Permissions.Permission.html}
        *     JavaDoc for the list of all possible permissions.
     * @param {string} [opts.issueKey] the issue key for the issue for which returned users have specified permissions.
     * @param {string} [opts.projectKey] the optional project key to search for users with if no issueKey is supplied.
     * @param {number} [opts.startAt] the index of the first user to return (0-based)
     * @param {number} [opts.maxResults] the maximum number of users to return (defaults to 50). The maximum allowed
     *     value is 1000. If you specify a value that is higher than this number, your search results will be
     *     truncated.
     * @param [callback] Called when the search results are retrieved.
     * @return {Promise} Resolved when the search results are retrieved.
     */
    this.searchPermissions = function (opts, callback) {
        var permissions = '';
        if (opts.permissions) {
            opts.permissions.forEach(function (s) {
                permissions += s + ','
            });
            permissions = permissions.slice(0, -1);
        }
        var options = {
            uri: this.jiraClient.buildURL('/user/permission/search'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                permissions: permissions,
                issueKey: opts.issueKey,
                projectKey: opts.projectKey,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns a list of users matching query with highlighting. This resource cannot be accessed anonymously.
     *
     * @method searchPicker
     * @memberOf UserClient#
     * @param opts The request options sent to the Jira API.
     * @param {string} opts.query
     * @param {number} [opts.maxResults=50]
     * @param {boolean} [opts.showAvatar=false]
     * @param {string} [opts.exclude]
     * @param [callback] Called when the search results are retrieved.
     * @return {Promise} Resolved when the search results are retrieved.
     */
    this.searchPicker = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/picker'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                query: opts.query,
                maxResults: opts.maxResults,
                showAvatar: opts.showAvatar,
                exclude: opts.exclude
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns a list of users that match the search string. This resource cannot be accessed anonymously.
     *
     * @method search
     * @memberOf UserClient#
     * @param {Object} [opts] The request options sent to the Jira API.
     * @param {string} [opts.query]
     * @param {string} [opts.username] A query string used to search username, name or e-mail address
     * @param {string} [opts.accountId]
     * @param {number} [opts.startAt=0] the index of the first user to return (0-based)
     * @param {number} [opts.maxResults=50] the maximum number of users to return (defaults to 50). The maximum allowed
     *     value is 1000. If you specify a value that is higher than this number, your search results will be
     *     truncated.
     * @param {boolean} [opts.includeActive=true] If true, then active users are included in the results (default true)
     * @param {boolean} [opts.includeInactive=false] If true, then inactive users are included in the results (default
     *     false)
     * @param {string} [opts.property]
     * @param {callback} [callback] Called when the search results are retrieved.
     * @return {Promise} Resolved when the search results are retrieved.
     */
    this.search = function (opts, callback) {
        opts = opts || {};

        var options = {
            uri: this.jiraClient.buildURL('/user/search'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                query: opts.query,
                username: opts.username,
                accountId: opts.accountId,
                startAt: opts.startAt,
                maxResults: opts.maxResults,
                includeActive: opts.includeActive,
                includeInactive: opts.includeInactive,
                property: opts.property
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };

     /**
     * Returns a list of users that match the search string. This resource cannot be accessed anonymously.
     *
     * @method all
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {number} [opts.startAt=0] the index of the first user to return (0-based)
     * @param {number} [opts.maxResults=50] the maximum number of users to return (defaults to 50).
     * @param {callback} [callback] Called when the search results are retrieved.
     * @return {Promise} Resolved when the search results are retrieved.
     */
    this.all = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/users/search'),
            method: 'GET',
            followAllRedirects: true,
            json: true,
            qs: {
                maxResults: opts.maxResults,
                startAt: opts.startAt
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns a list of active users that match the search string. This resource cannot be accessed anonymously. Given
     * an issue key this resource will provide a list of users that match the search string and have the browse issue
     * permission for the issue provided.
     *
     * @method viewIssueSearch
     * @memberOf UserClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string} opts.username A query string used to search username, name or e-mail address
     * @param {string} [opts.issueKey] the issue key for the issue being edited we need to find viewable users for.
     * @param {string} [opts.projectKey] the optional project key to search for users with if no issueKey is supplied.
     * @param {number} [opts.startAt=0] the index of the first user to return (0-based)
     * @param {number} [opts.maxResults=50] the maximum number of users to return (defaults to 50). The maximum allowed
     * @param [callback] Called when data has been retrieved
     * @return {Promise} Resolved when data has been retrieved
     */
    this.viewIssueSearch = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/user/viewissue/search'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                username: opts.username,
                issueKey: opts.issueKey,
                projectKey: opts.projectKey,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        };
        return this.jiraClient.makeRequest(options, callback);
    };
}
