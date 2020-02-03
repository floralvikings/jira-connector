"use strict";

module.exports = WebhookClient;

/**
 * Used to access Jira REST endpoints in '/rest/webhook/1.0/webhook'
 *
 * @param {JiraClient} jiraClient
 * @constructor WebhookClient
 */
function WebhookClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns a list of all registered webhooks.
     *
     * @method getAllWebhooks
     * @memberOf WebhookClient#
     * @param opts Ignored
     * @param [callback] Called when the webhooks have been retrieved.
     * @return {Promise} Resolved when the webhooks have been retrieved.
     */
    this.getAllWebhooks = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildWebhookURL('/webhook'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns a webhook with a specific ID.
     *
     * @method getWebhook
     * @memberOf WebhookClient#
     * @param opts The options sent to the JIRA API.
     * @param opts.webhookURI The URI of the webhook to delete.
     * @param opts.webhookId The numerical webhook ID. This is only used if webhookURI is falsey.
     * @param [callback] Called when the webhook has been retrieved.
     * @return {Promise} Resolved when the webhook has been retrieved.
     */
    this.getWebhook = function (opts, callback) {
        var options = {
            uri: opts.webhookURI || this.jiraClient.buildWebhookURL('/webhook/' + opts.webhookId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Registers a new webhook.
     *
     * @method createWebhook
     * @memberOf WebhookClient#
     * @param opts The options sent to the JIRA API.
     * @param opts.name The name of the webhook.
     * @param opts.url The URL of the webhook.
     * @param opts.events An array of events with which the webhook should be registered. See
     *   {@link https://developer.atlassian.com/jiradev/jira-apis/webhooks#Webhooks-configureConfiguringawebhook}.
     * @param opts.enabled Whether the webhook is enabled.
     * @param opts.filter An object containing filter configuration.
     * @param opts.filter.issue-related-events-section A filter for issues, written in JQL.
     * @param opts.excludeBody Whether to send an empty body to the webhook URL.
     * @param [callback] Called when the webhook has been retrieved.
     * @return {Promise} Resolved when the webhook has been retrieved.
     */
    this.createWebhook = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildWebhookURL('/webhook'),
            method: 'POST',
            json: true,
            body: opts,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Deletes a registered webhook.
     *
     * @method deleteWebhook
     * @memberOf WebhookClient#
     * @param opts The options sent to the JIRA API.
     * @param opts.webhookURI The URI of the webhook to delete.
     * @param opts.webhookId The numerical webhook ID. This is only used if webhookURI is falsey.
     * @param [callback] Called when the webhook has been deleted.
     * @return {Promise} Resolved when the webhook has been deleted.
     */
    this.deleteWebhook = function (opts, callback) {
        var options = {
            uri: opts.webhookURI || this.jiraClient.buildWebhookURL('/webhook/' + opts.webhookId),
            method: 'DELETE',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}
