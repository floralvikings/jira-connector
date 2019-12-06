'use strict';

module.exports = LabelsClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/1.0/labels' and '/rest/api/2/label'
 * @param {JiraClient} jiraClient
 * @constructor LabelsClient
 */
function LabelsClient(jiraClient) {
  this.jiraClient = jiraClient;

  /**
   * Use this method to retrieve all the available labels
   * e.g if you create an issue and you have to fill the labels field, use this method to get all the available values
   *
   * @method getLabels
   * @memberOf LabelsClient#
   * @param {Object} opts The request options sent to the Jira API.
   * @param {string} opts.query Used for filter labels
   * @param {callback} [callback] Called when labels are retrieved
   * @return {Promise} Resolved when labels are retrieved
   */
  this.getLabels = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/labels/suggest?query=' + opts.query, '1.0'),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Returns a paginated list of labels.
   * 
   * @method getAllLabels
   * @memberOf LabelsClient#
   * @param {Object} [opts]
   * @param {number} [opts.startAt] The index of the first item to return in a page of results (page offset).
   * @param {number} [opts.maxResults] The maximum number of items to return per page.
   * @param {callback} [callback] Called when labels are retrieved
   * @return {Promise} Resolved when labels are retrieved
   */
  this.getAllLabels = function (opts, callback) {
    opts = opts || {};

    var options = {
      uri: this.jiraClient.buildURL('/label'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };
}
