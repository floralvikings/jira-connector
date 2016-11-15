"use strict";

module.exports = ProjectValidateClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/projectvalidate'
 *
 * @param {JiraClient} jiraClient
 * @constructor ProjectValidateClient
 */
function ProjectValidateClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Validates a project key.  This endpoint is a little wonky, as it returns a list of errors as a valid response;
     * even if the key is invalid, it still returns a 200 response.
     * See {@link https://docs.atlassian.com/jira/REST/latest/#d2e297}
     *
     * @method validateProjectKey
     * @memberOf ProjectValidateClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectKey The key of the project.
     * @param [callback] Called when the key has been validated.
     * @return {Promise} Resolved when the key has been validated.
     */
    this.validateProjectKey = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/projectvalidate/key'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                key: opts.projectKey
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}