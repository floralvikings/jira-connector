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
     * @memberOf ComponentClient#
     * @param opts The request options sent to the Jira API
     * @param opts.component See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3871}
     * @param [callback] Called when the component has been created.
     * @return {Promise} Resolved when the component has been created.
     */
    this.createComponent = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/component'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.component
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Modify a component via PUT. Any fields present in the PUT will override existing values. As a convenience, if a
     * field is not present, it is silently ignored. If leadUserName is an empty string ("") the component lead will be
     * removed.
     *
     * @method editComponent
     * @memberOf ComponentClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.id The id of the component to edit.
     * @param opts.component The new data to place in the component.  See
     *      {@link https://docs.atlassian.com/jira/REST/latest/#d2e3939}
     * @param [callback] Called when the component has beed edited.
     * @return {Promise} Resolved when the component has beed edited.
     */
    this.editComponent = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/component/' + opts.id),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: opts.component
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a project component.
     *
     * @method getComponent
     * @memberOf ComponentClient#
     * @param opts The options sent to the Jira API
     * @param opts.id The id of the component to edit.
     * @param [callback] Called when the component has been retrieved.
     * @return {Promise} Resolved when the component has been retrieved.
     */
    this.getComponent = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/component/' + opts.id),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Delete a project component.
     *
     * @method deleteComponent
     * @memberOf ComponentClient#
     * @param opts The options sent to the Jira API
     * @param opts.id The id of the component to edit.
     * @param [opts.moveIssuesTo] The new component applied to issues whose 'id' component will be deleted. If this
     *     value is null, then the 'id' component is simply removed from the related isues.
     * @param [callback] Called when the component has been deleted.
     * @return {Promise} Resolved when the component has been deleted.
     */
    this.deleteComponent = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/component/' + opts.id),
            method: 'DELETE',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback, 'Project Component Deleted');
    };

    /**
     * Get counts of issues related to this component.
     *
     * @method getRelatedIssueCounts
     * @memberOf ComponentClient#
     * @param opts The options sent to the Jira API
     * @param opts.id The id of the component to edit.
     * @param [callback] Called when the count has been retrieved.
     * @return {Promise} Resolved when the count has been retrieved.
     */
    this.getRelatedIssueCounts = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/component/' + opts.id + '/relatedIssueCounts'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}