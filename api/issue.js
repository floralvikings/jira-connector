"use strict";

var errorStrings = require('./../lib/error');

module.exports = IssueClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issue'
 * @constructor IssueClient
 * @param {JiraClient} jiraClient
 */
function IssueClient(jiraClient) {
    this.jiraClient = jiraClient;
}

(function () {

    /**
     * Creates an issue or a sub-task from a JSON representation.
     *
     * The fields that can be set on create, in either the fields parameter or the update parameter can be determined
     * using the /rest/api/2/issue/createmeta resource. If a field is not configured to appear on the create screen,
     * then it will not be in the createmeta, and a field validation error will occur if it is submitted.
     *
     * Creating a sub-task is similar to creating a regular issue, with two important differences:
     *
     * * the issueType field must correspond to a sub-task issue type (you can use /issue/createmeta to discover
     * sub-task issue types), and
     * * you must provide a parent field in the issue create request containing the id or key of the parent issue.
     *
     * @method createIssue
     * @memberof IssueClient#
     * @param {Object} issue The issue data in the form of POST body to the JIRA API.
     * See {@link https://docs.atlassian.com/jira/REST/latest/#d2e398}
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
     * Creates issues or sub-tasks from a JSON representation.
     *
     * Creates many issues in one bulk operation.
     *
     * Creating a sub-task is similar to creating a regular issue. More details can be found in createIssue section:
     * {@link IssueResource#createIssue(IssueUpdateBean)}}
     *
     * @method bulkCreate
     * @memberof IssueClient#
     * @param issues See {@link https://docs.atlassian.com/jira/REST/latest/#d2e828}
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
     * Returns a full representation of the issue for the given issue key.
     *
     * An issue JSON consists of the issue key, a collection of fields, a link to the workflow transition sub-resource,
     * and (optionally) the HTML rendered values of any fields that support it (e.g. if wiki syntax is enabled for the
     * description or comments).
     *
     * The fields param (which can be specified multiple times) gives a comma-separated list of fields to include in
     * the response. This can be used to retrieve a subset of fields. A particular field can be excluded by prefixing
     * it with a minus.
     *
     * By default, all (\*all) fields are returned in this get-issue resource. Note: the default is different when doing
     * a jql search -- the default there is just navigable fields (\*navigable).
     *
     * * \*all - include all fields
     * * \*navigable - include just navigable fields
     * * summary,comment - include just the summary and comments
     * * -comment - include everything except comments (the default is *all for get-issue)
     * * \*all,-comment - include everything except comments
     *
     * JIRA will attempt to identify the issue by the issueIdOrKey path parameter. This can be an issue id, or an issue
     * key. If the issue cannot be found via an exact match, JIRA will also look for the issue in a case-insensitive
     * way, or by looking to see if the issue was moved. In either of these cases, the request will proceed as normal
     * (a 302 or other redirect will not be returned). The issue key contained in the response will indicate the
     * current value of issue's key.
     *
     * @method getIssue
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} opts.fields See {@link https://docs.atlassian.com/jira/REST/latest/#d2e611}
     * @param {Object} opts.expand See {@link https://docs.atlassian.com/jira/REST/latest/#d2e611}
     * @param callback
     */
    this.getIssue = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);
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
     * Delete an issue. If the issue has subtasks you must set the parameter deleteSubtasks=true to delete the issue.
     * You cannot delete an issue without its subtasks also being deleted.
     *
     * @method deleteIssue
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {boolean} opts.deleteSubTasks "a String of true or false indicating that any subtasks should also
     *        be deleted. If the issue has no subtasks this parameter is ignored. If the issue has subtasks and this
     *        parameter is missing or false, then the issue will not be deleted and an error will be returned."
     * @param callback
     */
    this.deleteIssue = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

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
     *  Edits an issue from a JSON representation.
     *
     * The issue can either be updated by setting explicit the field value(s) or by using an operation to change the
     * field value.
     *
     * The fields that can be updated, in either the fields parameter or the update parameter, can be determined using
     * the {@link IssueClient#getEditMetadata} method. If a field is not configured to appear on the edit
     * screen, then it will not be in the editmeta, and a field validation error will occur if it is submitted.
     *
     * Specifying a "field_id": field_value in the "fields" is a shorthand for a "set" operation in the "update"
     * section. Field should appear either in "fields" or "update", not in both.
     *
     * @method editIssue
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} opts.issue See {@link https://docs.atlassian.com/jira/REST/latest/#d2e656}
     * @param callback
     */
    this.editIssue = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

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
     * Assigns an issue to a user. You can use this resource to assign issues when the user submitting the request has
     * the assign permission but not the edit issue permission. If the name is "-1" automatic assignee is used. A null
     * name will remove the assignee.
     *
     * @method assignIssue
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.assignee The name of the user to whom to assign the issue. -1 for default, null for no
     *     assignee.
     * @param callback Called when the issue has been assigned.
     */
    this.assignIssue = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

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

    /**
     * Get all the comments for an issue.
     *
     * @method getComments
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} opts.expand See {@link https://docs.atlassian.com/jira/REST/latest/#d2e461}
     * @param callback Called when the issue has been assigned.
     */
    this.getComments = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);
        var qs = {expand: ''};

        if (opts.expand) {
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + "/comment"),
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
     * Add a comment to an issue
     *
     * @method addComment
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} opts.comment See {@link https://docs.atlassian.com/jira/REST/latest/#d2e482}
     * @param callback
     */
    this.addComment = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);
        var qs = {expand: ''};

        if (opts.expand) {
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + "/comment"),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            qs: qs,
            body: opts.comment
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

    /**
     * Get a specific comment.
     *
     * @method getComment
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.commentId The id of the comment.
     * @param callback Called when the comment is retrieved.
     */
    this.getComment = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        if (!opts.commentId) {
            throw new Error(errorStrings.NO_COMMENT_ID);
        }
        var qs = {expand: ''};

        if (opts.expand) {
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + "/comment/" + opts.commentId),
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
     * Updates an existing comment using its JSON representation.
     *
     * @method editComment
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.commentId The id of the comment.
     * @param {Object} opts.comment See {@link https://docs.atlassian.com/jira/REST/latest/#d2e539}
     * @param callback
     */
    this.editComment = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        if (!opts.comment) {
            throw new Error(errorStrings.NO_COMMENT_ERROR);
        } else if (!opts.commentId) {
            throw new Error(errorStrings.NO_COMMENT_ID);
        }

        var qs = {expand: ''};

        if (opts.expand) {
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + "/comment/" + opts.commentId),
            method: 'PUT',
            followAllRedirects: true,
            json: true,
            qs: qs,
            body: opts.comment
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

    /**
     * Delete an existing comment.
     *
     * @method deleteComment
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.commentId The id of the comment.
     * @param callback Called when the comment is retrieved.
     */
    this.deleteComment = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        if (!opts.commentId) {
            throw new Error(errorStrings.NO_COMMENT_ID);
        }

        var qs = {expand: ''};

        if (opts.expand) {
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + "/comment/" + opts.commentId),
            method: 'DELETE',
            followAllRedirects: true,
            json: true,
            qs: qs
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, 'Comment Deleted');
        });
    };

    /**
     * Returns the meta data for editing an issue.
     *
     * The fields in the editmeta correspond to the fields in the edit screen for the issue. Fields not in the screen
     * will not be in the editemeta.
     *
     * @method getEditMetadata
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param callback Called when the metadata is retrieved.
     */
    this.getEditMetadata = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/editmeta'),
            method: 'GET',
            followAllRedirects: true,
            json: true
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

    /**
     * Sends a notification (email) to the list or recipients defined in the request.
     * A couple of notes: this may call back with the error 'No recipients were defined for notification.' if all
     * of the intended recipients have disabled notifications from Jira.
     *
     * @method sendEmailNotification
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *        issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} opts.notification See {@link https://docs.atlassian.com/jira/REST/latest/#d2e435}
     * @param callback Called when the metadata is retrieved.
     */
    this.sendEmailNotification = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        if (!opts.notification) {
            throw new Error(errorStrings.NO_NOTIFICATION_ERROR);
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/notify'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: opts.notification
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, 'Notifications Sent.');
        });
    };

    /**
     * Get a REST sub-resource representing the remote issue links on the issue.
     *
     * @method getRemoteLinks
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *     issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.globalId The id of the remote issue link to be returned. If null (not provided) all remote
     *     links for the issue are returned. For a full explanation of Issue Link fields please refer to
     *     {@link https://developer.atlassian.com/display/JIRADEV/Fields+in+Remote+Issue+Links}
     * @param callback Called when the remote links are retrieved.
     */
    this.getRemoteLinks = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/remotelink'),
            method: 'GET',
            followAllRedirects: true,
            json: true,
            qs: {
                globalId: opts.globalId
            }
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

    /**
     * Creates (or updates) a remote issue link from a JSON representation. If a globalId is provided and a remote issue
     * link exists with that globalId, the remote issue link is updated. Otherwise, the remote issue link is created.
     *
     * @method createRemoteLink
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *     issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e945}
     * @param callback Called when the remote links are retrieved.
     */
    this.createRemoteLink = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/remotelink'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: opts.remoteLink
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

    /**
     * Updates (or creates) a remote issue link from a JSON representation. If a globalId is provided and a remote issue
     * link exists with that globalId, the remote issue link is updated. Otherwise, the remote issue link is created.
     *
     * @method updateRemoteLink
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *     issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {Object} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e945}
     * @param callback Called when the remote links are retrieved.
     */
    this.updateRemoteLink = function (opts, callback) {
        // The one API endpoint handles both updates and creation.
        this.createRemoteLink(opts, callback);
    };

    /**
     * Delete the remote issue link with the given global id on the issue.
     *
     * @method deleteRemoteLink
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *     issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.globalId The global id of the remote issue link
     * @param callback Called when the remote links are retrieved.
     */
    this.deleteRemoteLink = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        if (!opts.globalId) {
            throw new Error(errorStrings.NO_GLOBAL_ID_ERROR);
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/remotelink'),
            method: 'DELETE',
            followAllRedirects: true,
            json: true,
            qs: {
                globalId: opts.globalId
            }
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, 'RemoteLink Deleted');
        });
    };


    /**
     * Get the remote issue link with the given id on the issue.
     *
     * @method getRemoteLinkByID
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *     issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.linkId The id of the remote link
     * @param callback Called when the remote links are retrieved.
     */
    this.getRemoteLinkByID = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        if (!opts.linkId) {
            throw new Error(errorStrings.NO_LINK_ID_ERROR);
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/remotelink/' + opts.linkId),
            method: 'GET',
            followAllRedirects: true,
            json: true
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

    /**
     * Get the remote issue link with the given id on the issue.
     *
     * @method updateRemoteLinkByID
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *     issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.linkId The id of the remote link
     * @param {string} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e1037}
     * @param callback Called when the remote links are retrieved.
     */
    this.updateRemoteLinkByID = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        if (!opts.linkId) {
            throw new Error(errorStrings.NO_LINK_ID_ERROR);
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/remotelink/' + opts.linkId),
            method: 'PUT',
            followAllRedirects: true,
            json: true,
            body: opts.remoteLink
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, 'Remote Link Updated');
        });
    };

    /**
     * Get the remote issue link with the given id on the issue.
     *
     * @method deleteRemoteLinkByID
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *     issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.linkId The id of the remote link
     * @param callback Called when the remote links are retrieved.
     */
    this.deleteRemoteLinkByID = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        if (!opts.linkId) {
            throw new Error(errorStrings.NO_LINK_ID_ERROR);
        }

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/remotelink/' + opts.linkId),
            method: 'DELETE',
            followAllRedirects: true,
            json: true
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, 'Remote Link Deleted');
        });
    };

    /**
     * Get a list of the transitions possible for this issue by the current user, along with fields that are required
     * and their types.
     *
     * Fields will only be returned if ```expand=transitions.fields.```
     *
     * The fields in the metadata correspond to the fields in the transition screen for that transition. Fields not in
     * the screen will not be in the metadata.
     *
     * @method getTransitions
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueID or
     *     issueKey property; issueID will be used over issueKey if both are present.
     * @param {string} opts.issueID The ID of the issue.  EX: 10002
     * @param {string} opts.issueKey The Key of the issue.  EX: JWR-3
     * @param {string} opts.transitionId If specified, will call back with only the transition with the specified id.
     * @param callback Called when the transitions are retrieved.
     */
    this.getTransitions = function (opts, callback) {
        var idOrKey = getIdOrKey(opts);

        var options = {
            uri: this.jiraClient.buildURL('/issue/' + idOrKey + '/transitions'),
            method: 'GET',
            followAllRedirects: true,
            json: true,
            qs: {transitionId: opts.transitionId}
        };

        this.jiraClient.makeRequest(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, body);
        });
    };

}).call(IssueClient.prototype);

function getIdOrKey(opts) {
    if (!opts.issueID && !opts.issueKey) {
        throw new Error(errorStrings.NO_ISSUE_IDENTIFIER);
    }
    return opts.issueID || opts.issueKey;
}
