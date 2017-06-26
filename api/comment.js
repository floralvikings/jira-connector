"use strict";

var errorStrings = require('./../lib/error');

module.exports = CommentClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/comment'
 * @constructor CommentClient
 * @param {JiraClient} jiraClient
 */
function CommentClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Returns the keys of all properties for the comment identified by the key or by the id.
     *
     * @method getCommentPropertyKeys
     * @memberOf CommentClient#
     * @param opts The options passed in the request to the API.
     * @param opts.commentId The id of the comment from which keys will be returned.
     * @param [callback] Called when the keys have been retrieved.
     * @return {Promise} Resolved when the keys have been retrieved.
     */
    this.getCommentPropertyKeys = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Sets the value of the specified comment's property.
     *
     * You can use this resource to store a custom data against the comment identified by the key or by the id. The
     * user who stores the data is required to have permissions to administer the comment.
     *
     * @method setCommentProperty
     * @memberOf CommentClient#
     * @param opts The options passed in the request to the API.
     * @param opts.commentId The id of the comment from which keys will be returned.
     * @param opts.propertyKey The key of the property to be edited.
     * @param opts.propertyValue The new value of the property.
     * @param [callback] Called when the property has been edited.
     * @return {Promise} Resolved when the property has been edited.
     */
    this.setCommentProperty = function (opts, callback) {
        if (!opts.propertyKey) {
            throw new Error(errorStrings.NO_COMMENT_PROPERTY_KEY_ERROR);
        } else if (!opts.propertyValue) {
            throw new Error(errorStrings.NO_COMMENT_PROPERTY_VALUE_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/' + opts.propertyKey, 'PUT', opts.propertyValue);
        return this.jiraClient.makeRequest(options, callback, 'Property Edited');
    };

    /**
     * Returns the value of the property with a given key from the comment identified by the key or by the id. The user
     * who retrieves the property is required to have permissions to read the comment.
     *
     * @method getCommentProperty
     * @memberOf CommentClient#
     * @param opts The options passed in the request to the API.
     * @param opts.commentId The id of the comment from which keys will be returned.
     * @param opts.propertyKey The key of the property to be edited.
     * @param [callback] Called when the property has been retrieved.
     * @return {Promise} Resolved when the property has been retrieved.
     */
    this.getCommentProperty = function (opts, callback) {
        if (!opts.propertyKey) {
            throw new Error(errorStrings.NO_COMMENT_PROPERTY_KEY_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/' + opts.propertyKey, 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Removes the property from the comment identified by the key or by the id. Ths user removing the property is
     * required to have permissions to administer the comment.
     *
     * @method deleteCommentProperty
     * @memberOf CommentClient#
     * @param opts The options passed in the request to the API.
     * @param opts.commentId The id of the comment from which keys will be returned.
     * @param opts.propertyKey The key of the property to be edited.
     * @param [callback] Called when the property has been retrieved.
     * @return {Promise} Resolved when the property has been retrieved.
     */
    this.deleteCommentProperty = function (opts, callback) {
        if (!opts.propertyKey) {
            throw new Error(errorStrings.NO_COMMENT_PROPERTY_KEY_ERROR);
        }
        var options = this.buildRequestOptions(opts, '/' + opts.propertyKey, 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Comment property deleted');
    };

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @memberOf CommentClient#
     * @param {Object} opts The arguments passed to the method.
     * @param {string} path The path of the endpoint following /issue/{idOrKey}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        if (!opts.commentId) {
            throw new Error(errorStrings.NO_COMMENT_ID);
        }
        var basePath = '/comment/' + opts.commentId + "/properties";
        if (!qs) qs = {};
        if (!body) body = {};

        if (opts.fields) {
            qs.fields = '';
            opts.fields.forEach(function (field) {
                qs.fields += field + ','
            });
        }

        if (opts.expand) {
            qs.expand = '';
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
        }

        return {
            uri: this.jiraClient.buildURL(basePath + path),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    }
}