'use strict';

module.exports = LabelsClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/1.0/labels'
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
   * @param opts The request options sent to the Jira API.
   * @param opts.query Used for filter labels
   * @param [callback] Called when labels are retrieved
   * @return {Promise} Resolved when labels are retrieved
   */
  this.getLabels = function(opts, callback) {
    var options = {
      uri: this.jiraClient.buildURL('/labels/suggest?query=' + opts.query, '1.0'),
      method: 'GET',
      json: true,
      followAllRedirects: true
    };

    return this.jiraClient.makeRequest(options, callback);
  };
}
