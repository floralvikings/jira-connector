"use strict";

module.exports = ComponentClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/component'
 *
 * @param {JiraClient} jiraClient
 * @constructor ComponentClient
 */
function ComponentClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Create a component via POST.
     *
     * @method createComponent
     * @memberOf {ComponentClient#}
     * @param opts The request options sent to the Jira API
     * @param opts.component See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3871}
     * @param callback Called when the component has been created.
     */
    this.createComponent = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/component'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.component
        };

        this.jiraClient.makeRequest(options, callback);
    };
}