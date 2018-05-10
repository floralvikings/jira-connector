"use strict";

var errorStrings = require('./../lib/error');
var fs = require('fs');

module.exports = IssueClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issue' and '/rest/agile/1.0/issue'
 * @constructor IssueClient
 * @param {JiraClient} jiraClient
 */
function IssueClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns the estimation of the issue and a filedId of the field that is
     * used for it.  The boardId parameter is required, and determines which
     * field will be updated on an issue.
     *
     * @method getIssueEstimation
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this
     *        object must contain EITHER an issueId or issueKey property;
     *        issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of teh issue.  EX: JWR-3
     * @param {string} [opts.boardId] The id of the board required to
     *        determine which field is used for estimation.
     * @param [callback] Called when the issue estimation has been retrieved.
     * @return {Promise} Resolved when the issue estimation has been retrieved.
     */
    this.getIssueEstimation = function (opts, callback) {
        var endpoint = '/issue/' + (opts.issueId || opts.issueKey) + '/estimation';
        var options = {
            uri: this.jiraClient.buildAgileURL(endpoint),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                boardId: opts.boardId,
                filter: opts.filter,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Updates the estimation of the issue.  The boardId parameter is required,
     * and determines which field will be updated on an issue.
     *
     * @method setIssueEstimation
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this
     *        object must contain EITHER an issueId or issueKey property;
     *        issueId will be used over issueKey if both are present.
     * @param {string} [opts.value] The value to set the issue estimation as.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of teh issue.  EX: JWR-3
     * @param {string} [opts.boardId] The id of the board required to
     *        determine which field is used for estimation.
     * @param [callback] Called when the issue estimation has been created.
     * @return {Promise} Resolved when the issue estimation has been created.
     */
    this.setIssueEstimation = function (opts, callback) {
        var endpoint = '/issue/' + (opts.issueId || opts.issueKey) + '/estimation';
        var options = {
            uri: this.jiraClient.buildAgileURL(endpoint),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: {
                value: opts.value,
                filter: opts.filter,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            },
            qs: {
              boardId: opts.boardId
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Moves (ranks) issues before or after a given issue.
     *
     * @method setIssueRanks
     * @memberOf IssueClient#
     * @param {Object} ranking The ranking data in the form of PUT body to the
     *        Jira API.
     * @param [callback] Called when the issue rank has been created.
     * @return {Promise} Resolved when the issue rank has been created.
     */
    this.setIssueRanks = function (ranking, callback) {
        var options = {
            uri: this.jiraClient.buildAgileURL('/issue/rank'),
            method: 'PUT',
            json: true,
            followAllRedirects: true,
            body: ranking
        };

        return this.jiraClient.makeRequest(options, callback);
    };

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
     * @param [callback] Called when the issue has been created.
     * @return {Promise} Resolved when the issue has been created.
     */
    this.createIssue = function (issue, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: issue
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns the meta data for creating issues. This includes the available projects, issue types and fields,
     * including field types and whether or not those fields are required. Projects will not be returned if the user
     * does not have permission to create issues in that project.
     *
     * The fields in the createmeta correspond to the fields in the create screen for the project/issuetype. Fields not
     * in the screen will not be in the createmeta.
     *
     * Fields will only be returned if ```expand=projects.issuetypes.fields.```
     *
     * The results can be filtered by project and/or issue type, given by the query params.
     *
     * @method getCreateMetadata
     * @memberOf IssueClient#
     * @param {Object} [opts] The options for the API request.
     * @param {string} [opts.projectIds] combined with the projectKeys param, lists the projects with which to filter
     *     the results. If absent, all projects are returned. This parameter can be specified multiple times, and/or be
     *     a comma-separated list. Specifiying a project that does not exist (or that you cannot create issues in) is
     *     not an error, but it will not be in the results.
     * @param {string} [opts.projectKeys] combined with the projectIds param, lists the projects with which to filter
     *     the results. If null, all projects are returned. This parameter can be specified multiple times, and/or be a
     *     comma-separated list. Specifiying a project that does not exist (or that you cannot create issues in) is not
     *     an error, but it will not be in the results.
     * @param {string} [opts.issuetypeIds] combinded with issuetypeNames, lists the issue types with which to filter
     *     the results. If null, all issue types are returned. This parameter can be specified multiple times, and/or
     *     be a comma-separated list. Specifiying an issue type that does not exist is not an error.
     * @param {string} [opts.issuetypeNames] combinded with issuetypeIds, lists the issue types with which to filter
     *     the results. If null, all issue types are returned. This parameter can be specified multiple times, but is
     *     NOT interpreted as a comma-separated list. Specifiying an issue type that does not exist is not an error.
     * @param {string} [opts.expand] in order to get expanded field descriptions, specify 'projects.issuetypes.fields' here.
     * @param [callback] Called when the metadata has been retrieved.
     * @return {Promise} Resolved when the metadata has been retrieved.
     */
    this.getCreateMetadata = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue/createmeta'),
            method: 'GET',
            followAllRedirects: true,
            json: true,
            qs: {
                projectIds: opts.projectIds,
                projectKeys: opts.projectKeys,
                issuetypeIds: opts.issuetypeIds,
                issuetypeNames: opts.issuetypeNames,
                expand: opts.expand
            }
        };

        return this.jiraClient.makeRequest(options, callback);
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
     * @param [callback] Called when the issues have been created.
     * @return {Promise} Resolved when the issues have been created.
     */
    this.bulkCreate = function (issues, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue/bulk'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: issues
        };

        return this.jiraClient.makeRequest(options, callback);
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
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {boolean} [opts.agile] Whether or not to call the agile version of this endpoint.  Defaults to false.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {Object} [opts.fields] See {@link https://docs.atlassian.com/jira/REST/latest/#d2e611}
     * @param {Object} [opts.expand] See {@link https://docs.atlassian.com/jira/REST/latest/#d2e611}
     * @param {Object} [opts.properties] See {@link https://docs.atlassian.com/jira/REST/latest/#d2e611}
     * @param [callback] Called when data has been retrieved
     * @return {Promise} Resolved when data has been retrieved
     */
    this.getIssue = function (opts, callback) {
        if (!opts.agile) {
            var options = this.buildRequestOptions(opts, '', 'GET');
        } else {
            var endpoint = '/issue/' + (opts.issueId || opts.issueKey);
            var options = {
                uri: this.jiraClient.buildAgileURL(endpoint),
                method: 'GET',
                json: true,
                followAllRedirects: true,
                qs: {
                    filter: opts.filter,
                    startAt: opts.startAt,
                    maxResults: opts.maxResults,
                    expand: opts.expand
                }
            };
        }

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Delete an issue. If the issue has subtasks you must set the parameter deleteSubtasks=true to delete the issue.
     * You cannot delete an issue without its subtasks also being deleted.
     *
     * @method deleteIssue
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} [opts.deleteSubtasks] "a String of true or false indicating that any subtasks should also
     *        be deleted. If the issue has no subtasks this parameter is ignored. If the issue has subtasks and this
     *        parameter is missing or false, then the issue will not be deleted and an error will be returned."
     * @param [callback] Called when data has been retrieved
     * @return {Promise} Resolved when data has been retrieved
     */
    this.deleteIssue = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'DELETE', null, {deleteSubtasks: opts.deleteSubtasks});

        return this.jiraClient.makeRequest(options, callback, 'Issue Deleted');
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
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {Object} opts.issue See {@link https://docs.atlassian.com/jira/REST/latest/#d2e656}
     * @param [callback] Called when data has been retrieved
     * @return {Promise} Resolved when data has been retrieved
     */
    this.editIssue = function (opts, callback) {
        if (!opts.issue) {
            throw new Error(errorStrings.NO_ISSUE_ERROR);
        }
        var options = this.buildRequestOptions(opts, '', 'PUT', opts.issue, opts.qs);

        return this.jiraClient.makeRequest(options, callback, 'Issue Updated');
    };

    /**
     * Assigns an issue to a user. You can use this resource to assign issues when the user submitting the request has
     * the assign permission but not the edit issue permission. If the name is "-1" automatic assignee is used. A null
     * name will remove the assignee.
     *
     * @method assignIssue
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.assignee The name of the user to whom to assign the issue. -1 for default, null for no
     *     assignee.
     * @param [callback] Called when the issue has been assigned.
     * @return {Promise} Resolved when the issue has been assigned.
     */
    this.assignIssue = function (opts, callback) {
        if (!(typeof opts.assignee === "string" && opts.assignee.length || opts.assignee === null)) {
            throw new Error(errorStrings.NO_ASSIGNEE_ERROR);
        }

        var options = this.buildRequestOptions(opts, '/assignee', 'PUT', {name: opts.assignee});

        return this.jiraClient.makeRequest(options, callback, 'Issue Assigned');
    };

    /**
     * Get all the comments for an issue.
     *
     * @method getComments
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {Object} opts.expand See {@link https://docs.atlassian.com/jira/REST/latest/#d2e461}
     * @param [callback] Called when the issue has been assigned.
     * @return {Promise} Resolved when the issue has been assigned.
     */
    this.getComments = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/comment', 'GET');

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Add a comment to an issue
     *
     * @method addComment
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {Object} opts.comment See {@link https://docs.atlassian.com/jira/REST/latest/#d2e482}
     * @param [callback] Called when data has been retrieved
     * @return {Promise} Resolved when data has been retrieved
     */
    this.addComment = function (opts, callback) {
        var options;
        if(opts.comment.body) {
            options = this.buildRequestOptions(opts, '/comment', 'POST', opts.comment);
        } else {
            options = this.buildRequestOptions(opts, '/comment', 'POST', {body: opts.comment});
        }

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a specific comment.
     *
     * @method getComment
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.commentId The id of the comment.
     * @param [callback] Called when the comment is retrieved.
     * @return {Promise} Resolved when the comment is retrieved.
     */
    this.getComment = function (opts, callback) {
        if (!opts.commentId) {
            throw new Error(errorStrings.NO_COMMENT_ID);
        }
        var options = this.buildRequestOptions(opts, '/comment/' + opts.commentId, 'GET');

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Updates an existing comment using its JSON representation.
     *
     * @method editComment
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.commentId The id of the comment.
     * @param {Object} opts.comment See {@link https://docs.atlassian.com/jira/REST/latest/#d2e539}
     * @param [callback] Called when data has been retrieved
     * @return {Promise} Resolved when data has been retrieved
     */
    this.editComment = function (opts, callback) {
        if (!opts.comment) {
            throw new Error(errorStrings.NO_COMMENT_ERROR);
        } else if (!opts.commentId) {
            throw new Error(errorStrings.NO_COMMENT_ID);
        }
        var options = this.buildRequestOptions(opts, '/comment/' + opts.commentId, 'PUT', opts.comment);

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Delete an existing comment.
     *
     * @method deleteComment
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.commentId The id of the comment.
     * @param [callback] Called when the comment is retrieved.
     * @return {Promise} Resolved when the comment is retrieved.
     */
    this.deleteComment = function (opts, callback) {
        if (!opts.commentId) {
            throw new Error(errorStrings.NO_COMMENT_ID);
        }
        var options = this.buildRequestOptions(opts, '/comment/' + opts.commentId, 'DELETE');

        return this.jiraClient.makeRequest(options, callback, 'Comment Deleted');
    };

    /**
     * Returns the meta data for editing an issue.
     *
     * The fields in the editmeta correspond to the fields in the edit screen for the issue. Fields not in the screen
     * will not be in the editemeta.
     *
     * @method getEditMetadata
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param [callback] Called when the metadata is retrieved.
     * @return {Promise} Resolved when the metadata is retrieved.
     */
    this.getEditMetadata = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/editmeta', 'GET');

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Sends a notification (email) to the list or recipients defined in the request.
     * A couple of notes: this may call back with the error 'No recipients were defined for notification.' if all
     * of the intended recipients have disabled notifications from Jira.
     *
     * @method sendEmailNotification
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *        issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {Object} opts.notification See {@link https://docs.atlassian.com/jira/REST/latest/#d2e435}
     * @param [callback] Called when the metadata is retrieved.
     * @return {Promise} Resolved when the metadata is retrieved.
     */
    this.sendEmailNotification = function (opts, callback) {
        if (!opts.notification) {
            throw new Error(errorStrings.NO_NOTIFICATION_ERROR);
        }

        var options = this.buildRequestOptions(opts, '/notify', 'POST', opts.notification);

        return this.jiraClient.makeRequest(options, callback, 'Notifications Sent');
    };

    /**
     * Get a REST sub-resource representing the remote issue links on the issue.
     *
     * @method getRemoteLinks
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.globalId The id of the remote issue link to be returned. If null (not provided) all remote
     *     links for the issue are returned. For a full explanation of Issue Link fields please refer to
     *     {@link https://developer.atlassian.com/display/JIRADEV/Fields+in+Remote+Issue+Links}
     * @param [callback] Called when the remote links are retrieved.
     * @return {Promise} Resolved when the remote links are retrieved.
     */
    this.getRemoteLinks = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/remotelink', 'GET', null, {globalId: opts.globalId});

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Creates (or updates) a remote issue link from a JSON representation. If a globalId is provided and a remote issue
     * link exists with that globalId, the remote issue link is updated. Otherwise, the remote issue link is created.
     *
     * @method createRemoteLink
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {Object} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e945}
     * @param [callback] Called when the remote links are retrieved.
     * @return {Promise} Resolved when the remote links are retrieved.
     */
    this.createRemoteLink = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/remotelink', 'POST', opts.remoteLink);

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Updates (or creates) a remote issue link from a JSON representation. If a globalId is provided and a remote issue
     * link exists with that globalId, the remote issue link is updated. Otherwise, the remote issue link is created.
     *
     * @method updateRemoteLink
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {Object} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e945}
     * @param [callback] Called when the remote links are retrieved.
     * @return {Promise} Resolved when the remote links are retrieved.
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
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.globalId The global id of the remote issue link
     * @param [callback] Called when the remote links are retrieved.
     * @return {Promise} Resolved when the remote links are retrieved.
     */
    this.deleteRemoteLink = function (opts, callback) {
        if (!opts.globalId) {
            throw new Error(errorStrings.NO_GLOBAL_ID_ERROR);
        }

        var options = this.buildRequestOptions(opts, '/remotelink', 'DELETE', null, {globalId: opts.globalId});

        return this.jiraClient.makeRequest(options, callback, 'RemoteLink Deleted');
    };

    /**
     * Get the remote issue link with the given id on the issue.
     *
     * @method getRemoteLinkById
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.linkId The id of the remote link
     * @param [callback] Called when the remote links are retrieved.
     * @return {Promise} Resolved when the remote links are retrieved.
     */
    this.getRemoteLinkById = function (opts, callback) {
        if (!opts.linkId) {
            throw new Error(errorStrings.NO_LINK_ID_ERROR);
        }

        var options = this.buildRequestOptions(opts, '/remotelink/' + opts.linkId, 'GET');

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get the remote issue link with the given id on the issue.
     *
     * @method updateRemoteLinkById
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.linkId The id of the remote link
     * @param {string} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e1037}
     * @param [callback] Called when the remote links are retrieved.
     * @return {Promise} Resolved when the remote links are retrieved.
     */
    this.updateRemoteLinkById = function (opts, callback) {
        if (!opts.linkId) {
            throw new Error(errorStrings.NO_LINK_ID_ERROR);
        }

        var options = this.buildRequestOptions(opts, '/remotelink/' + opts.linkId, 'PUT', opts.remoteLink);

        return this.jiraClient.makeRequest(options, callback, 'RemoteLink Updated');
    };

    /**
     * Get the remote issue link with the given id on the issue.
     *
     * @method deleteRemoteLinkById
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.linkId The id of the remote link
     * @param [callback] Called when the remote links are retrieved.
     * @return {Promise} Resolved when the remote links are retrieved.
     */
    this.deleteRemoteLinkById = function (opts, callback) {
        if (!opts.linkId) {
            throw new Error(errorStrings.NO_LINK_ID_ERROR);
        }

        var options = this.buildRequestOptions(opts, '/remotelink/' + opts.linkId, 'DELETE');

        return this.jiraClient.makeRequest(options, callback, 'RemoteLink Deleted');
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
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.transitionId If specified, will call back with only the transition with the specified id.
     * @param [callback] Called when the transitions are retrieved.
     * @return {Promise} Resolved when the transitions are retrieved.
     */
    this.getTransitions = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/transitions', 'GET', null, {transitionId: opts.transitionId});

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Perform a transition on an issue. When performing the transition you can udate or set other issue fields.
     *
     * The fields that can be set on transtion, in either the fields parameter or the update parameter can be
     * determined using the** /rest/api/2/issue/{issueIdOrKey}/transitions?expand=transitions.fields resource**. If a
     * field is not configured to appear on the transition screen, then it will not be in the transition metadata, and
     * a field validation error will occur if it is submitted.
     *
     * @method transitionIssue
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.transition See {@link https://docs.atlassian.com/jira/REST/latest/#d2e698}
     * @param [callback] Called when the transitions are retrieved.
     * @return {Promise} Resolved when the transitions are retrieved.
     */
    this.transitionIssue = function (opts, callback) {
        if (!opts.transition) {
            throw new Error(errorStrings.NO_TRANSITION_ERROR);
        }

        var options;
        if(!opts.transition.transition) { // To keep backwards compatibility
            options = this.buildRequestOptions(opts, '/transitions', 'POST', opts);
        } else {
            options = this.buildRequestOptions(opts, '/transitions', 'POST', opts.transition)
        }
        return this.jiraClient.makeRequest(options, callback, 'Issue Transitioned');
    };

    /**
     * Remove your vote from an issue. (i.e. "unvote")
     *
     * @method unvote
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param [callback] Called after the vote is removed.
     * @return {Promise} Resolved after the vote is removed.
     */
    this.unvote = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/votes', 'DELETE');

        return this.jiraClient.makeRequest(options, callback, 'Vote Removed');
    };

    /**
     * Cast your vote in favour of an issue.
     *
     * @method vote
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param [callback] Called after the vote is removed.
     * @return {Promise} Resolved after the vote is removed.
     */
    this.vote = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/votes', 'POST');

        return this.jiraClient.makeRequest(options, callback, 'Vote Added');
    };

    /**
     * Get a REST sub-resource representing the voters on the issue.
     *
     * @method getVotes
     * @memberof IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param [callback] Called after the votes are retrieved.
     * @return {Promise} Resolved after the votes are retrieved.
     */
    this.getVotes = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/votes', 'GET');

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns the list of watchers for the issue with the given key.
     *
     * @method getWatchers
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param [callback] Called after the watchers are retrieved.
     * @return {Promise} Resolved after the watchers are retrieved.
     */
    this.getWatchers = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/watchers', 'GET');

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Adds a user to an issue's watcher list.
     *
     * @method addWatcher
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.watcher The username of the user to add as a watcher.
     * @param [callback] Called after the watcher is added.
     * @return {Promise} Resolved after the watcher is added.
     */
    this.addWatcher = function (opts, callback) {
        if (!opts.watcher) {
            throw new Error(errorStrings.NO_WATCHER_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/watchers', 'POST', opts.watcher);

        return this.jiraClient.makeRequest(options, callback, 'Watcher Added');
    };

    /**
     * Adds a user to an issue's watcher list.
     *
     * @method removeWatcher
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.watcher The username of the user to remove as a watcher.
     * @param [callback] Called after the watcher is removed.
     * @return {Promise} Resolved after the watcher is removed.
     */
    this.removeWatcher = function (opts, callback) {
        if (!opts.watcher) {
            throw new Error(errorStrings.NO_WATCHER_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/watchers', 'DELETE', null, {username: opts.watcher});

        return this.jiraClient.makeRequest(options, callback, 'Watcher Removed');
    };

    /**
     * Gets all work logs for an issue.
     *
     * @method getWorkLogs
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param [callback] Called after the worklogs are retrieved.
     * @return {Promise} Resolved after the worklogs are retrieved.
     */
    this.getWorkLogs = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/worklog', 'GET');

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Adds a new worklog entry to an issue.
     *
     * @method addWorkLog
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} [opts.adjustEstimate] Allows you to provide specific instructions to update the remaining time
     *     estimate of the issue. Valid values are
     *     * "new" - sets the estimate to a specific value
     *     * "leave"- leaves the estimate as is
     *     * "manual" - specify a specific amount to increase remaining estimate by
     *     * "auto"- Default option. Will automatically adjust the value based on the
     *          new timeSpent specified on the worklog
     * @param {string} [opts.newEstimate] (required when "new" is selected for adjustEstimate) the new value for the
     *     remaining estimate field. e.g. "2d"
     * @param {string} [opts.reduceBy] (required when "manual" is selected for adjustEstimate) the amount to reduce the
     *     remaining estimate by e.g. "2d"
     * @param {Object} opts.worklog See {@link: https://docs.atlassian.com/jira/REST/latest/#d2e1106}
     * @param [callback] Called after the worklog is added.
     * @return {Promise} Resolved after the worklog is added.
     */
    this.addWorkLog = function (opts, callback) {
        if (!opts.worklog) {
            throw new Error(errorStrings.NO_WORKLOG_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/worklog', 'POST', opts.worklog, {
            newEstimate: opts.newEstimate,
            reduceBy: opts.reduceBy,
            adjustEstimate: opts.adjustEstimate
        });

        return this.jiraClient.makeRequest(options, callback, 'Worklog Added');
    };

    /**
     * Gets a specific worklog.
     *
     * @method getWorkLog
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.worklogId The id of the work log to retrieve.
     * @param [callback] Called after the worklog is retrieved.
     * @return {Promise} Resolved after the worklog is retrieved.
     */
    this.getWorkLog = function (opts, callback) {
        if (!opts.worklogId) {
            throw new Error(errorStrings.NO_WORKLOG_ID_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/worklog/' + opts.worklogId, 'GET');

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Updates an existing worklog entry using its JSON representation.
     *
     * @method updateWorkLog
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.worklogId The id of the work log to retrieve.
     * @param {string} [opts.adjustEstimate] Allows you to provide specific instructions to update the remaining time
     *     estimate of the issue. Valid values are
     *     * "new" - sets the estimate to a specific value
     *     * "leave"- leaves the estimate as is
     *     * "auto"- Default option. Will automatically adjust the value based on the
     *          new timeSpent specified on the worklog
     * @param {string} [opts.newEstimate] (required when "new" is selected for adjustEstimate) the new value for the
     *     remaining estimate field. e.g. "2d"
     * @param {Object} opts.worklog See {@link: https://docs.atlassian.com/jira/REST/latest/#d2e1161}
     * @param [callback] Called after the worklog is updated.
     * @return {Promise} Resolved after the worklog is updated.
     */
    this.updateWorkLog = function (opts, callback) {
        if (!opts.worklogId) {
            throw new Error(errorStrings.NO_WORKLOG_ID_ERROR);
        } else if (!opts.worklog) {
            throw new Error(errorStrings.NO_WORKLOG_ERROR);
        }

        var options = this.buildRequestOptions(opts, '/worklog/' + opts.worklogId, 'PUT', opts.worklog, {
            newEstimate: opts.newEstimate,
            adjustEstimate: opts.adjustEstimate
        });

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Deletes an existing worklog entry
     *
     * @method deleteWorkLog
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.worklogId The id of the work log to delete.
     * @param {string} [opts.adjustEstimate] Allows you to provide specific instructions to update the remaining time
     *     estimate of the issue. Valid values are
     *     * "new" - sets the estimate to a specific value
     *     * "leave"- leaves the estimate as is
     *     * "manual" - specify a specific amount to increase remaining estimate by
     *     * "auto"- Default option. Will automatically adjust the value based on the
     *          new timeSpent specified on the worklog
     * @param {string} [opts.newEstimate] (required when "new" is selected for adjustEstimate) the new value for the
     *     remaining estimate field. e.g. "2d"
     * @param {string} [opts.increaseBy] (required when "manual" is selected for adjustEstimate) the amount to reduce
     *     the remaining estimate by e.g. "2d"
     * @param [callback] Called after the work log is deleted.
     * @return {Promise} Resolved after the work log is deleted.
     */
    this.deleteWorkLog = function (opts, callback) {
        if (!opts.worklogId) {
            throw new Error(errorStrings.NO_WORKLOG_ID_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/worklog/' + opts.worklogId, 'DELETE', null, {
            newEstimate: opts.newEstimate,
            increaseBy: opts.increaseBy,
            adjustEstimate: opts.adjustEstimate
        });
        return this.jiraClient.makeRequest(options, callback, 'Work Log Deleted');
    };

    /**
     * Add an attachments to an issue.
     *
     * @method addAttachment
     * @memberOf IssueClient
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.filename The file name of attachment. If you pass an array of filenames, multiple attachments will be added.
     * @param [callback] Called when the attachment has been attached.
     * @return {Promise} Resolved when the attachment has been attached.
     */
    this.addAttachment = function (opts, callback) {
        if (!opts.filename) {
            throw new Error(errorStrings.NO_FILENAME_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/attachments', 'POST');
        delete options.body;
        if (opts.filename.constructor !== Array) opts.filename = [opts.filename];
        var attachments = opts.filename.map (function (filename) {return fs.createReadStream(filename)});
        options.formData = {file: attachments};
        options.headers = {
            "X-Atlassian-Token": "nocheck"
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns the keys of all properties for the issue identified by the key or by the id.  This function is maked as
     * experimental in the Jira API docs, use at your own risk.
     *
     * @method getProperties
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param [callback] Called when the properties are retrieved.
     * @return {Promise} Resolved when the properties are retrieved.
     */
    this.getProperties = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/properties', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Sets the value of the specified issue's property. You can use this resource to store a custom data against the
     * issue identified by the key or by the id. The user who stores the data is required to have permissions to edit
     * the issue.
     *
     * This function is maked as experimental in the Jira API docs, use at your own risk.
     *
     * @method setProperty
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.propertyKey The key of the property being set.
     * @param {Object} opts.propertyValue The value of the property being set.
     * @param [callback] Called when the property is set.
     * @return {Promise} Resolved when the property is set.
     */
    this.setProperty = function (opts, callback) {
        if (!opts.propertyKey) {
            throw new Error(errorStrings.NO_PROPERTY_KEY_ERROR);
        } else if (!opts.propertyValue) {
            throw new Error(errorStrings.NO_PROPERTY_VALUE_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/properties/' + opts.propertyKey, 'PUT', opts.propertyValue);
        return this.jiraClient.makeRequest(options, callback, 'Property Set');
    };

    /**
     * Returns the value of the property with a given key from the issue identified by the key or by the id. The user
     * who retrieves the property is required to have permissions to read the issue.
     *
     * This function is maked as experimental in the Jira API docs, use at your own risk.
     *
     * @method getProperty
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.propertyKey The key of the property being set.
     * @param [callback] Called when the property is retrieved.
     * @return {Promise} Resolved when the property is retrieved.
     */
    this.getProperty = function (opts, callback) {
        if (!opts.propertyKey) {
            throw new Error(errorStrings.NO_PROPERTY_KEY_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/properties/' + opts.propertyKey, 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Removes the property from the issue identified by the key or by the id. Ths user removing the property is
     * required to have permissions to edit the issue.
     *
     * This function is maked as experimental in the Jira API docs, use at your own risk.
     *
     * @method getProperty
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
     *     issueKey property; issueId will be used over issueKey if both are present.
     * @param {string} [opts.issueId] The id of the issue.  EX: 10002
     * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
     * @param {string} opts.propertyKey The key of the property being set.
     * @param [callback] Called when the property is deleted.
     * @return {Promise} Resolved when the property is deleted.
     */
    this.deleteProperty = function (opts, callback) {
        if (!opts.propertyKey) {
            throw new Error(errorStrings.NO_PROPERTY_KEY_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/properties/' + opts.propertyKey, 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Property Deleted');
    };

    this.setWorklogProperty = function (opts, callback) {
        if (!opts.propertyKey) {
            throw new Error(errorStrings.NO_PROPERTY_KEY_ERROR);
        } else if (!opts.propertyValue) {
            throw new Error(errorStrings.NO_PROPERTY_VALUE_ERROR);
        }
      var options = this.buildRequestOptions(
        opts,
        '/worklog/' + opts.worklogId + '/properties/' + opts.propertyKey,
        'PUT',
        opts.propertyValue
      );
      return this.jiraClient.makeRequest(options, callback, 'Property Set');
    };

    this.getWorkLogProperties = function (opts, callback) {
      var options = this.buildRequestOptions(
        opts,
        '/worklog/' + opts.worklogId + '/properties/',
        'GET'
      );
      return this.jiraClient.makeRequest(options, callback);
    };

    this.getWorkLogProperty = function (opts, callback) {
      if (!opts.propertyKey) {
          throw new Error(errorStrings.NO_PROPERTY_KEY_ERROR);
      }
      var options = this.buildRequestOptions(
        opts,
        '/worklog/' + opts.worklogId + '/properties/' + opts.propertyKey,
        'GET'
      );
      return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @param {Object} opts The arguments passed to the method.
     * @param {string} path The path of the endpoint following /issue/{idOrKey}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        if (!opts.issueId && !opts.issueKey) {
            throw new Error(errorStrings.NO_ISSUE_IDENTIFIER);
        }
        var idOrKey = opts.issueId || opts.issueKey;
        var basePath = '/issue/' + idOrKey;
        if (!qs) qs = {};
        if (!body) body = {};

        if (opts.fields) {
            qs.fields = '';
            opts.fields.forEach(function (field) {
                qs.fields += field + ','
            });
        }

        if (opts.expand) {
            qs.expand = '';
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        if (opts.properties) {
            qs.properties = '';
            opts.properties.forEach(function (prop) {
                qs.properties += prop + ','
            });
        }

        return {
            uri: this.jiraClient.buildURL(basePath + path),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    }
    
    /**
     * Returns suggested issues which match the auto-completion query for the 
     * user which executes this request. This REST method will check the user's 
     * history and the user's browsing context and select this issues, which 
     * match the query.
     *
     * @method getIssuePicker
     * @memberOf IssueClient#
     * @param {Object} opts The options to pass to the API.
     * @param {string} [opts.query] the query
     * @param {string} [opts.currentJQL] the JQL in context of which the request 
     *                 is executed. Only issues which match this JQL query will be 
     *                 included in results.
     * @param {string} [opts.currentIssueKey] the key of the issue in context of 
     *                 which the request is executed. The issue which is in context 
     *                 will not be included in the auto-completion result, even if 
     *                 it matches the query.
     * @param {string} [opts.currentProjectId] the id of the project in context of 
     *                 which the request is executed. Suggested issues will be only 
     *                 from this project.
     * @param {boolean} [opts.showSubTasks] if set to false, subtasks will not be 
     *                  included in the list.
     * @param {boolean} [opts.showSubTaskParent] if set to false and request is 
     *                  executed in context of a subtask, the parent issue will 
     *                  not be included in the auto-completion result, even if it 
     *                  matches the query.
     * @param [callback] Called when the issues have been retrieved.
     * @return {Promise} Resolved when the issues have been retrieved.
     */
    this.getIssuePicker = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/issue/picker'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                query: opts.query,
                currentJQL: opts.currentJQL,
                currentIssueKey: opts.currentIssueKey,
                currentProjectId: opts.currentProjectId,
                showSubTasks: opts.showSubTasks,
                showSubTaskParent: opts.showSubTaskParent
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

}
