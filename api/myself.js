"use strict";

module.exports = MyselfClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/myself'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyselfClient
 */
function MyselfClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns currently logged user. This resource cannot be accessed anonymously.
     *
     * @method getMyself
     * @memberOf {MyselfClient#}
     * @param opts Ignored
     * @param callback Called when the current user is retrieved.
     */
    this.getMyself = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/myself'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        this.jiraClient.makeRequest(options, callback);
    };
}