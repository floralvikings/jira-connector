"use strict";

var NO_CONSUMER_KEY_ERROR = 'Missing \'oauth_consumer_key\' property.';
var NO_PRIVATE_KEY_ERROR = 'Missing \'oauth_private_key\' property.';
var NO_OAUTH_TOKEN_ERROR = 'Missing \'oauth_token\' property.';
var NO_OAUTH_TOKEN_SECRET_ERROR = 'Missing \'oauth_token_secret\' property.';
var NO_USERNAME_ERROR = 'Missing \'username\' property.';
var NO_PASSWORD_ERROR = 'Missing \'password\' property.';
var NO_AUTHENTICATION_ERROR = 'Missing \'auth\' property.';
var INVALID_AUTHENTICATION_PROPERTY_ERROR = 'Invalid \'auth\' property.';

/**
 * Represents a client for the Jira REST API
 *
 * @constructor
 * @param config The information needed to access the Jira API
 * @param {string} [config.protocol=https] The protocol used to accses the Jira API.
 * @param {number} [config.port=443] The port number used to connect to Jira.
 * @param {string} [config.version=2] The version of the Jira API to which you will be connecting.  Currently, only version 2 is supported.
 * @param config.auth The authentication information used tp connect to Jira. Must contain EITHER username and password OR oauth information.  Oauth information will be
 *        used over username/password authentication.
 * @param {string} [config.auth.username] The username of the user that will be authenticated. MUST be included if using username and password authentication.
 * @param {string} [config.auth.password] The password of the user that will be authenticated. MUST be included if using username and password authentication.
 * @param {string} [config.auth.oauth_signature_method='RSA-SHA1'] The oauth authentication signature method.  Currently only 'RSA-SHA1' is supported; adding this property
 *        will have no effect. This is because Jira itself only supports RSA-SHA1.
 * @param {string} [config.auth.oauth_consumer_key] The consumer key used in the Jira Application Link for oauth authentication.  MUST be included if using OAuth.
 * @param {string} [config.auth.oauth_private_key] The private key used for OAuth security. MUST be included if using OAuth.
 * @param {string} [config.auth.oauth_token] The VERIFIED token used to connect to the Jira API.  MUST be included if using OAuth.
 * @param {string} [config.auth.oauth_token_secret] The secret for the above token.  MUST be included if using Oauth.
 */
var Client = module.exports = function(config) {
    this.protocol = config.protocol ? config.protocol : 'https';
    this.port = config.port ? config.port : 443;
    this.version = 2; // TODO Add support for other versions.

    if(!config.auth) {
        throw new Error(NO_AUTHENTICATION_ERROR);
    }

    if(config.auth.oauth_consumer_key || config.auth.oauth_private_key || config.auth.oauth_token || config.auth.oauth_token_secret) {
        if(!config.auth.oauth_consumer_key) {
            throw new Error(NO_CONSUMER_KEY_ERROR);
        }else if(!config.auth.oauth_private_key) {
            throw new Error(NO_PRIVATE_KEY_ERROR);
        }else if(!config.auth.oauth_token) {
            throw new Error(NO_OAUTH_TOKEN_ERROR);
        }else if(!config.auth.oauth_token_secret) {
            throw new Error(NO_OAUTH_TOKEN_SECRET_ERROR);
        }

        this.oauthConfig = auth;
        this.oauthConfig.oauth_signature_method = 'RSA-SHA1';

    }else if(config.auth.username || config.auth.password) {
        if(!config.auth.username) {
            throw new Error(NO_USERNAME_ERROR);
        }else if(!config.auth.password){
            throw new Error(NO_PASSWORD_ERROR);
        }

        this.basicAuth = auth;

    }else {
        throw new Error(INVALID_AUTHENTICATION_PROPERTY_ERROR);
    }
}
