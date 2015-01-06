"use strict";

module.exports = GroupUserPickerClient;

/**
 *
 * @param {JiraClient} jiraClient
 * @constructor GroupUserPickerClient
 */
function GroupUserPickerClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of users and groups matching query with highlighting. This resource cannot be accessed
     * anonymously.
     *
     * @method findUsersAndGroups
     * @memberOf GroupUserPickerClient
     * @param opts
     * @param callback
     */
    this.findUsersAndGroups = function (opts, callback) {

    };
}