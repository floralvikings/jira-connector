"use strict";

module.exports = ScreensClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/screens'
 *
 * @param {JiraClient} jiraClient
 * @constructor ScreensClient
 */
function ScreensClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Gets available fields for screen. i.e ones that haven't already been added.
     *
     * @method getAvailableFields
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to Jira
     * @param {number} opts.screenId The id of the screen to retrieve.
     * @param [callback] Called when the available fields have been retrieved
     * @return {Promise} Resolved when the available fields have been retrieved
     */
    this.getAvailableFields = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/availableFields', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Returns a list of all tabs for the given screen.
     *
     * @method getTabs
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to Jira
     * @param {number} opts.screenId The id of the screen to retrieve.
     * @param [callback] Called when the tabs have been retrieved.
     * @return {Promise} Resolved when the tabs have been retrieved.
     */
    this.getTabs = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Creates tab for given screen
     *
     * @method createTab
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to Jira
     * @param {number} opts.screenId The id of the screen in which to create a tab.
     * @param {string} opts.name The name of the tab to add.  Minimum required to create a tab.
     * @param [callback] Called when the tab has been created.
     * @return {Promise} Resolved when the tab has been created.
     */
    this.createTab = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs', 'POST', {name: opts.name});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Renames the given tab on the given screen.
     *
     * @method renameTab
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to the jira API
     * @param {number} opts.screenId The id of the screen containing the tab to rename.
     * @param {number} opts.tabId The id of the tab to rename
     * @param {string} opts.name The new name of the tab.
     * @param [callback] Called when data has been retrieved
     * @return {Promise} Resolved when data has been retrieved
     */
    this.renameTab = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs/' + opts.tabId, 'PUT', {name: opts.name});
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Deletes the given tab from the given screen.
     *
     * @method deleteTab
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to the jira API
     * @param {number} opts.screenId The id of the screen containing the tab to delete.
     * @param {number} opts.tabId The id of the tab to delete
     * @param [callback] Called when data has been retrieved
     * @return {Promise} Resolved when data has been retrieved
     */
    this.deleteTab = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs/' + opts.tabId, 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Tab Deleted');
    };

    /**
     * Adds field to the given tab
     *
     * @method addFieldToTab
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.screenId The id of the screen containing the tab.
     * @param {number} opts.tabId the id of the tab to which the fields will be added.
     * @param {string} opts.fieldId The field to add
     * @param [callback] Called when the fields have been added to the tab.
     * @return {Promise} Resolved when the fields have been added to the tab.
     */
    this.addFieldToTab = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs/' + opts.tabId + '/fields', 'POST', opts.fieldId);
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Gets all fields for a given tab.
     *
     * @method getFieldsInTab
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.screenId The id of the screen containing the tab.
     * @param {number} opts.tabId the id of the tab for which to retrieve fields.
     * @param [callback] Called when the fields have been retrieved.
     * @return {Promise} Resolved when the fields have been retrieved.
     */
    this.getFieldsInTab = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs/' + opts.tabId + '/fields', 'GET');
        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Remove the given field from the given tab.
     *
     * @method removeFieldFromTab
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.screenId The id of the screen containing the tab.
     * @param {number} opts.tabId the id of the tab from which to remove the field.
     * @param {string} opts.fieldId The id of the field to remove from the tab.
     * @param [callback] Called when the field has been removed.
     * @return {Promise} Resolved when the field has been removed.
     */
    this.removeFieldFromTab = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs/' + opts.tabId + '/fields/' + opts.fieldId, 'DELETE');
        return this.jiraClient.makeRequest(options, callback, 'Field Removed From Tab');
    };

    /**
     * Move the given field on the given tab
     *
     * @method moveFieldOnTab
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to the Jira API
     * @param {number} opts.screenId The id of the screen containing the tab.
     * @param {number} opts.tabId the id of the tab containing the field.
     * @param {string} opts.fieldId The id of the field to remove from the tab.
     * @param {number} opts.newPosition The position to which the field should be moved.  May be one of:
     *  * Earlier
     *  * Later
     *  * First
     *  * Last
     * @param [callback] Called when the field has been removed.
     * @return {Promise} Resolved when the field has been removed.
     */
    this.moveFieldOnTab = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs/' + opts.tabId + '/fields/' + opts.fieldId + '/move',
            'POST', {position: opts.newPosition});
        return this.jiraClient.makeRequest(options, callback, 'Field Moved');
    };

    /**
     * Moves tab position
     *
     * @method moveTabPosition
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {number} opts.screenId The id of the screen containing the tab.
     * @param {number} opts.tabId the id of the tab to move.
     * @param {number} opts.newPosition The new (zero-indexed) position of the tab.
     * @param [callback] Called when the tab has been moved.
     * @return {Promise} Resolved when the tab has been moved.
     */
    this.moveTabPosition = function (opts, callback) {
        var options = this.buildRequestOptions(opts, '/tabs/' + opts.tabId + '/move/' + opts.newPosition, 'POST');
        return this.jiraClient.makeRequest(options, callback, 'Tab Moved');
    };

    /**
     * Adds field or custom field to the default tab
     *
     * @method addFieldToDefaultTab
     * @memberOf ScreensClient#
     * @param {Object} opts The request options sent to the Jira API.
     * @param {string} opts.fieldId The id of the field to add to the default tab.
     * @param [callback] Called when the tab has been moved.
     * @return {Promise} Resolved when the tab has been moved.
     */
    this.addFieldToDefaultTab = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/screens/addToDefault/' + opts.fieldId),
            method: 'POST',
            json: true,
            followAllRedirects: true
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @memberOf FilterClient#
     * @param {Object} opts The arguments passed to the method.
     * @param {number} opts.screenId The id of the screen to use in the path.
     * @param {Array} [opts.fields] The fields to include
     * @param {Array} [opts.expand] The fields to expand
     * @param {string} path The path of the endpoint following /screen/{id}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        var basePath = '/screens/' + opts.screenId;
        if (!qs) qs = {};
        if (!body) body = {};

        if (opts.fields) {
            qs.fields = '';
            opts.fields.forEach(function (field) {
                qs.fields += field + ','
            });
            qs.fields = qs.fields.slice(0, -1);
        }

        if (opts.expand) {
            qs.expand = '';
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
            qs.expand = qs.expand.slice(0, -1);
        }

        return {
            uri: this.jiraClient.buildURL(basePath + path),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    };
}