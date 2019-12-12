import JiraClient from '../index'
import { Callback } from '../callback';

type GetOptions = {
    /**
     * The number of record from which search starts
     */
    offset: number,
    /**
     * Maximum number of returned results (if is limit is <= 0 or > 1000, it will be set to default 
     * value: 1000)
     */
    limit: number,
    /**
     * Text query; each record that will be returned must contain the provided text in one of its fields
     */
    filter: any,
    /**
     * Timestamp in past; `from` must be less than or equal to `to`, otherwise the result set will be empty.  
     * Only records that where created in the same moment or after the `from` timestamp will be provided 
     * in response
     */
    from: number,
    /**
     * Timestamp in past; `from` must be less than or equal to `to`, otherwise the result set will be empty.  
     * Only records that where created in the same moment or earlier the `to` timestamp will be provided 
     * in response
     */
    to: number
}

type CreateOptions = {
    /**
     * See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2557}
     */
    audit: any
}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/auditing'
 * @param {JiraClient} jiraClient
 * @constructor AuditingClient
 */
export class AuditingClient {
    jiraClient: JiraClient
    
    constructor(
        jiraClient: JiraClient
    )

    /**
     * Returns auditing records filtered using provided parameters
     *
     * @method getAudits
     * @memberOf AuditingClient#
     * @param opts The filtering options for retrieving audits.
     * @param callback Called when the audits are retrieved.
     * @return {Promise} Resolved when the audits are retrieved.
     */
    getAudits(opts: GetOptions, callback: Callback<any>): Promise<any>

    /**
     *
     * @method createAudit
     * @memberOf AuditingClient#
     * @param opts The request options.
     * @param callback Called when the audit is created.
     * @return {Promise} Resolved when the audit is created.
     */
    createAudit(opts: CreateOptions, callback: Callback<any>): Promise<any>
}