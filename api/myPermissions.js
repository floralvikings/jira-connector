"use strict";

module.exports = MyPermissionsClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/mypermissions'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyPermissionsClient
 */
function MyPermissionsClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all permissions in the system and whether the currently logged in user has them. You can optionally
     * provide a specific context to get permissions for (projectKey OR projectId OR issueKey OR issueId)
     *
     * * When no context supplied the project related permissions will return true if the user has that permission in
     * ANY project
     * * If a project context is provided, project related permissions will return true if the user has the permissions
     * in the specified project. For permissions that are determined using issue data (e.g Current Assignee), true will
     * be returned if the user meets the permission criteria in ANY issue in that project
     * * If an issue context is provided, it will return whether or not the user has each permission in that specific
     * issue
     *
     * NB: The above means that for issue-level permissions (EDIT_ISSUE for example), hasPermission may be true when no
     * context is provided, or when a project context is provided, but may be false for any given (or all) issues. This
     * would occur (for example) if Reporters were given the EDIT_ISSUE permission. This is because any user could be a
     * reporter, except in the context of a concrete issue, where the reporter is known.
     *
     * Global permissions will still be returned for all scopes.
     *
     * @method getMyPermissions
     * @memberOf MyPermissionsClient#
     * @param opts The request options sent to the Jira API
     * @param [callback] Called when the permissions have been returned.
     * @return {Promise} Resolved when the permissions have been returned.
     */
    this.getMyPermissions = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/mypermissions'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                issueId: opts.issueId,
                issueKey: opts.issueKey,
                projectId: opts.projectId,
                projectKey: opts.projectKey,
            },
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}
