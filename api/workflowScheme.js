"use strict";

module.exports = WorkflowSchemeClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/workflowscheme'
 * @param {JiraClient} jiraClient
 * @constructor WorkflowSchemeClient
 */
function WorkflowSchemeClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Create a new workflow scheme. The body contains a representation of the new scheme. Values not passed are
     * assumed to be set to their defaults.
     *
     * @method createWorkflowScheme
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowScheme See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2196}
     * @param [callback] Called when the workflow scheme has been created.
     * @return {Promise} Resolved when the workflow scheme has been created.
     */
    this.createWorkflowScheme = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/workflowscheme'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.workflowScheme
        };
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Update the passed workflow scheme. The body of the request is a representation of the workflow scheme. Values
     * not passed are assumed to indicate no change for that field. The passed representation can have its
     * updateDraftIfNeeded flag set to true to indicate that the draft should be created and/or updated when the actual
     * scheme cannot be edited (e.g. when the scheme is being used by a project). Values not appearing the body will
     * not be touched.
     *
     * @method editWorkflowScheme
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.workflowScheme See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2305}
     * @param [callback] Called when the workflow scheme has been edited.
     * @return {Promise} Resolved when the workflow scheme has been edited.
     */
    this.editWorkflowScheme = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'PUT', opts.workflowScheme);
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get the requested workflow scheme
     *
     * @method getWorkflowScheme
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param [opts.returnDraftIfExists=false] when true indicates that a scheme's draft, if it exists, should be
     *     queried instead of the scheme itself.
     * @param [callback] Called when the workflow scheme has been retrieved.
     * @return {Promise} Resolved when the workflow scheme has been retrieved.
     */
    this.getWorkflowScheme = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'GET', null, {returnDraftIfExists: opts.returnDraftIfExists});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Delete the passed workflow scheme.
     *
     * @method deleteWorkflowScheme
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param [callback] Called when the workflow scheme has been deleted.
     * @return {Promise} Resolved when the workflow scheme has been deleted.
     */
    this.deleteWorkflowScheme = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Workflow Scheme Deleted');
    };

    /**
     * Create a draft for the passed scheme. The draft will be a copy of the state of the parent.
     *
     * @method createDraft
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param [callback] Called when the draft has been created.
     * @return {Promise} Resolved when the draft has been created.
     */
    this.createDraft = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/createdraft', 'POST');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get the default workflow from the passed workflow scheme.
     *
     * @method getDefaultWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.returnDraftIfExists when true indicates that a scheme's draft, if it exists, should be queried
     *     instead of the scheme itself.
     * @param [callback] Called when the default workflow is returned.
     * @return {Promise} Resolved when the default workflow is returned.
     */
    this.getDefaultWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/default', 'GET', null, {returnDraftIfExists: opts.returnDraftIfExists});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Remove the default workflow from the passed workflow scheme.
     *
     * @method removeDefaultWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.updateDraftIfNeeded when true will create and return a draft when the workflow scheme cannot be
     *     edited (e.g. when it is being used by a project).
     * @param [callback] Called when the defaul workflow has been removed.
     * @return {Promise} Resolved when the defaul workflow has been removed.
     */
    this.removeDefaultWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/default', 'DELETE', null, {updateDraftIfNeeded: opts.updateDraftIfNeeded});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Remove the default workflow from the passed workflow scheme.
     *
     * @method setDefaultWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.workflowName The name of the new deafault workflow
     * @param opts.updateDraftIfNeeded when true will create and return a draft when the workflow scheme cannot be
     *     edited (e.g. when it is being used by a project).
     * @param [callback] Called when the default workflow has been updated.
     * @return {Promise} Resolved when the default workflow has been updated.
     */
    this.setDefaultWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/default', 'PUT', {
            workflow: opts.workflowName,
            updateDraftIfNeeded: opts.updateDraftIfNeeded
        });
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get the requested draft workflow scheme
     *
     * @method getDraft
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param [callback] Called when the draft has been retrieved.
     * @return {Promise} Resolved when the draft has been retrieved.
     */
    this.getDraft = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Update a draft workflow scheme. The draft will created if necessary. The body is a representation of the
     * workflow scheme. Values not passed are assumed to indicate no change for that field.
     *
     * @method editDraft
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.draft See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2575}
     * @param [callback] Called when the draft has been edited.
     * @return {Promise} Resolved when the draft has been edited.
     */
    this.editDraft = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft', 'PUT', opts.draft);
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Delete the passed draft workflow scheme.
     *
     * @method deleteDraft
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param [callback] Called when the draft has been deleted.
     * @return {Promise} Resolved when the draft has been deleted.
     */
    this.deleteDraft = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft', 'DELETE');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get the default workflow from the passed draft workflow scheme
     *
     * @method getDraftDefaultWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param [callback] Called when the default workflow is returned.
     * @return {Promise} Resolved when the default workflow is returned.
     */
    this.getDraftDefaultWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/default', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Remove the default workflow from the passed workflow scheme.
     *
     * @method setDraftDefaultWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.workflowName The name of the new default workflow
     * @param [callback] Called when the default workflow has been updated.
     * @return {Promise} Resolved when the default workflow has been updated.
     */
    this.setDraftDefaultWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/default', 'PUT', {
            workflow: opts.workflowName,
            updateDraftIfNeeded: opts.updateDraftIfNeeded
        });
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Remove the default workflow from the passed draft workflow scheme.
     *
     * @method removeDraftDefaultWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param [callback] Called when the defaul workflow has been removed.
     * @return {Promise} Resolved when the defaul workflow has been removed.
     */
    this.removeDraftDefaultWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/default', 'DELETE');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns the issue type mapping for the passed workflow scheme.
     *
     * @method getIssueType
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.issueType The issue type
     * @param opts.returnDraftIfExists when true indicates that a scheme's draft, if it exists, should be queried
     *     instead of the scheme itself.
     * @param [callback] Called when the issue type has been retrieved.
     * @return {Promise} Resolved when the issue type has been retrieved.
     */
    this.getIssueType = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/issuetype/' + opts.issueType, 'GET', null,
            {returnDraftIfExists: opts.returnDraftIfExists});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Set the issue type mapping for the passed scheme. The passed representation can have its updateDraftIfNeeded
     * flag set to true to indicate that the draft should be created/updated when the actual scheme cannot be edited.
     *
     * @method editIssueType
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.issueType The issue type
     * @param opts.workflow The new workflow
     * @param opts.updateDraftIfNeeded when true will create and return a draft when the workflow scheme cannot be
     *     edited (e.g. when it is being used by a project).
     * @param [callback] Called when the issue type has been edited
     * @return {Promise} Resolved when the issue type has been edited
     */
    this.editIssueType = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/issuetype/' + opts.issueType, 'PUT', {
            workflow: opts.workflow,
            updateDraftIfNeeded: opts.updateDraftIfNeeded
        });
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Remove the specified issue type mapping from the scheme.
     *
     * @method removeIssueType
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.issueType The issue type
     * @param [callback] Called when the issue type mapping has been removed.
     * @return {Promise} Resolved when the issue type mapping has been removed.
     */
    this.removeIssueType = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/issuetype/' + opts.issueType, 'DELETE', null, {
            updateDraftIfNeeded: opts.updateDraftIfNeeded
        });
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns the issue type mapping for the passed draft workflow scheme.
     *
     * @method getDraftIssueType
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.issueType The issue type
     * @param [callback] Called when the issue type has been retrieved.
     * @return {Promise} Resolved when the issue type has been retrieved.
     */
    this.getDraftIssueType = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/issuetype/' + opts.issueType, 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Set the issue type mapping for the passed draft scheme.
     *
     * @method editDraftIssueType
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.issueType The issue type
     * @param opts.workflow The new workflow
     * @param [callback] Called when the issue type has been edited
     * @return {Promise} Resolved when the issue type has been edited
     */
    this.editDraftIssueType = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/issuetype/' + opts.issueType, 'PUT', {workflow: opts.workflow});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Remove the specified issue type mapping from the scheme.
     *
     * @method removeDraftIssueType
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.issueType The issue type
     * @param [callback] Called when the issue type mapping has been removed.
     * @return {Promise} Resolved when the issue type mapping has been removed.
     */
    this.removeDraftIssueType = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/issuetype/' + opts.issueType, 'DELETE');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns the workflow mappings or requested mapping to the caller for the passed scheme.
     *
     * @method getWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.workflowName The name of the workflow.
     * @param [callback] Called when the workflow has been retrieved.
     * @return {Promise} Resolved when the workflow has been retrieved.
     */
    this.getWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/workflow', 'GET', null, {
            workflowName: opts.workflowName
        });
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns the workflow mappings or requested mapping to the caller for the passed draft scheme.
     *
     * @method getDraftWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param opts The request options sent to the Jira API
     * @param opts.workflowSchemeId The id of the workflow scheme.
     * @param opts.workflowName The name of the workflow.
     * @param [callback] Called when the workflow has been retrieved.
     * @return {Promise} Resolved when the workflow has been retrieved.
     */
    this.getDraftWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/workflow', 'GET', null, {
            workflowName: opts.workflowName
        });
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Update the scheme to include the passed mapping. The body is a representation of the workflow mapping. Values
     * not passed are assumed to indicate no change for that field.
     *
     * @method editWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.workflowSchemeId The id of the workflow scheme.
     * @param {string} opts.workflowName The name of the workflow.
     * @param {Array} opts.issueTypes The new issue types to inclue in the workflow.
     *      See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2509}
     * @param [callback] Called when the workflow has been edited.
     * @return {Promise} Resolved when the workflow has been edited.
     */
    this.editWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/workflow', 'PUT', {
            workflow: opts.workflowName,
            issueTypes: opts.issueTypes
        }, {workflowName: opts.workflowName});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Update the draft scheme to include the passed mapping. The body is a representation of the workflow mapping.
     * Values not passed are assumed to indicate no change for that field.
     *
     * @method editDraftWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.workflowSchemeId The id of the workflow scheme.
     * @param {string} opts.workflowName The name of the workflow.
     * @param {Array} opts.issueTypes The new issue types to inclue in the workflow.
     *      See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2670 }
     * @param [callback] Called when the workflow has been edited.
     * @return {Promise} Resolved when the workflow has been edited.
     */
    this.editDraftWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/workflow', 'PUT', {
            workflow: opts.workflowName,
            issueTypes: opts.issueTypes
        }, {workflowName: opts.workflowName});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Delete the passed workflow from the workflow scheme.
     *
     * @method deleteWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.workflowSchemeId The id of the workflow scheme.
     * @param {string} opts.workflowName The name of the workflow.
     * @param [callback] Called when the workflow has been edited.
     * @return {Promise} Resolved when the workflow has been edited.
     */
    this.deleteWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/workflow', 'DELETE', null, {workflowName: opts.workflowName});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Delete the passed workflow from the workflow draft scheme.
     *
     * @method deleteDraftWorkflow
     * @memberOf WorkflowSchemeClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.workflowSchemeId The id of the workflow scheme.
     * @param {string} opts.workflowName The name of the workflow.
     * @param [callback] Called when the workflow has been edited.
     * @return {Promise} Resolved when the workflow has been edited.
     */
    this.deleteDraftWorkflow = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/draft/workflow', 'DELETE', null, {workflowName: opts.workflowName});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @memberOf WorkflowSchemeClient#
     * @param {Object} opts The arguments passed to the method.
     * @param {number} opts.workflowSchemeId The id of the workflowScheme to use in the path.
     * @param {Array} [opts.fields] The fields to include
     * @param {Array} [opts.expand] The fields to expand
     * @param {string} path The path of the endpoint following /workflowScheme/{id}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        var basePath = '/workflowscheme/' + opts.workflowSchemeId;
        if (!qs) qs = {};
        if (!body) body = {};

        if (opts.fields) {
            qs.fields = '';
            opts.fields.forEach(function (field) {
                qs.fields += field + ','
            });
            qs.fields = qs.fields.slice(0, -1);
        }

        if (opts.expand) {
            qs.expand = '';
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
            qs.expand = qs.expand.slice(0, -1);
        }

        return {
            uri: this.jiraClient.buildURL(basePath + path),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    };
}