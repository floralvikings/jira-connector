"use strict";

module.exports = ReindexClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/reindex'
 *
 * @param {JiraClient} jiraClient
 * @constructor ReindexClient
 */
function ReindexClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Kicks off a reindex. Need Admin permissions to perform this reindex.
     *
     * @method doReindex
     * @memberOf ReindexClient#
     * @param opts The request options sent to the Jira API.
     * @param {string} [opts.type] Case insensitive String indicating type of reindex. If omitted, then defaults to
     *     BACKGROUND_PREFERRED
     * @param {boolean} [opts.indexComments=false] Indicates that comments should also be reindexed. Not relevant for
     *     foreground reindex, where comments are always reindexed.
     * @param {boolean} [opts.indexChangeHistory=false] Indicates that changeHistory should also be reindexed. Not
     *     relevant for foreground reindex, where changeHistory is always reindexed.
     * @param [callback] Called when the reindex has been started.
     * @return {Promise} Resolved when the reindex has been started.
     */
    this.doReindex = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/reindex'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            qs: {
                type: opts.type,
                indexComments: opts.indexComments,
                indexChangeHistory: opts.indexChangeHistory
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Gets information on the system reindexes. If a reindex is currently taking place then information about this
     * reindex is returned. If there is no active index task, then returns information about the latest reindex task
     * run, otherwise returns a 404 indicating that no reindex has taken place.
     *
     * @method getReindex
     * @memberOf ReindexClient#
     * @param opts The request options sent to the Jira API.
     * @param [opts.taskId] The id of an indexing task you wish to obtain details on. If omitted, then defaults to the
     *     standard behaviour and returns information on the active reindex task, or the last task to run if no reindex
     *     is taking place. . If there is no reindexing task with that id then a 404 is returned.
     * @param [callback] Called when the reindex data has been retrieved.
     * @return {Promise} Resolved when the reindex data has been retrieved.
     */
    this.getReindex = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/reindex'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                taskId: opts.taskId
            }
        };

        return this.jiraClient.makeRequest(options, callback);
    }
}