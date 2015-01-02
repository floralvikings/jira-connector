"use strict";

var issue = module.exports = function(jiraClient) {
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
    this.create = function (issue, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: issue
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] !== 2) {
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
    this.bulkCreate = function(issues, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue/bulk'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: issues
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] !== 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };
}).call(issue.prototype);

