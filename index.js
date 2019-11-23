// @ts-nocheck

'use strict';

// Core packages
const url = require('url');

// Npm packages
const request = require('request');

// Custom packages
const ApplicationProperties = require('./api/application-properties');
const Attachment = require('./api/attachment');
const Auditing = require('./api/auditing');
const Auth = require('./api/auth');
const Avatar = require('./api/avatar');
const Backlog = require('./api/backlog');
const Board = require('./api/board');
const Comment = require('./api/comment');
const Component = require('./api/component');
const CustomFieldOption = require('./api/customFieldOption');
const Dashboard = require('./api/dashboard');
const Epic = require('./api/epic');
const errorStrings = require('./lib/error');
const Field = require('./api/field');
const Filter = require('./api/filter');
const Group = require('./api/group');
const GroupUserPicker = require('./api/groupUserPicker');
const Groups = require('./api/groups');
const Issue = require('./api/issue');
const IssueLink = require('./api/issueLink');
const IssueLinkType = require('./api/issueLinkType');
const IssueType = require('./api/issueType');
const Jql = require('./api/jql');
const Labels = require('./api/labels');
const LicenseRole = require('./api/licenseRole');
const LicenseValidator = require('./api/licenseValidator');
const MyPermissions = require('./api/myPermissions');
const MyPreferences = require('./api/myPreferences');
const Myself = require('./api/myself');
const oauth_util = require('./lib/oauth_util');
const Password = require('./api/password');
const Permissions = require('./api/permissions');
const PermissionScheme = require('./api/permission-scheme');
const Priority = require('./api/priority');
const Project = require('./api/project');
const ProjectCategory = require('./api/projectCategory');
const ProjectValidate = require('./api/projectValidate');
const Reindex = require('./api/reindex');
const Resolution = require('./api/resolution');
const Roles = require('./api/roles');
const Screens = require('./api/screens');
const Search = require('./api/search');
const SecurityLevel = require('./api/securityLevel');
const ServerInfo = require('./api/serverInfo');
const Settings = require('./api/settings');
const Sprint = require('./api/sprint');
const Status = require('./api/status');
const StatusCategory = require('./api/statusCategory');
const User = require('./api/user');
const Version = require('./api/version');
const Webhook = require('./api/webhook');
const Workflow = require('./api/workflow');
const WorkflowScheme = require('./api/workflowScheme');
const Worklog = require('./api/worklog');

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
 * @param {string} [config.path_prefix="/"] The prefix to use in front of the path, if Jira isn't at "/" - deprecated in favor of pathPrefix
 * @param {string} [config.pathPrefix="/"] The prefix to use in front of the path, if Jira isn't at "/"
 * @param {boolean} [config.strictSSL=true] It is recommended not to turn it off for no reason (https://github.com/request/request/issues/251).
 * @param {string} [config.version=2] The version of the Jira API to which you will be connecting.  Currently, only
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
 * @param {CookieJar} [config.cookie_jar] The CookieJar to use for every requests.
 * @param {Promise} [config.promise] Any function (constructor) compatible with Promise (bluebird, Q,...).
 *      Default - native Promise.
 * @param {Request} [config.request] Any function (constructor) compatible with Request (request, supertest,...).
 *      Default - require('request').
 */

const JiraClient = (module.exports = function(config) {
  if (!config.host) {
    throw new Error(errorStrings.NO_HOST_ERROR);
  }

  if (config.path_prefix) {
    console.warn(
      'JiraClient: path_prefix is deprecated in favor of pathPrefix'
    );

    config.pathPrefix = config.path_prefix;
  }

  this.host = config.host;
  this.timeout = config.timeout;
  this.protocol = config.protocol ? config.protocol : 'https';
  this.pathPrefix = config.pathPrefix ? config.pathPrefix : '/';
  this.port = config.port;
  this.apiVersion = 2;
  this.strictSSL = Object.prototype.hasOwnProperty.call(config, 'strictSSL')
    ? config.strictSSL
    : true;
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
      };
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
  }

  if (config.cookie_jar) {
    this.cookie_jar = config.cookie_jar;
  }

  this.applicationProperties = new ApplicationProperties(this);
  this.attachment = new Attachment(this);
  this.auditing = new Auditing(this);
  this.auth = new Auth(this);
  this.avatar = new Avatar(this);
  this.backlog = new Backlog(this);
  this.board = new Board(this);
  this.comment = new Comment(this);
  this.component = new Component(this);
  this.customFieldOption = new CustomFieldOption(this);
  this.dashboard = new Dashboard(this);
  this.epic = new Epic(this);
  this.field = new Field(this);
  this.filter = new Filter(this);
  this.group = new Group(this);
  this.groupUserPicker = new GroupUserPicker(this);
  this.groups = new Groups(this);
  this.issue = new Issue(this);
  this.issueLink = new IssueLink(this);
  this.issueLinkType = new IssueLinkType(this);
  this.issueType = new IssueType(this);
  this.jql = new Jql(this);
  this.labels = new Labels(this);
  this.licenseRole = new LicenseRole(this);
  this.licenseValidator = new LicenseValidator(this);
  this.myPermissions = new MyPermissions(this);
  this.myPreferences = new MyPreferences(this);
  this.myself = new Myself(this);
  this.password = new Password(this);
  this.permissions = new Permissions(this);
  this.permissionScheme = new PermissionScheme(this);
  this.priority = new Priority(this);
  this.project = new Project(this);
  this.projectCategory = new ProjectCategory(this);
  this.projectValidate = new ProjectValidate(this);
  this.reindex = new Reindex(this);
  this.resolution = new Resolution(this);
  this.roles = new Roles(this);
  this.screens = new Screens(this);
  this.search = new Search(this);
  this.securityLevel = new SecurityLevel(this);
  this.serverInfo = new ServerInfo(this);
  this.settings = new Settings(this);
  this.sprint = new Sprint(this);
  this.status = new Status(this);
  this.statusCategory = new StatusCategory(this);
  this.user = new User(this);
  this.version = new Version(this);
  this.webhook = new Webhook(this);
  this.workflow = new Workflow(this);
  this.workflowScheme = new WorkflowScheme(this);
  this.worklog = new Worklog(this);
});

