"use strict";

var errorStrings = require('./../lib/error');

var issue = module.exports = function (jiraClient) {
    this.jiraClient = jiraClient;
};

(function () {

    /**
     * Create a new issue in the Jira tracker.
     * @param {Object} issue The issue data in the form of POST body to the JIRA API.  Example:
     * {
     * "update": {
     *     "worklog": [
     *         {
     *             "add": {
     *                 "started": "2011-07-05T11:05:00.000+0000",
     *                 "timeSpent": "60m"
     *             }
     *         }
     *     ]
     *  },
     *  "fields": {
     *      "project": {
     *        "id": "10000"
     *    },
     *    "summary": "something's wrong",
     *    "issuetype": {
     *        "id": "10000"
     *    },
     *    "assignee": {
     *        "name": "homer"
     *    },
     *    "reporter": {
     *        "name": "smithers"
     *    },
     *    "priority": {
     *        "id": "20000"
     *    },
     *    "labels": [
     *        "bugfix",
     *        "blitz_test"
     *    ],
     *    "timetracking": {
     *        "originalEstimate": "10",
     *        "remainingEstimate": "5"
     *    },
     *    "security": {
     *        "id": "10000"
     *    },
     *    "versions": [
     *        {
     *            "id": "10000"
     *        }
     *    ],
     *    "environment": "environment",
     *    "description": "description",
     *    "duedate": "2011-03-11",
     *    "fixVersions": [
     *        {
     *            "id": "10001"
     *        }
     *    ],
     *    "components": [
     *        {
     *            "id": "10000"
     *        }
     *    ],
     *    "customfield_60000": "jira-developers",
     *    "customfield_20000": "06/Jul/11 3:25 PM",
     *    "customfield_80000": {
     *        "value": "red"
     *    },
     *    "customfield_40000": "this is a text field",
     *    "customfield_30000": [
     *        "10000",
     *        "10002"
     *    ],
     *    "customfield_70000": [
     *        "jira-administrators",
     *        "jira-users"
     *    ],
     *    "customfield_50000": "this is a text area. big text.",
     *    "customfield_10000": "09/Jun/81"
     *  }
     * }
     * @param callback Called when the issue has been created.
     */
    this.createIssue = function (issue, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: issue
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

    /**
     * Create multiple Jira issues at the same time.
     * @param issues See "acceptable request representations:" https://docs.atlassian.com/jira/REST/latest/#d2e828
     * @param callback Called when the issues have been created.
     */
    this.bulkCreate = function (issues, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue/bulk'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: issues
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

    /**
     *
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} [opts.fields] See https://docs.atlassian.com/jira/REST/latest/#d2e611
     * @param {Object} [opts.expand] See https://docs.atlassian.com/jira/REST/latest/#d2e611
     * @param callback
     */
    this.getIssue = function (opts, callback) {
        if (!opts.issueID && !opts.issueKey) {
            throw new Error(errorStrings.NO_ISSUE_IDENTIFIER);
        }

        var idOrKey = opts.issueID || opts.issueKey;

        var qs = {
            fields: '',
            expand: ''
        };

        if (opts.fields) {
            opts.fields.forEach(function (field) {
                qs.fields += field + ','
            });
        }

        if (opts.expand) {
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey),
            method: 'GET',
            followAllRedirects: true,
            json: true,
            qs: qs
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });

    };

    /**
     * Delete an issue.
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {boolean} [opts.deleteSubTasks=false] "a String of true or false indicating that any subtasks should also
     *        be deleted. If the issue has no subtasks this parameter is ignored. If the issue has subtasks and this
     *        parameter is missing or false, then the issue will not be deleted and an error will be returned."
     * @param callback
     */
    this.deleteIssue = function (opts, callback) {
        if (!opts.issueID && !opts.issueKey) {
            throw new Error(errorStrings.NO_ISSUE_IDENTIFIER);
        }
        var idOrKey = opts.issueID || opts.issueKey;

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey),
            method: 'DELETE',
            followAllRedirects: true,
            json: true,
            qs: {deleteSubTasks: opts.deleteSubTasks ? true : false}
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }
            return callback(null, 'Issue Deleted');
        });
    };

    /**
     * Edit an issue.
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} opts.issue The JSON representation of the issue.  See https://docs.atlassian.com/jira/REST/latest/#d2e656
     * @param callback
     */
    this.editIssue = function (opts, callback) {
        if (!opts.issueID && !opts.issueKey) {
            throw new Error(errorStrings.NO_ISSUE_IDENTIFIER);
        }
        var idOrKey = opts.issueID || opts.issueKey;

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey),
            method: 'PUT',
            followAllRedirects: true,
            json: true,
            body: opts.issue
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, 'Issue Updated');
        });
    };

    /**
     * Assign an issue.
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.assignee The name of the user to whom to assign the issue. -1 for default, null for no assignee.
     * @param callback Called when the issue has been assigned.
     */
    this.assignIssue = function (opts, callback) {
        if (!opts.issueID && !opts.issueKey) {
            throw new Error(errorStrings.NO_ISSUE_IDENTIFIER);
        }
        var idOrKey = opts.issueID || opts.issueKey;

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + "/assignee"),
            method: 'PUT',
            followAllRedirects: true,
            json: true,
            body: {
                name: opts.assignee
            }
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, 'Issue Assigned');
        });
    };

}).call(issue.prototype);

