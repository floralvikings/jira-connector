"use strict";

// Core packages
var url = require('url');

// Npm packages
var request = require('request');

// Custom packages
var applicationProperties = require('./api/application-properties');
var attachment = require('./api/attachment');
var auditing = require('./api/auditing');
var avatar = require('./api/avatar');
var board = require('./api/board');
var comment = require('./api/comment');
var component = require('./api/component');
var customFieldOption = require('./api/customFieldOption');
var dashboard = require('./api/dashboard');
var errorStrings = require('./lib/error');
var field = require('./api/field');
var filter = require('./api/filter');
var group = require('./api/group');
var groupUserPicker = require('./api/groupUserPicker');
var groups = require('./api/groups');
var issue = require('./api/issue');
var issueLink = require('./api/issueLink');
var issueLinkType = require('./api/issueLinkType');
var issueType = require('./api/issueType');
var jql = require('./api/jql');
var licenseRole = require('./api/licenseRole');
var licenseValidator = require('./api/licenseValidator');
var myPermissions = require('./api/myPermissions');
var myPreferences = require('./api/myPreferences');
var myself = require('./api/myself');
var oauth_util = require('./lib/oauth_util');
var password = require('./api/password');
var priority = require('./api/priority');
var project = require('./api/project');
var projectCategory = require('./api/projectCategory');
var projectValidate = require('./api/projectValidate');
var reindex = require('./api/reindex');
var resolution = require('./api/resolution');
var screens = require('./api/screens');
var search = require('./api/search');
var securityLevel = require('./api/securityLevel');
var serverInfo = require('./api/serverInfo');
var settings = require('./api/settings');
var sprint = require('./api/sprint');
var status = require('./api/status');
var statusCategory = require('./api/statusCategory');
var user = require('./api/user');
var version = require('./api/version');
var webhook = require('./api/webhook');
var workflow = require('./api/workflow');
var workflowScheme = require('./api/workflowScheme');
var worklog = require('./api/worklog');