(function() {
  /**
   * Simple utility to build a REST endpoint URL for the Jira API.
   *
   * @method buildURL
   * @memberOf JiraClient#
   * @param path The path of the URL without concern for the root of the REST API.
   * @param {string | number} [forcedVersion] Use this param to force a particular version
   * @returns {string} The constructed URL.
   */
  this.buildURL = function(path, forcedVersion) {
    const apiBasePath = this.pathPrefix + 'rest/api/';
    const version = forcedVersion || this.apiVersion;
    const requestUrl = url.format({
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
   * @param {string | number} [forcedVersion] Use this param to force a particular version
   * @returns {string} The constructed URL.
   */
  this.buildAgileURL = function(path, forcedVersion) {
    const apiBasePath = this.pathPrefix + 'rest/agile/';
    const version = forcedVersion || this.agileApiVersion;
    const requestUrl = url.format({
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
  this.buildAuthURL = function(path, forcedVersion) {
    const apiBasePath = this.pathPrefix + 'rest/auth/';
    const version = forcedVersion || this.authApiVersion;
    const requestUrl = url.format({
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
  this.buildWebhookURL = function(path, forcedVersion) {
    const apiBasePath = this.pathPrefix + 'rest/webhooks/';
    const version = forcedVersion || this.webhookApiVersion;
    const requestUrl = url.format({
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
  this.makeRequest = function(options, callback, successString) {
    const requestLib = this.requestLib;
    options.rejectUnauthorized = this.rejectUnauthorized;
    options.strictSSL = this.strictSSL;
    options.timeout = this.timeout;

    if (this.oauthConfig) {
      options.oauth = this.oauthConfig;
    } else if (this.basic_auth) {
      if (this.basic_auth.base64) {
        if (!options.headers) {
          options.headers = {};
        }
        options.headers.Authorization = 'Basic ' + this.basic_auth.base64;
      } else {
        options.auth = this.basic_auth;
      }
    }

    if (this.cookie_jar) {
      options.jar = this.cookie_jar;
    }

    if (callback) {
      requestLib(options, (err, response, body) => {
        if (err || response.statusCode < 200 || response.statusCode > 399) {
          return callback(err ? err : body, null, response);
        }

        if (typeof body === 'string') {
          try {
            // eslint-disable-next-line no-param-reassign
            body = JSON.parse(body);
          } catch (jsonErr) {
            return callback(jsonErr, null, response);
          }
        }

        return callback(null, successString ? successString : body, response);
      });
    } else if (this.promise) {
      // eslint-disable-next-line new-cap
      return new this.promise((resolve, reject) => {
        const req = requestLib(options);
        let requestObj = null;

        req.on('request', request => {
          requestObj = request;
        });

        req.on('response', response => {
          // Saving error
          const error = response.statusCode < 200 || response.statusCode > 399;

          // Collecting data
          const body = [];
          const push = body.push.bind(body);
          response.on('data', push);

          // Data collected
          response.on('end', () => {
            let result = body.join('');

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
                      headers: requestObj._headers
                    },
                    response: {
                      headers: response.headers
                    }
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
                    headers: requestObj._headers
                  },
                  response: {
                    headers: response.headers
                  }
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
}.call(JiraClient.prototype));

JiraClient.oauth_util = require('./lib/oauth_util');

exports.oauth_util = oauth_util;
