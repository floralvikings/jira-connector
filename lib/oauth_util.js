// @ts-nocheck

'use strict';

// npm packages
const Oauth = require('oauth');

// Core packages
const url = require('url');

// Custom Packages
const errorStrings = require('./error');

/**
 * @namespace OauthUtil
 */

/**
 * Attempts to get an OAuth verification URL using the given API configuration.
 *
 * @memberOf OauthUtil
 * @param {Object} config The information needed to access the Jira API
 * @param {string} config.host The hostname of the Jira API.
 * @param {string} [config.protocol=https] - The protocol used to accses the Jira API.
 * @param {number} [config.port=443] - The port number used to connect to Jira.
 * @param {string} [config.path_prefix="/"] The prefix to use in front of the path, if Jira isn't at "/"
 * @param {string} [config.version=2] - The version of the Jira API to which you will be connecting.  Currently, only
 *     version 2 is supported.
 * @param {Object} config.oauth The oauth information
 * @param {string} config.oauth.consumer_key The consumer key of the application accessing Jira.
 * @param {string} config.oauth.private_key The private key of the application accessing Jira.
 * @param {string} [config.oauth.callback_url] The callback URL to be called after the token is generated.  If this is
 *     not included, the user will be given a verification code after authorizing the token, instead of Jira making a
 *     callback to the application.
 * @param {OauthUtil~getOauthUrlCallback} callback The function called when the URL has been retrieved.
 */
exports.getAuthorizeURL = function(config, callback) {
  const prefix = config.path_prefix ? config.path_prefix : '';
  const AUTH_TOKEN_APPEND = '/oauth/authorize';
  const SERVLET_BASE_URL = prefix + '/plugins/servlet';

  const authURL = url.format({
    protocol: config.protocol ? config.protocol : 'https',
    hostname: config.host,
    port: config.port ? config.port : null,
    pathname: SERVLET_BASE_URL + AUTH_TOKEN_APPEND
  });

  const oauth = generateOAuthObject(config);

  oauth.getOAuthRequestToken((err, token, token_secret) => {
    if (err) {
      return callback(err);
    }

    return callback(null, {
      url: authURL + '?oauth_token=' + token,
      token: token,
      token_secret: token_secret
    });
  });
};

/**
 * Given an OAuth token, the token secret, and an access verification code (provided by Jira), swap an OAuth request
 * token with an OAuth access token.
 *
 * @memberOf OauthUtil
 * @param {Object} config The information needed to access the Jira API
 * @param {string} config.host The hostname of the Jira API.
 * @param {string} [config.protocol=https] - The protocol used to accses the Jira API.
 * @param {number} [config.port=443] - The port number used to connect to Jira.
 * @param {string} [config.version=2] - The version of the Jira API to which you will be connecting.  Currently, only
 *     version 2 is supported.
 * @param {Object} config.oauth The oauth information
 * @param {string} config.oauth.consumer_key The consumer key of the application accessing Jira.
 * @param {string} config.oauth.private_key The private key of the application accessing Jira.
 * @param {string} config.oauth.token The OAuth Token supplied by Jira.
 * @param {string} config.oauth.token_secret The OAuth Token secret supplied by Jira.
 * @param {string} config.oauth.oauth_verifier The verified code given to the user after authorizing the OAuth token.
 * @param {OauthUtil~swapRequestTokenCallback} callback The function called when the token has been swapped.
 */
exports.swapRequestTokenWithAccessToken = function(config, callback) {
  if (!config.oauth.oauth_verifier) {
    throw new Error(errorStrings.NO_VERIFIER_ERROR);
  }

  const oauth = generateOAuthObject(config);

  const token = config.oauth.token;
  const secret = config.oauth.token_secret;
  const verifier = config.oauth.oauth_verifier;

  oauth.getOAuthAccessToken(token, secret, verifier, callback);
};

/**
 * Utility function to generate an OAuth object.
 *
 * @memberOf OauthUtil
 * @param {Object} config The information needed to access the Jira API
 * @param {string} config.host The hostname of the Jira API.
 * @param {string} [config.protocol=https] - The protocol used to accses the Jira API.
 * @param {number} [config.port=443] - The port number used to connect to Jira.
 * @param {string} [config.path_prefix="/"] The prefix to use in front of the path, if Jira isn't at "/"
 * @param {string} [config.version=2] - The version of the Jira API to which you will be connecting.  Currently, only
 *     version 2 is supported.
 * @param {Object} config.oauth The oauth information
 * @param {string} config.oauth.consumer_key The consumer key of the application accessing Jira.
 * @param {string} config.oauth.private_key The private key of the application accessing Jira.
 * @param {string} [config.oauth.callback_url] The callback URL to be called after the token is generated.  If this is
 *     not included, the user will be given a verification code after authorizing the token, instead of Jira making a
 *     callback to the application.
 *
 * @returns {exports.OAuth} The generated object.
 */
function generateOAuthObject(config) {
  const prefix = config.path_prefix ? config.path_prefix : '';
  const SERVLET_BASE_URL = prefix + '/plugins/servlet';
  const REQ_TOKEN_APPEND = '/oauth/request-token';

  const ACCESS_TOKEN_APPEND = '/oauth/access-token';
  const sig = 'RSA-SHA1';

  if (!config.host) {
    throw new Error(errorStrings.NO_HOST_ERROR);
  } else if (!config.oauth.consumer_key) {
    throw new Error(errorStrings.NO_CONSUMER_KEY_ERROR);
  } else if (!config.oauth.private_key) {
    throw new Error(errorStrings.NO_PRIVATE_KEY_ERROR);
  }

  const consumer_key = config.oauth.consumer_key;
  const private_key = config.oauth.private_key;

  const reqURL = url.format({
    protocol: config.protocol ? config.protocol : 'https',
    hostname: config.host,
    port: config.port ? config.port : null,
    pathname: SERVLET_BASE_URL + REQ_TOKEN_APPEND
  });

  const accessURL = url.format({
    protocol: config.protocol ? config.protocol : 'https',
    hostname: config.host,
    port: config.port ? config.port : null,
    pathname: SERVLET_BASE_URL + ACCESS_TOKEN_APPEND
  });

  const cb = config.oauth.callback_url ? config.oauth.callback_url : 'oob';

  return new Oauth.OAuth(
    reqURL,
    accessURL,
    consumer_key,
    private_key,
    '1.0',
    cb,
    sig
  );
}

/**
 * Callback used by getOauthUrl.
 * @callback OauthUtil~getOauthUrlCallback
 * @param {*} error The error which occurred, if any.
 * @param {Object} oauth The OAuth information retrieved from the Jira API.
 * @param {String} oauth.url The URL that should be visited by the user to verify the OAuth access.
 * @param {String} oauth.token The OAuth Token retrieved from the Jira API.
 * @param {String} oauth.token_secret The OAuth Token Secret retrieved from the Jira API.
 */

/**
 * Callback used by swapRequestTokenWithAccessToken
 * @callback OauthUtil~swapRequestTokenCallback
 * @param {*} error The error which occurred, if any.
 * @param {string} access_token The access token retrieved from Jira.
 */