/**
 * Represents a client for the Jira REST API
 *
 * @constructor JiraClient
 * @property {AgileBoardClient} board
 * @property {AgileSprintClient} sprint
 *
 * @property {ApplicationPropertiesClient} applicationProperties
 * @property {AttachmentClient} attachment
 * @property {AuditingClient} auditing
 * @property {AvatarClient} avatar
 * @property {CommentClient} comment
 * @property {ComponentClient} component
 * @property {CustomFieldOptionClient} customFieldOption
 * @property {DashboardClient} dashboard
 * @property {FieldClient} field
 * @property {FilterClient} filter
 * @property {GroupClient} group
 * @property {GroupUserPickerClient} groupUserPicker
 * @property {GroupsClient} groups
 * @property {IssueClient} issue
 * @property {IssueLinkClient} issueLink
 * @property {IssueLinkTypeClient} issueLinkType
 * @property {IssueTypeClient} issueType
 * @property {JqlClient} jql
 * @property {LicenseRoleClient} licenseRole
 * @property {LicenseValidatorClient} licenseValidator
 * @property {MyPermissionsClient} myPermissions
 * @property {MyPreferencesClient} myPreferences
 * @property {MyselfClient} myself
 * @property {PasswordClient} password
 * @property {PriorityClient} priority
 * @property {ProjectCategoryClient} projectCategory
 * @property {ProjectClient} project
 * @property {ProjectValidateClient} projectValidate
 * @property {ReindexClient} reindex
 * @property {ResolutionClient} resolution
 * @property {ScreensClient} screens
 * @property {SearchClient} search
 * @property {SecurityLevelClient} securityLevel
 * @property {ServerInfoClient} serverInfo
 * @property {SettingsClient} settings
 * @property {StatusCategoryClient} statusCategory
 * @property {StatusClient} status
 * @property {UserClient} user
 * @property {VersionClient} version
 * @property {WebhookClient} webhook
 * @property {WorkflowClient} workflow
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
 * @param {Promise} [config.promise] Any function (constructor) compatible with Promise (bluebird, Q,...).
 *      Default - native Promise.
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
    this.agileApiVersion = '1.0';
    this.webhookApiVersion = '1.0';
    this.promise = config.promise || Promise;

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

    this.applicationProperties = new applicationProperties(this);
    this.attachment = new attachment(this);
    this.auditing = new auditing(this);
    this.avatar = new avatar(this);
    this.board = new board(this);
    this.comment = new comment(this);
    this.component = new component(this);
    this.customFieldOption = new customFieldOption(this);
    this.dashboard = new dashboard(this);
    this.field = new field(this);
    this.filter = new filter(this);
    this.group = new group(this);
    this.groupUserPicker = new groupUserPicker(this);
    this.groups = new groups(this);
    this.issue = new issue(this);
    this.issueLink = new issueLink(this);
    this.issueLinkType = new issueLinkType(this);
    this.issueType = new issueType(this);
    this.jql = new jql(this);
    this.licenseRole = new licenseRole(this);
    this.licenseValidator = new licenseValidator(this);
    this.myPermissions = new myPermissions(this);
    this.myPreferences = new myPreferences(this);
    this.myself = new myself(this);
    this.password = new password(this);
    this.priority = new priority(this);
    this.project = new project(this);
    this.projectCategory = new projectCategory(this);
    this.projectValidate = new projectValidate(this);
    this.reindex = new reindex(this);
    this.resolution = new resolution(this);
    this.screens = new screens(this);
    this.search = new search(this);
    this.securityLevel = new securityLevel(this);
    this.serverInfo = new serverInfo(this);
    this.settings = new settings(this);
    this.sprint = new sprint(this);
    this.status = new status(this);
    this.statusCategory = new statusCategory(this);
    this.user = new user(this);
    this.version = new version(this);
    this.webhook = new webhook(this);
    this.workflow = new workflow(this);
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
     * Simple utility to build a REST endpoint URL for the Jira Agile API.
     *
     * @method buildAgileURL
     * @memberOf JiraClient#
     * @param path The path of the URL without concern for the root of the REST API.
     * @returns {string} The constructed URL.
     */
    this.buildAgileURL = function (path) {
        var apiBasePath = this.path_prefix + 'rest/agile/';
        var version = this.agileApiVersion;
        var requestUrl = url.format({
            protocol: this.protocol,
            hostname: this.host,
            port: this.port,
            pathname: apiBasePath + version + path
        });

        return decodeURIComponent(requestUrl);
    };

    /**
     * Simple utility to build a REST endpoint URL for the Jira webhook API.
     *
     * @method buildWebhookURL
     * @memberOf JiraClient#
     * @param path The path of the URL without concern for the root of the REST API.
     * @returns {string} The constructed URL.
     */
    this.buildWebhookURL = function (path) {
        var apiBasePath = this.path_prefix + 'rest/webhooks/';
        var version = this.webhookApiVersion;
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
     * @param [callback] Called with the APIs response.
     * @param {string} [successString] If supplied, this is reported instead of the response body.
     * @return {Promise} Resolved with APIs response or rejected with error
     */
    this.makeRequest = function (options, callback, successString) {
        if (this.oauthConfig) {
            options.oauth = this.oauthConfig;
        } else if (this.basic_auth) {
            if (this.basic_auth.base64) {
              if (!options.headers) {
                options.headers = {}
              }
              options.headers['Authorization'] = 'Basic ' + this.basic_auth.base64
            } else {
              options.auth = this.basic_auth;
            }
        }
        if (this.cookie_jar) {
            options.jar = this.cookie_jar;
        }

        if (callback) {
            request(options, function (err, response, body) {
                if (err || response.statusCode.toString()[0] != 2) {
                    return callback(err ? err : body, null, response);
                }

            if (typeof body == 'string') {
                try {
                    body = JSON.parse(body);
                } catch (jsonErr) {
                    return callback(jsonErr, null, response);
                }
            }

                return callback(null, successString ? successString : body, response);
            });
        } else if (this.promise) {
            return new this.promise(function (resolve, reject) {

                var req = request(options);

                req.on('response', function(response) {

                    // Saving error
                    var error = response.statusCode.toString()[0] !== '2';

                    // Collecting data
                    var body = [];
                    var push = body.push.bind(body);
                    response.on('data', push);

                    // Data collected
                    response.on('end', function () {

                        var result = body.join('');

                        // Parsing JSON
                        if (result[0] === '[' || result[0] === '{') {
                            try {
                                result = JSON.parse(result);
                            } catch(e) {
                                // nothing to do
                            }
                        }

                        if (error) {
                            response.body = result;
                            reject(JSON.stringify(response));
                            return;
                        }

                        resolve(result);
                    });

                });

                req.on('error', reject);

            });
        }

    };

}).call(JiraClient.prototype);

JiraClient.oauth_util = require('./lib/oauth_util');

exports.oauth_util = oauth_util;
