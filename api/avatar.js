"use strict";

var fs = require('fs');
var path = require('path');
var errorStrings = require('./../lib/error');

module.exports = AvatarClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/avatar'
 * @param {JiraClient} jiraClient
 * @constructor AvatarClient
 */
function AvatarClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns all system avatars of the given type.
     *
     * @method getAvatars
     * @memberOf AvatarClient#
     * @param opts The options to be used in the API request.
     * @param opts.avatarType The avatar type.  May be 'project' or 'user'.
     * @param [callback] Called when the avatars are retrieved.
     * @return {Promise} Resolved when the avatars are retrieved.
     */
    this.getAvatars = function (opts, callback) {
        if (!opts.avatarType) {
            throw new Error(errorStrings.NO_AVATAR_TYPE_ERROR);
        }
        var options = {
            method: 'GET',
            json: true,
            followAllRedirects: true,
            uri: this.jiraClient.buildURL('/avatar/' + opts.avatarType + '/system')
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Creates a temporary avatar.  This function doesn't seem to work the way the Jira API describes, so for now
     * just don't use it.
     *
     * @method createTemporaryAvatar
     * @memberOf AvatarClient#
     * @param opts The options to be used in the API request.
     * @param opts.avatarType The avatar type.  May be 'project' or 'user'.
     * @param opts.avatarFilename The name of the file being uploaded
     * @param opts.avatarFileSize The size of the file
     * @param opts.avatarFilePath The path to the avatar file.
     * @param [callback] Called when the avatar is created.
     * @return {Promise} Resolved when the avatar is created.
     */
    this.createTemporaryAvatar = function (opts, callback) {
        if (!opts.avatarType) {
            throw new Error(errorStrings.NO_AVATAR_TYPE_ERROR);
        }
        var size = fs.statSync(opts.avatarFilePath).size;
        var name = path.basename(opts.avatarFilePath);
        var options = {
            method: 'POST',
            json: true,
            followAllRedirects: true,
            uri: this.jiraClient.buildURL('/avatar/' + opts.avatarType + '/temporary'),
            headers: {
                "X-Atlassian-Token": "no-check"
            },
            qs: {
                filename: name,
                size: size
            },
            formData: {
                file: fs.createReadStream(opts.avatarFilePath)
            }
        };
        delete options.body;

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Updates the cropping instructions of the temporary avatar.  This function doesn't seem to work the way the Jira
     * API describes, so for now just don't use it.
     *
     * @method cropTemporaryAvatar
     * @memberOf AvatarClient#
     * @param {Object} opts The options to be used in the API request.
     * @param {string} opts.avatarType The avatar type.  May be 'project' or 'user'.
     * @param {Object} opts.crop See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3316}
     * @param [callback] Called when the avatar has been cropped.
     * @return {Promise} Resolved when the avatar has been cropped.
     */
    this.cropTemporaryAvatar = function (opts, callback) {
        if (!opts.avatarType) {
            throw new Error(errorStrings.NO_AVATAR_TYPE_ERROR);
        }

        var options = {
            method: 'POST',
            json: true,
            followAllRedirects: true,
            uri: this.jiraClient.buildURL('/avatar/' + opts.avatarType + '/temporaryCrop'),
            headers: {
                "X-Atlassian-Token": "no-check"
            },
            body: opts.crop
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}