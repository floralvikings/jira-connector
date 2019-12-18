"use strict";

// Core packages
const url = require('url');

// Npm packages
const request = require('request');
const jwt = require('atlassian-jwt');
const queryString = require('query-string');

// Custom packages
var applicationProperties = require('./api/application-properties');
var attachment = require('./api/attachment');
var auditing = require('./api/auditing');
var auth = require('./api/auth');
var avatar = require('./api/avatar');
var backlog = require('./api/backlog');
var board = require('./api/board');
var comment = require('./api/comment');
var component = require('./api/component');
var customFieldOption = require('./api/customFieldOption');
var dashboard = require('./api/dashboard');
const developmentInformation = require('./api/developmentInformation');
var epic = require('./api/epic');
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
var labels = require('./api/labels');
var licenseRole = require('./api/licenseRole');
var licenseValidator = require('./api/licenseValidator');
var myPermissions = require('./api/myPermissions');
var myPreferences = require('./api/myPreferences');
var myself = require('./api/myself');
var oauth_util = require('./lib/oauth_util');
var password = require('./api/password');
var permissions = require('./api/permissions');
var permissionScheme = require('./api/permission-scheme');
var priority = require('./api/priority');
var project = require('./api/project');
var projectCategory = require('./api/projectCategory');
var projectValidate = require('./api/projectValidate');
var reindex = require('./api/reindex');
var resolution = require('./api/resolution');
var roles = require('./api/roles');
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
 * @callback callback
 * @param {any} err
 * @param {any} data
 * @returns {void}
 */

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
 * @property {AuthClient} auth
 * @property {AvatarClient} avatar
 * @property {CommentClient} comment
 * @property {ComponentClient} component
 * @property {CustomFieldOptionClient} customFieldOption
 * @property {DashboardClient} dashboard
 * @property {DevelopmentInformationClient} developmentInformation
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
 * @property {LabelsClient} labels
 * @property {LicenseRoleClient} licenseRole
 * @property {LicenseValidatorClient} licenseValidator
 * @property {MyPermissionsClient} myPermissions
 * @property {MyPreferencesClient} myPreferences
 * @property {MyselfClient} myself
 * @property {PasswordClient} password
 * @property {PermissionsClient} permissions
 * @property {PermissionSchemeClient} permissionScheme
 * @property {PriorityClient} priority
 * @property {ProjectCategoryClient} projectCategory
 * @property {ProjectClient} project
 * @property {ProjectValidateClient} projectValidate
 * @property {ReindexClient} reindex
 * @property {ResolutionClient} resolution
 * @property {RoleClient} roles
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
 * @param {number} [config.timeout] request timeout (milliseconds)
 * @param {string} [config.protocol=https] The protocol used to accses the Jira API.
 * @param {number} [config.port=443] The port number used to connect to Jira.
 * @param {string} [config.path_prefix="/"] The prefix to use in front of the path, if Jira isn't at "/"
 * @param {boolean} [config.strictSSL=true] It is recommended not to turn it off for no reason (https://github.com/request/request/issues/251).
 * @param {number | string} [config.version=2] The version of the Jira API to which you will be connecting.  Currently, only
 *     version 2 is supported.
 * @param {Object} [config.basic_auth] The authentication information used tp connect to Jira. Must contain EITHER username and password
 *     OR oauth information.  Oauth information will be used over username/password authentication.
 * @param {Object} [config.basic_auth.base64] base64 that contains email:api_token.
 * @param {string} [config.basic_auth.username] (DEPRECATED) The username of the user that will be authenticated. MUST be included
 *     if using username and password authentication.
 * @param {string} [config.basic_auth.password] (DEPRECATED) The password of the user that will be authenticated. MUST be included
 *     if using username and password authentication.
 * @param {string} [config.basic_auth.email] The email of the user that will be authenticated. MUST be included
 *     if using email and api_token authentication.
 * @param {string} [config.basic_auth.api_token] The api token of the user that will be authenticated. MUST be included
 *     if using email and api_token authentication.
 * @param {string} [config.oauth.consumer_key] The consumer key used in the Jira Application Link for oauth
 *     authentication.  MUST be included if using OAuth.
 * @param {string} [config.oauth.private_key] The private key used for OAuth security. MUST be included if using OAuth.
 * @param {string} [config.oauth.token] The VERIFIED token used to connect to the Jira API.  MUST be included if using
 *     OAuth.
 * @param {string} [config.oauth.token_secret] The secret for the above token.  MUST be included if using Oauth.
 * @param {Object} [config.jwt] The JWT configuration object that contains iss:secret
 * @param {string} config.jwt.iss The Jira app key (can be found in the app descriptor). MUST be included
 * @param {string} config.jwt.secret The JWT secret token. MUST be included
 * @param {string} [config.jwt.expiry_time_seconds] The JWT token expiry time in seconds. OPTIONAL (default 180 seconds)
 * @param {CookieJar} [config.cookie_jar] The CookieJar to use for every requests.
 * @param {Promise} [config.promise] Any function (constructor) compatible with Promise (bluebird, Q,...).
 *      Default - native Promise.
 * @param {Request} [config.request] Any function (constructor) compatible with Request (request, supertest,...).
 *      Default - require('request').
 */

var JiraClient = module.exports = function (config) {
    if (!config.host) {
        throw new Error(errorStrings.NO_HOST_ERROR);
    }

    this.host = config.host;
    this.timeout = config.timeout;
    this.protocol = config.protocol ? config.protocol : 'https';
    this.path_prefix = config.path_prefix ? config.path_prefix : '/';
    this.port = config.port;
    this.apiVersion = 2;
    this.strictSSL = config.hasOwnProperty('strictSSL') ? config.strictSSL : true;
    this.agileApiVersion = '1.0';
    this.authApiVersion = '1';
    this.webhookApiVersion = '1.0';
    this.promise = config.promise || Promise;
    this.requestLib = config.request || request;
    this.rejectUnauthorized = config.rejectUnauthorized;

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
        } else if (config.basic_auth.api_token || config.basic_auth.email) {
            if (!config.basic_auth.email) {
                throw new Error(errorStrings.NO_EMAIL_ERROR);
            } else if (!config.basic_auth.api_token) {
                throw new Error(errorStrings.NO_APITOKEN_ERROR);
            }

            this.basic_auth = {
                user: config.basic_auth.email,
                pass: config.basic_auth.api_token
            };
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
    } else if (config.jwt) {
      if (config.jwt.secret && config.jwt.iss) {
        this.jwt = {
          iss: config.jwt.iss,
          secret: config.jwt.secret,
          expiry_time_seconds: config.jwt.expiry_time_seconds || 3 * 60
        };
      } else {
        if (!config.jwt.secret) {
          throw new Error(errorStrings.NO_JWT_SECRET_KEY_ERROR);
        } else if (!config.jwt.iss) {
          throw new Error(errorStrings.NO_JWT_ISS_KEY_ERROR);
        }
      }
    }

    if (config.cookie_jar) {
        this.cookie_jar = config.cookie_jar;
    }

    this.applicationProperties = new applicationProperties(this);
    this.attachment = new attachment(this);
    this.auditing = new auditing(this);
    this.auth = new auth(this);
    this.avatar = new avatar(this);
    this.backlog = new backlog(this);
    this.board = new board(this);
    this.comment = new comment(this);
    this.component = new component(this);
    this.customFieldOption = new customFieldOption(this);
    this.dashboard = new dashboard(this);
    this.developmentInformation = new developmentInformation(this);
    this.epic = new epic(this);
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
    this.labels = new labels(this);
    this.licenseRole = new licenseRole(this);
    this.licenseValidator = new licenseValidator(this);
    this.myPermissions = new myPermissions(this);
    this.myPreferences = new myPreferences(this);
    this.myself = new myself(this);
    this.password = new password(this);
    this.permissions = new permissions(this);
    this.permissionScheme = new permissionScheme(this);
    this.priority = new priority(this);
    this.project = new project(this);
    this.projectCategory = new projectCategory(this);
    this.projectValidate = new projectValidate(this);
    this.reindex = new reindex(this);
    this.resolution = new resolution(this);
    this.roles = new roles(this);
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
     * @param {string | number} [forcedVersion] Use this param to force a particular version
     * @returns {string} The constructed URL.
     */
    this.buildURL = function (path, forcedVersion) {
        var apiBasePath = this.path_prefix + 'rest/api/';
        var version = forcedVersion || this.apiVersion;
        var requestUrl = url.format({
            protocol: this.protocol,
            hostname: this.host,
            port: this.port,
            pathname: apiBasePath + version + path
        });

        return decodeURIComponent(requestUrl);
    };

     /**
     * Simple utility to build a REST endpoint URL for the Jira API without prefixes.
     *
     * @method buildAbstractURL
     * @memberOf JiraClient#
     * @param path The path of the URL without concern for the root of the REST API.
     * @returns {string} The constructed URL.
     */
    this.buildAbstractURL = function(path) {
      const apiBasePath = this.path_prefix + 'rest/';
      const requestUrl = url.format({
          protocol: this.protocol,
          hostname: this.host,
          port: this.port,
          pathname: apiBasePath + path
      });

      return decodeURIComponent(requestUrl);
    }

    /**
     * Simple utility to build a REST endpoint URL for the Jira Agile API.
     *
     * @method buildAgileURL
     * @memberOf JiraClient#
     * @param path The path of the URL without concern for the root of the REST API.
     * @param {string | number} [forcedVersion] Use this param to force a particular version
     * @returns {string} The constructed URL.
     */
    this.buildAgileURL = function (path, forcedVersion) {
        var apiBasePath = this.path_prefix + 'rest/agile/';
        var version = forcedVersion || this.agileApiVersion;
        var requestUrl = url.format({
            protocol: this.protocol,
            hostname: this.host,
            port: this.port,
            pathname: apiBasePath + version + path
        });

        return decodeURIComponent(requestUrl);
    };

    /**
     * Simple utility to build a REST endpoint URL for the Jira Auth API.
     *
     * @method buildAuthURL
     * @memberOf JiraClient#
     * @param path The path of the URL without concern for the root of the REST API.
     * @param {string | number} [forcedVersion] Use this param to force a particular version
     * @returns {string} The constructed URL.
     */
    this.buildAuthURL = function (path, forcedVersion) {
        var apiBasePath = this.path_prefix + 'rest/auth/';
        var version = forcedVersion || this.authApiVersion;
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
     * @param {string | number} [forcedVersion] Use this param to force a particular version
     * @returns {string} The constructed URL.
     */
    this.buildWebhookURL = function (path, forcedVersion) {
        var apiBasePath = this.path_prefix + 'rest/webhooks/';
        var version = forcedVersion || this.webhookApiVersion;
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
     * @param {callback} [callback] Called with the APIs response.
     * @param {string} [successString] If supplied, this is reported instead of the response body.
     * @return {Promise} Resolved with APIs response or rejected with error
     */
    this.makeRequest = function (options, callback, successString) {
        let requestLib = this.requestLib;
        options.rejectUnauthorized = this.rejectUnauthorized;
        options.strictSSL = this.strictSSL;
        options.timeout = this.timeout;

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
        } else if (this.jwt) {
            const pathname = new URL(options.uri).pathname;
            const nowInSeconds = Math.floor(Date.now() / 1000);
            const queryParam = queryString.parse(queryString.stringify(options.qs));
            const jwtToken = jwt.encode({
              iss: this.jwt.iss,
              iat: nowInSeconds,
              exp: nowInSeconds + this.jwt.expiry_time_seconds,
              qsh: jwt.createQueryStringHash({
                method: options.method,
                pathname,
                query: queryParam || {}
              })
            }, this.jwt.secret);

            if (!options.headers) {
              options.headers = {};
            }
            options.headers['Authorization'] = `JWT ${jwtToken}`;
        }

        if (this.cookie_jar) {
            options.jar = this.cookie_jar;
        }

        if (callback) {
            requestLib(options, function (err, response, body) {
                if (
                    err ||
                    response.statusCode < 200 ||
                    response.statusCode > 399
                ) {
                    return callback(err ? err : body, null, response);
                }

                if (typeof body === 'string') {
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
                var req = requestLib(options);
                var requestObj = null;

                req.on('request', function (request) {
                    requestObj = request;
                });

                req.on('response', function (response) {
                    // Saving error
                    var error = response.statusCode < 200 || response.statusCode > 399;

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
                            } catch (e) {
                                // nothing to do
                            }
                        }

                        if (error) {
                            response.body = result;
                            if (options.debug) {
                                reject({
                                    result: JSON.stringify(response),
                                    debug: {
                                        options: options,
                                        request: {
                                            headers: requestObj._headers,
                                        },
                                        response: {
                                            headers: response.headers,
                                        },
                                    }
                                });
                            } else {
                                reject(JSON.stringify(response));
                            }
                            return;
                        }

                        if (options.debug) {
                            resolve({
                                result,
                                debug: {
                                    options: options,
                                    request: {
                                        headers: requestObj._headers,
                                    },
                                    response: {
                                        headers: response.headers,
                                    },
                                }
                            });
                        } else {
                            resolve(result);
                        }
                    });
                });

                req.on('error', reject);
            });
        }
    };
}).call(JiraClient.prototype);

JiraClient.oauth_util = require('./lib/oauth_util');

exports.oauth_util = oauth_util;
