"use strict";

// npm packages
var Oauth = require('oauth');

// Core packages
var url = require('url');

var NO_HOST_ERROR = 'Missing \'host\' property.';
var NO_CONSUMER_KEY_ERROR = 'Missing \'oauth_consumer_key\' property.';
var NO_PRIVATE_KEY_ERROR = 'Missing \'oauth_private_key\' property.';
var NO_OAUTH_TOKEN_ERROR = 'Missing \'oauth_token\' property.';
var NO_OAUTH_TOKEN_SECRET_ERROR = 'Missing \'oauth_token_secret\' property.';
var NO_USERNAME_ERROR = 'Missing \'username\' property.';
var NO_PASSWORD_ERROR = 'Missing \'password\' property.';
var NO_AUTHENTICATION_ERROR = 'Missing \'auth\' property.';
var NO_VERIFIER_ERROR = 'Missing \'oauth_verifier\' property.';
var INVALID_AUTHENTICATION_PROPERTY_ERROR = 'Invalid \'auth\' property.';

/**
 * Represents a client for the Jira REST API
 *
 * @constructor
 * @param config The information needed to access the Jira API
 * @param {string} host The hostname of the Jira API.
 * @param {string} [config.protocol=https] The protocol used to accses the Jira API.
 * @param {number} [config.port=443] The port number used to connect to Jira.
 * @param {string} [config.version=2] The version of the Jira API to which you will be connecting.  Currently, only version 2 is supported.
 * @param config.auth The authentication information used tp connect to Jira. Must contain EITHER username and password OR oauth information.  Oauth information will be
 *        used over username/password authentication.
 * @param {string} [config.basic_auth.username] The username of the user that will be authenticated. MUST be included if using username and password authentication.
 * @param {string} [config.basic_auth.password] The password of the user that will be authenticated. MUST be included if using username and password authentication.
 * @param {string} [config.oauth.oauth_consumer_key] The consumer key used in the Jira Application Link for oauth authentication.  MUST be included if using OAuth.
 * @param {string} [config.oauth.oauth_private_key] The private key used for OAuth security. MUST be included if using OAuth.
 * @param {string} [config.oauth.oauth_token] The VERIFIED token used to connect to the Jira API.  MUST be included if using OAuth.
 * @param {string} [config.oauth.oauth_token_secret] The secret for the above token.  MUST be included if using Oauth.
 */
var Client = module.exports = function (config) {
    this.protocol = config.protocol ? config.protocol : 'https';
    this.port = config.port ? config.port : 443;
    this.version = 2; // TODO Add support for other versions.

    if (!config.oauth && !config.basic_auth) {
        throw new Error(NO_AUTHENTICATION_ERROR);
    }

    if (config.oauth) {
        if (!config.oauth.oauth_consumer_key) {
            throw new Error(NO_CONSUMER_KEY_ERROR);
        } else if (!config.oauth.oauth_private_key) {
            throw new Error(NO_PRIVATE_KEY_ERROR);
        } else if (!config.oauth.oauth_token) {
            throw new Error(NO_OAUTH_TOKEN_ERROR);
        } else if (!config.oauth.oauth_token_secret) {
            throw new Error(NO_OAUTH_TOKEN_SECRET_ERROR);
        }

        this.oauthConfig = config.oauth;
        this.oauthConfig.oauth_signature_method = 'RSA-SHA1';

    } else if (config.basic_auth.username || config.basic_auth.password) {
        if (!config.basic_auth.username) {
            throw new Error(NO_USERNAME_ERROR);
        } else if (!config.basic_auth.password) {
            throw new Error(NO_PASSWORD_ERROR);
        }

        this.basicAuth = config.basic_auth;

    } else {
        throw new Error(INVALID_AUTHENTICATION_PROPERTY_ERROR);
    }
};

/**
 * Attempts to get an OAuth verification URL using the given API configuration.
 *
 * @param {Object} config The information needed to access the Jira API
 * @param {string} config.host The hostname of the Jira API.
 * @param {string} [config.protocol=https] - The protocol used to accses the Jira API.
 * @param {number} [config.port=443] - The port number used to connect to Jira.
 * @param {string} [config.version=2] - The version of the Jira API to which you will be connecting.  Currently, only version 2 is supported.
 * @param {Object} config.oauth The oauth information
 * @param {string} config.oauth.consumer_key The consumer key of the application accessing Jira.
 * @param {string} config.oauth.private_key The private key of the application accessing Jira.
 * @param {string} [config.oauth.callback_url] The callback URL to be called after the token is generated.  If this is not
 *        included, the user will be given a verification code after authorizing the token, instead of Jira making a
 *        callback to the application.
 * @param {getOauthUrlCallback} callback The function called when the URL has been retrieved.
 */
exports.getAuthorizeURL = function (config, callback) {
    var oauth = generateOAuthObject(config);

    oauth.getOAuthRequestToken(function (err, token, token_secret) {
        if (err) {
            return callback(err);
        }
        return callback(null, {url: authURL + "?oauth_token=" + token, token: token, token_secret: token_secret});
    });
};

