"use strict";

// Core packages
var url = require('url');

// npm Packages
var request = require('request');

// Custom packages
var oauth_util = require('./lib/oauth_util');
var errorStrings = require('./lib/error');
var issue = require('./api/issue');
var applicationProperties = require('./api/application-properties');
var attachment = require('./api/attachment');
var auditing = require('./api/auditing');
var avatar = require('./api/avatar');
var comment = require('./api/comment');
var issueLink = require('./api/issueLink');
var issueLinkType = require('./api/issueLinkType');
var groups = require('./api/groups');
var groupUserPicker = require('./api/groupUserPicker');
var customFieldOption = require('./api/customFieldOption');
var jql = require('./api/jql');
var licenseValidator = require('./api/licenseValidator');
var myPermissions = require('./api/myPermissions');
var projectValidate = require('./api/projectValidate');
var securityLevel = require('./api/securityLevel');
var serverInfo = require('./api/serverInfo');
var dashboard = require('./api/dashboard');
var field = require('./api/field');
var issueType = require('./api/issueType');
var priority = require('./api/priority');
var reindex = require('./api/reindex');
var resolution = require('./api/resolution');
var search = require('./api/search');
var status = require('./api/status');
var statusCategory = require('./api/statusCategory');
var licenseRole = require('./api/licenseRole');
var myPreferences = require('./api/myPreferences');
var myself = require('./api/myself');
var password = require('./api/password');
var settings = require('./api/settings');
var component = require('./api/component');
var group = require('./api/group');
var workflow = require('./api/workflow');
var filter = require('./api/filter');
var screens = require('./api/screens');
var version = require('./api/version');
var project = require('./api/project');
var projectCategory = require('./api/projectCategory');
var user = require('./api/user');
var workflowScheme = require('./api/workflowScheme');
var worklog = require('./api/worklog');

/**
 * Represents a client for the Jira REST API
 *
 * @constructor JiraClient
 * @property {IssueClient} issue
 * @property {ApplicationPropertiesClient} applicationProperties
 * @property {AttachmentClient} attachment
 * @property {AuditingClient} auditing
 * @property {AvatarClient} avatar
 * @property {CommentClient} comment
 * @property {IssueLinkClient} issueLink
 * @property {IssueLinkTypeClient} issueLinkType
 * @property {GroupsClient} groups
 * @property {GroupUserPickerClient} groupUserPicker
 * @property {CustomFieldOptionClient} customFieldOption
 * @property {JqlClient} jql
 * @property {LicenseValidatorClient} licenseValidator
 * @property {MyPermissionsClient} myPermissions
 * @property {ProjectValidateClient} projectValidate
 * @property {SecurityLevelClient} securityLevel
 * @property {ServerInfoClient} serverInfo
 * @property {DashboardClient} dashboard
 * @property {FieldClient} field
 * @property {IssueTypeClient} issueType
 * @property {PriorityClient} priority
 * @property {ReindexClient} reindex
 * @property {ResolutionClient} resolution
 * @property {SearchClient} search
 * @property {StatusClient} status
 * @property {StatusCategoryClient} statusCategory
 * @property {LicenseRoleClient} licenseRole
 * @property {MyPreferencesClient} myPreferences
 * @property {MyselfClient} myself
 * @property {PasswordClient} password
 * @property {SettingsClient} settings
 * @property {ComponentClient} component
 * @property {GroupClient} group
 * @property {WorkflowClient} workflow
 * @property {FilterClient} filter
 * @property {ScreensClient} screens
 * @property {VersionClient} version
 * @property {ProjectClient} project
 * @property {ProjectCategoryClient} projectCategory
 * @property {UserClient} user
 * @property {WorkflowSchemeClient} workflowScheme
 * @property {WorklogClient} worklog
 *
 * @param config The information needed to access the Jira API
 * @param {string} config.host The hostname of the Jira API.
 * @param {string} [config.protocol=https] The protocol used to accses the Jira API.
 * @param {number} [config.port=443] The port number used to connect to Jira.
 * @param {string} [config.path_prefix="/"] The prefix to use in front of the path, if Jira isn't at "/"
 * @param {string} [config.version=2] The version of the Jira API to which you will be connecting.  Currently, only
 *     version 2 is supported.
 * @param config.auth The authentication information used tp connect to Jira. Must contain EITHER username and password
 *     OR oauth information.  Oauth information will be used over username/password authentication.
 * @param {string} [config.basic_auth.username] The username of the user that will be authenticated. MUST be included
 *     if using username and password authentication.
 * @param {string} [config.basic_auth.password] The password of the user that will be authenticated. MUST be included
 *     if using username and password authentication.
 * @param {string} [config.oauth.consumer_key] The consumer key used in the Jira Application Link for oauth
 *     authentication.  MUST be included if using OAuth.
 * @param {string} [config.oauth.private_key] The private key used for OAuth security. MUST be included if using OAuth.
 * @param {string} [config.oauth.token] The VERIFIED token used to connect to the Jira API.  MUST be included if using
 *     OAuth.
 * @param {string} [config.oauth.token_secret] The secret for the above token.  MUST be included if using Oauth.
 * @param {CookieJar} [config.cookie_jar] The CookieJar to use for every requests.
 */
