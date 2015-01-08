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

/**
 * Represents a client for the Jira REST API
 *
 * @constructor JiraClient
 * @param config The information needed to access the Jira API
 * @param {string} config.host The hostname of the Jira API.
 * @param {string} [config.protocol=https] The protocol used to accses the Jira API.
 * @param {number} [config.port=443] The port number used to connect to Jira.
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
 */
var JiraClient = module.exports = function (config) {
    if(!config.host) {
        throw new Error(errorStrings.NO_HOST_ERROR);
    }
    this.host = config.host;
    this.protocol = config.protocol ? config.protocol : 'https';
    this.port = config.port;
    this.version = 2; // TODO Add support for other versions.

    if (!config.oauth && !config.basic_auth) {
        throw new Error(errorStrings.NO_AUTHENTICATION_ERROR);
    }

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
        if (!config.basic_auth.username) {
            throw new Error(errorStrings.NO_USERNAME_ERROR);
        } else if (!config.basic_auth.password) {
            throw new Error(errorStrings.NO_PASSWORD_ERROR);
        }

        this.basic_auth = {
            user: config.basic_auth.username,
            pass: config.basic_auth.password
        };

    } else {
        throw new Error(errorStrings.INVALID_AUTHENTICATION_PROPERTY_ERROR);
    }

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {IssueClient}
     */
    this.issue = new issue(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {ApplicationPropertiesClient}
     */
    this.applicationProperties = new applicationProperties(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {AttachmentClient}
     */
    this.attachment = new attachment(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {AuditingClient}
     */
    this.auditing = new auditing(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {AvatarClient}
     */
    this.avatar = new avatar(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {CommentClient}
     */
    this.comment = new comment(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {IssueLinkClient}
     */
    this.issueLink = new issueLink(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {IssueLinkTypeClient}
     */
    this.issueLinkType = new issueLinkType(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {GroupsClient}
     */
    this.groups = new groups(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {GroupUserPickerClient}
     */
    this.groupUserPicker = new groupUserPicker(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {CustomFieldOptionClient}
     */
    this.customFieldOption = new customFieldOption(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {JqlClient}
     */
    this.jql = new jql(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {LicenseValidatorClient}
     */
    this.licenseValidator = new licenseValidator(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {MyPermissionsClient}
     */
    this.myPermissions = new myPermissions(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {ProjectValidateClient}
     */
    this.projectValidate = new projectValidate(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {SecurityLevelClient}
     */
    this.securityLevel = new securityLevel(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {ServerInfoClient}
     */
    this.serverInfo = new serverInfo(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {DashboardClient}
     */
    this.dashboard = new dashboard(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {FieldClient}
     */
    this.field = new field(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {IssueTypeClient}
     */
    this.issueType = new issueType(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {PriorityClient}
     */
    this.priority = new priority(this);

    /**
     * @memberOf JiraClient#
     * @instance
     * @type {ReindexClient}
     */
    this.reindex = new reindex(this);

    /**
     * @memberOf {JiraClient#}
     * @instance
     * @type {ResolutionClient}
     */
    this.resolution = new resolution(this);

    /**
     * @memberOf {JiraClient#}
     * @instance
     * @type {SearchClient}
     */
    this.search = new search(this);

    /**
     * @memberOf {JiraClient#}
     * @instance
     * @type {StatusClient}
     */
    this.status = new status(this);

    /**
     * @memberOf {JiraClient#}
     * @instance
     * @type {StatusCategoryClient}
     */
    this.statusCategory = new statusCategory(this);

    /**
     * @memberOf {JiraClient#}
     * @instance
     * @type {LicenseRoleClient}
     */
    this.licenseRole = new licenseRole(this);

    /**
     * @memberOf {JiraClient#}
     * @instance
     * @type {MyPreferencesClient}
     */
    this.myPreferences = new myPreferences(this);
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
        var apiBasePath = 'rest/api/';
        var version = this.version;
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
            options.auth = this.basic_auth;
        } else {
            callback(errorStrings.NO_AUTHENTICATION_ERROR);
        }
        request(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body);
            }

            return callback(null, successString ? successString : body);
        });
    };

}).call(JiraClient.prototype);

JiraClient.oauth_util = require('./lib/oauth_util');

exports.oauth_util = oauth_util;

