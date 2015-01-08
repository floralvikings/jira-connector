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
     * @param callback Called when the reindex has been started.
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

        this.jiraClient.makeRequest(options, callback);
    };
}