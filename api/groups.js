"use strict";

var errorStrings = require('./../lib/error');

module.exports = GroupsClient

/**
 * Used to access Jira REST endpoints in '/rest/api/2/groups'
 *
 * @param {JiraClient} jiraClient
 * @constructor GroupsClient
 */
function GroupsClient(jiraClient) {
    this.jiraClient = jiraClient;


}