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

    /**
     * Modify a component via PUT. Any fields present in the PUT will override existing values. As a convenience, if a
     * field is not present, it is silently ignored. If leadUserName is an empty string ("") the component lead will be
     * removed.
     *
     * @method editComponent
     * @memberOf {ComponentClient#}
     * @param opts The request options sent to the Jira API.
     * @param opts.id The ID of the component to edit.
     * @param opts.component The new data to place in the component.  See
     *      {@link https://docs.atlassian.com/jira/REST/latest/#d2e3939}
     * @param callback Called when the component has beed edited.
     */
    this.editComponent = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/component/' + opts.id),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: opts.component
        };

        this.jiraClient.makeRequest(options, callback);
    };
}