/**
 * Given an OAuth token, the token secret, and an access verification code (provided by Jira), swap an OAuth request
 * token with an OAuth access token.
 *
 * @param {Object} config The information needed to access the Jira API
 * @param {string} config.host The hostname of the Jira API.
 * @param {string} [config.protocol=https] - The protocol used to accses the Jira API.
 * @param {number} [config.port=443] - The port number used to connect to Jira.
 * @param {string} [config.version=2] - The version of the Jira API to which you will be connecting.  Currently, only version 2 is supported.
 * @param {Object} config.oauth The oauth information
 * @param {string} config.oauth.consumer_key The consumer key of the application accessing Jira.
 * @param {string} config.oauth.private_key The private key of the application accessing Jira.
 * @param {string} config.oauth.oauth_token The OAuth Token supplied by Jira.
 * @param {string} config.oauth.oauth_token_secret The OAuth Token secret supplied by Jira.
 * @param {string} config.oauth.oauth_verifier The verified code given to the user after authorizing the OAuth token.
 * @param {swapRequestTokenCallback} callback The function called when the token has been swapped.
 */
exports.swapRequestTokenWithAccessToken = function(config, callback) {
    if(!config.oauth.oauth_verifier) {
        throw new Error(NO_VERIFIER_ERROR);
    }

    var oauth = generateOAuthObject(config);

    var token = config.oauth.oauth_token;
    var secret = config.oauth.oauth_token_secret;
    var verifier = config.oauth.oauth_verifier;

    oauth.getOAuthAccessToken(token, secret, verifier, callback);
};

/**
 * Utility function to generate an OAuth object.
 *
 * @param {Object} config The information needed to access the Jira API
 * @param {string} config.host The hostname of the Jira API.
 * @param {string} [config.protocol=https] - The protocol used to accses the Jira API.
 * @param {number} [config.port=443] - The port number used to connect to Jira.
 * @param {string} [config.version=2] - The version of the Jira API to which you will be connecting.  Currently, only version 2 is supported.
 * @param {Object} config.oauth The oauth information
 * @param {string} config.oauth.consumer_key The consumer key of the application accessing Jira.
 * @param {string} config.oauth.private_key The private key of the application accessing Jira.
 * @param {string} [config.oauth.callback_url] The callback URL to be called after the token is generated.  If this is not
 *        included, the user will be given a verification code after authorizing the token, instead of Jira making a
 *        callback to the application.
 *
 * @returns {exports.OAuth} The generated object.
 */
function generateOAuthObject(config) {
    var SERVLET_BASE_URL = '/plugins/servlet';
    var REQ_TOKEN_APPEND = '/oauth/request-token';
    var AUTH_TOKEN_APPEND = '/oauth/authorize';
    var ACCESS_TOKEN_APPEND = '/oauth/access-token';
    var sig = 'RSA-SHA1';

    if (!config.host) {
        throw new Error(NO_HOST_ERROR);
    } else if (!config.oauth.consumer_key) {
        throw new Error(NO_CONSUMER_KEY_ERROR);
    } else if (!config.oauth.private_key) {
        throw new Error(NO_PRIVATE_KEY_ERROR);
    }

    var consumer_key = config.oauth.consumer_key;
    var private_key = config.oauth.private_key;

    var reqURL = url.format({
        protocol: config.protocol ? config.protocol : 'https',
        hostname: config.host,
        port: config.port ? config.port : null,
        pathname: SERVLET_BASE_URL + REQ_TOKEN_APPEND
    });

    var authURL = url.format({
        protocol: config.protocol ? config.protocol : 'https',
        hostname: config.host,
        port: config.port ? config.port : null,
        pathname: SERVLET_BASE_URL + AUTH_TOKEN_APPEND
    });

    var accessURL = url.format({
        protocol: config.protocol ? config.protocol : 'https',
        hostname: config.host,
        port: config.port ? config.port : null,
        pathname: SERVLET_BASE_URL + ACCESS_TOKEN_APPEND
    });

    console.log(reqURL);

    var cb = config.oauth.callback_url ? config.oauth.callback_url : 'oob';

    return new Oauth.OAuth(reqURL, accessURL, consumer_key, private_key, '1.0', cb, sig);
}

// ##### Documentation #####

/**
 * Callback used by getOauthUrl.
 * @callback getOauthUrlCallback
 * @param {*} error The error which occurred, if any.
 * @param {Object} oauth The OAuth information retrieved from the Jira API.
 * @param {String} oauth.url The URL that should be visited by the user to verify the OAuth access.
 * @param {String} oauth.token The OAuth Token retrieved from the Jira API.
 * @param {String} oauth.token_secret The OAuth Token Secret retrieved from the Jira API.
 */

/**
 * Callback used by swapRequestTokenWithAccessToken
 * @callback swapRequestTokenCallback
 * @param {*} error The error which occurred, if any.
 * @param {string} access_token The access token retrieved from Jira.
 */
