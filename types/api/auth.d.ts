import JiraClient from '../index';
import { Callback } from '../callback';

type LoginOptions = {
    /**
     * The name of the user to login.
     */
    username: string,
    /**
     * The password of the user.
     */
    password: string
}

export class AuthClient {
    jiraClient: JiraClient;

    constructor(jiraClient: JiraClient)

    /**
     * Logs the current user out of JIRA, destroying the existing session, if any.
     *
     * @method logout
     * @memberOf Auth#
     * @param callback Called when the user has been logged out.
     * @return {Promise} Resolved when the user has been logged out.
     */
    logout(callback: Callback<any>): Promise<any>

    /**
     * Creates a new session for a user in JIRA.
     *
     * @method login
     * @memberOf Auth#
     * @param opts The request options sent to the Jira API
     * @param callback Called when the user has been logged in.
     * @return Promise Resolved when the user has been logged in.
     */
    login(opts: LoginOptions, callback: Callback<any>): Promise<any>

    /**
     * Get current User. Returns information about the currently authenticated user's session.
     *
     * @method currentUser
     * @memberOf Auth#
     * @param callback Called when the current user has been retrieved.
     * @return {Promise} Resolved when the user has been retrieved.
     */
    currentUser(callback: Callback<any>): Promise<any>
}
