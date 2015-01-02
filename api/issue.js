"use strict";

var issue = module.exports = function(jiraClient) {
    this.jiraClient = jiraClient;
};

(function () {

    /**
     * Create a new issue in the Jira tracker.
     * @param {Object} issue
     * @param callback Called when the issue has been created.
     */
    this.create = function (issue, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: issue
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err) {
                return callback(error, null);
            }

            if (response.statusCode === 400) {
                return callback(body);
            }

            if ((response.statusCode !== 200) && (response.statusCode !== 201)) {
                return callback(response.statusCode + ': Unable to connect to JIRA during search.');
            }

            return callback(null, body);
        })
    };
}).call(issue.prototype);

