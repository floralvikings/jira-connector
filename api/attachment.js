"use strict";

var errorStrings = require('./../lib/error');

module.exports = AttachmentClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/atachment'
 *
 * @constructor AttachmentClient
 * @param {JiraClient} jiraClient
 */
function AttachmentClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns the meta-data for an attachment, including the URI of the actual attached file.
     *
     * @method getAttachment
     * @memberOf AttachmentClient#
     * @param opts The options for the API request.
     * @param opts.attachmentId The id of the attachment to retrieve
     * @param [callback] Called when the attachment metadata is retrieved.
     * @return {Promise} Resolved when the attachment metadata is retrieved.
     */
    this.getAttachment = function (opts, callback) {
        if (!opts.attachmentId) {
            throw new Error(errorStrings.NO_ATTACHMENT_ID_ERROR);
        }

        var options = {
            uri: this.jiraClient.buildURL('/attachment/' + opts.attachmentId),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Remove an attachment from an issue.
     *
     * @method deleteAttachment
     * @memberOf AttachmentClient#
     * @param opts The options for the API request.
     * @param opts.attachmentId The id of the attachment to delete
     * @param [callback] Called when the attachment is deleted.
     * @return {Promise} Resolved when the attachment is deleted.
     */
    this.deleteAttachment = function (opts, callback) {
        if (!opts.attachmentId) {
            throw new Error(errorStrings.NO_ATTACHMENT_ID_ERROR);
        }

        var options = {
            uri: this.jiraClient.buildURL('/attachment/' + opts.attachmentId),
            method: 'DELETE',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback, 'Attachment Deleted');
    };


    /**
     * Returns the meta informations for an attachments, specifically if they are enabled and the maximum upload size
     * allowed.
     *
     * @method getGlobalAttachmentMetadata
     * @memberOf AttachmentClient#
     * @param opts This API request actually takes no options; this parameter is ignored.
     * @param [callback] Called when the metadata is retrieved.
     * @return {Promise} Resolved when the metadata is retrieved.
     */
    this.getGlobalAttachmentMetadata = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/attachment/meta'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };
}