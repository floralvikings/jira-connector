"use strict";

// Custom packages
var oauth_util = require('./lib/oauth_util');
var errorStrings = require('error');

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
        throw new Error(errorStrings.NO_AUTHENTICATION_ERROR);
    }

    if (config.oauth) {
        if (!config.oauth.oauth_consumer_key) {
            throw new Error(errorStrings.NO_CONSUMER_KEY_ERROR);
        } else if (!config.oauth.oauth_private_key) {
            throw new Error(errorStrings.NO_PRIVATE_KEY_ERROR);
        } else if (!config.oauth.oauth_token) {
            throw new Error(errorStrings.NO_OAUTH_TOKEN_ERROR);
        } else if (!config.oauth.oauth_token_secret) {
            throw new Error.(errorStrings.NO_OAUTH_TOKEN_SECRET_ERROR);
        }

        this.oauthConfig = config.oauth;
        this.oauthConfig.oauth_signature_method = 'RSA-SHA1';

    } else if (config.basic_auth.username || config.basic_auth.password) {
        if (!config.basic_auth.username) {
            throw new Error(errorStrings.NO_USERNAME_ERROR);
        } else if (!config.basic_auth.password) {
            throw new Error(errorStrings.NO_PASSWORD_ERROR);
        }

        this.basicAuth = config.basic_auth;

    } else {
        throw new Error(errorStrings.INVALID_AUTHENTICATION_PROPERTY_ERROR);
    }
};

exports.oauth_util = oauth_util;

