"use strict";

module.exports = ProjectClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/project'
 * @param {JiraClient} jiraClient
 * @constructor ProjectClient
 */
function ProjectClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all projects which are visible for the currently logged in user. If no user is logged in, it returns the
     * list of projects that are visible when using anonymous access.
     *
     * @method getAllProjects
     * @memberOf ProjectClient#
     * @param {Object} [opts] The request options sent to the Jira API.
     * @param {string} [opts.expand]
     * @param {number} [opts.recent]
     * @param {Array<string>} [opts.properties]
     * @param {callback} [callback] Called when the projects have been retrieved.
     * @return {Promise} Resolved when the projects have been retrieved.
     */
    this.getAllProjects = function (opts, callback) {
        opts = opts || {};
        var options = {
            uri: this.jiraClient.buildURL('/project', opts.apiVersion),
            method: 'GET',
            followAllRedirects: true,
            json: true,
            qs: {
                expand: opts.expand,
                recent: opts.recent,
                properties: opts.properties && opts.properties.join(',')
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    this.updateProject = function(opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/project/' + opts.projectIdOrKey),
            method: 'PUT',
            followAllRedirects: true,
            json: true,
            qs: {
                expand: opts.expand
            },
            body: {
                key: opts.key,
                name: opts.name,
                projectTypeKey: opts.projectTypeKey,
                projectTemplateKey: opts.projectTemplateKey,
                description: opts.description,
                lead: opts.lead,
                leadAccountId: opts.leadAccountId,
                url: opts.url,
                assigneeType: opts.assigneeType,
                avatarId: opts.avatarId,
                issueSecurityScheme: opts.issueSecurityScheme,
                permissionScheme: opts.permissionScheme,
                notificationScheme: opts.notificationScheme,
                categoryId: opts.categoryId
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Deletes a project
     *
     * @method deleteProject
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param [callback] Called when the project has been deleted.
     * @return {Promise} Resolved when the project has been deleted.
     */
    this.deleteProject = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Project Deleted');
    };

    /**
     * Creates a project.
     *
     * @method createProject
     * @memberOf ProjectClient#
     * @param project The project properties. See {@link https://docs.atlassian.com/jira/REST/latest/#api/2/project}
     * @param [callback] Called when the project has been created.
     * @return {Promise} Resolved when the project has been created.
     */
    this.createProject = function (project, callback) {
       
        var options = {
            uri: this.jiraClient.buildURL('/project'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: project
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Gets project propertes.
     *
     * @method getProjectProperties
     * @memberOf ProjectClient#
     * @param opts Options
     * @param opts.projectIdOrKey The project id or project key
     * @param [callback] Called when properties has been retrieved.
     * @return {Promise} Resolved when properties has been retrieved.
     */
    this.getProjectProperties = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/properties', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Contains a full representation of a project in JSON format.
     *
     * All project keys associated with the project will only be returned if expand=projectKeys.
     *
     * @method getProject
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param [callback] Called when the project is retrieved.
     * @return {Promise} Resolved when the project is retrieved.
     */
    this.getProject = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Contains a full representation of a the specified project's components.
     *
     * @method getComponents
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param [callback] Called when the components are retrieved.
     * @return {Promise} Resolved when the components are retrieved.
     */
    this.getComponents = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/components', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get all issue types with valid status values for a project
     *
     * @method getStatuses
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param [callback] Called when the statuses have been retrieved.
     * @return {Promise} Resolved when the statuses have been retrieved.
     */
    this.getStatuses = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/statuses', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Contains a full representation of a the specified project's versions.
     *
     * @method getVersions
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param [callback] Called when the versions have been retrieved.
     * @return {Promise} Resolved when the versions have been retrieved.
     */
    this.getVersions = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/versions', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Contains a paginated representation of a the specified project's versions.
     *
     * @method getVersionsPaginated
     * @memberOf ProjectClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string} opts.projectIdOrKey The project id or project key
     * @param {number} [opt.startAt] The index of the first item to return in a page of results
     * @param {number} [opt.maxResults] The maximum number of items to return per page
     * @param {string} [opt.orderBy] Order the results by a field
     * @param {string} [opt.query] Filter the results using a literal string. Versions with matching name or description are returned (case insensitive).
     * @param {string} [opt.status] A list of status values used to filter the results by version status
     * @param {Array}  [opt.expand] The fields to expand
     * @param {callback} [callback] Called when the paginated representation of all versions have been retrieved.
     * @return {Promise} Resolved when the paginated representation of all versions have been retrieved.
     */
    this.getVersionsPaginated = function (opts, callback) {
        var qs = {
            startAt: opts.startAt,
            maxResults: opts.maxResults,
            orderBy: opts.orderBy,
            query: opts.query,
            status: opts.status
        }
        var options = this.buildRequestOptions(opts, '/version', 'GET', {}, qs);
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Contains a list of roles in this project with links to full details.
     *
     * @method getRoles
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param [callback] Called when the roles have been retrieved.
     * @return {Promise} Resolved when the roles have been retrieved.
     */
    this.getRoles = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/role', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Details on a given project role.
     *
     * @method getRole
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param opts.roleId The id of the role to retrieve.
     * @param [callback] Called when the roles have been retrieved.
     * @return {Promise} Resolved when the roles have been retrieved.
     */
    this.getRole = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/role/' + opts.roleId, 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Updates a project role to contain the sent actors.
     *
     * @method updateRole
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param opts.roleId The id of the role to retrieve.
     * @param opts.newRole See {@link https://docs.atlassian.com/jira/REST/latest/#d2e108}
     * @param [callback] Called when the roles have been retrieved.
     * @return {Promise} Resolved when the roles have been retrieved.
     */
    this.updateRole = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/role/' + opts.roleId, 'PUT', opts.newRole);
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Add an actor to a project role.
     *
     * @method addToRole
     * @memberOf ProjectClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.projectIdOrKey The project id or project key
     * @param opts.roleId The id of the role to retrieve.
     * @param opts.newRole See {@link https://docs.atlassian.com/jira/REST/latest/#d2e134}
     * @param [callback] Called when the roles have been retrieved.
     * @return {Promise} Resolved when the roles have been retrieved.
     */
    this.addToRole = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/role/' + opts.roleId, 'POST', opts.newRole);
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @memberOf ProjectClient#
     * @param {Object} opts The arguments passed to the method.
     * @param {number} opts.projectIdOrKey The id of the project to use in the path.
     * @param {Array} [opts.fields] The fields to include
     * @param {Array} [opts.expand] The fields to expand
     * @param {string} path The path of the endpoint following /project/{id}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        opts = opts || {};

        var basePath = opts.projectIdOrKey ? '/project/' + opts.projectIdOrKey : '/project';

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