var JiraClient = module.exports = function (config) {
    if(!config.host) {
        throw new Error(errorStrings.NO_HOST_ERROR);
    }
    this.host = config.host;
    this.protocol = config.protocol ? config.protocol : 'https';
    this.path_prefix = config.path_prefix ? config.path_prefix : '/';
    this.port = config.port;
    this.apiVersion = 2; // TODO Add support for other versions.

    if (config.oauth) {
        if (!config.oauth.consumer_key) {
            throw new Error(errorStrings.NO_CONSUMER_KEY_ERROR);
        } else if (!config.oauth.private_key) {
            throw new Error(errorStrings.NO_PRIVATE_KEY_ERROR);
        } else if (!config.oauth.token) {
            throw new Error(errorStrings.NO_OAUTH_TOKEN_ERROR);
        } else if (!config.oauth.token_secret) {
            throw new Error(errorStrings.NO_OAUTH_TOKEN_SECRET_ERROR);
        }

        this.oauthConfig = config.oauth;
        this.oauthConfig.signature_method = 'RSA-SHA1';

    } else if (config.basic_auth) {
        if (config.basic_auth.base64) {
            this.basic_auth = {
              base64: config.basic_auth.base64
            }
        } else {
            if (!config.basic_auth.username) {
                throw new Error(errorStrings.NO_USERNAME_ERROR);
            } else if (!config.basic_auth.password) {
                throw new Error(errorStrings.NO_PASSWORD_ERROR);
            }

            this.basic_auth = {
                user: config.basic_auth.username,
                pass: config.basic_auth.password
            };
        }
    }

    if (config.cookie_jar) {
        this.cookie_jar = config.cookie_jar;
    }

    this.issue = new issue(this);
    this.applicationProperties = new applicationProperties(this);
    this.attachment = new attachment(this);
    this.auditing = new auditing(this);
    this.avatar = new avatar(this);
    this.comment = new comment(this);
    this.issueLink = new issueLink(this);
    this.issueLinkType = new issueLinkType(this);
    this.groups = new groups(this);
    this.groupUserPicker = new groupUserPicker(this);
    this.customFieldOption = new customFieldOption(this);
    this.jql = new jql(this);
    this.licenseValidator = new licenseValidator(this);
    this.myPermissions = new myPermissions(this);
    this.projectValidate = new projectValidate(this);
    this.securityLevel = new securityLevel(this);
    this.serverInfo = new serverInfo(this);
    this.dashboard = new dashboard(this);
    this.field = new field(this);
    this.issueType = new issueType(this);
    this.priority = new priority(this);
    this.reindex = new reindex(this);
    this.resolution = new resolution(this);
    this.search = new search(this);
    this.status = new status(this);
    this.statusCategory = new statusCategory(this);
    this.licenseRole = new licenseRole(this);
    this.myPreferences = new myPreferences(this);
    this.myself = new myself(this);
    this.password = new password(this);
    this.settings = new settings(this);
    this.component = new component(this);
    this.group = new group(this);
    this.workflow = new workflow(this);
    this.filter = new filter(this);
    this.screens = new screens(this);
    this.version = new version(this);
    this.project = new project(this);
    this.projectCategory = new projectCategory(this);
    this.user = new user(this);
    this.workflowScheme = new workflowScheme(this);
    this.worklog = new worklog(this);
};

(function () {

    /**
     * Simple utility to build a REST endpoint URL for the Jira API.
     *
     * @method buildURL
     * @memberOf JiraClient#
     * @param path The path of the URL without concern for the root of the REST API.
     * @returns {string} The constructed URL.
     */
    this.buildURL = function (path) {
        var apiBasePath = this.path_prefix + 'rest/api/';
        var version = this.apiVersion;
        var requestUrl = url.format({
            protocol: this.protocol,
            hostname: this.host,
            port: this.port,
            pathname: apiBasePath + version + path
        });

        return decodeURIComponent(requestUrl);
    };

    /**
     * Make a request to the Jira API and call back with it's response.
     *
     * @method makeRequest
     * @memberOf JiraClient#
     * @param options The request options.
     * @param callback Called with the APIs response.
     * @param {string} [successString] If supplied, this is reported instead of the response body.
     */
    this.makeRequest = function (options, callback, successString) {
        if (this.oauthConfig) {
            options.oauth = this.oauthConfig;
        } else if (this.basic_auth) {
            if (this.basic_auth.base64) {
              options.headers = {
                Authorization: 'Basic ' + this.basic_auth.base64
              }
            } else {
              options.auth = this.basic_auth;
            }
        }
        if (this.cookie_jar) {
            options.jar = this.cookie_jar;
        }
        request(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body, null, response);
            }

            if (typeof body == 'string') body = JSON.parse(body);

            return callback(null, successString ? successString : body, response);
        });
    };

}).call(JiraClient.prototype);

JiraClient.oauth_util = require('./lib/oauth_util');

exports.oauth_util = oauth_util;
