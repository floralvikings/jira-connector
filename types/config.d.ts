export interface Config {
  /**
   * The hostname of the Jira API.
   */
  host: string;
  /**
   * The port number used to connect to Jira.
   */
  port?: number;

  /**
   * Request timeout (milliseconds).
   */
  timeout?: number;

  /**
   * The protocol used to accses the Jira API.
   */
  protocol?: string;
  /**
   * The prefix to use in front of the path, if Jira isn't at "/"
   */
  path_prefix?: string;
  /**
   * It is recommended not to turn it off for no reason (https://github.com/request/request/issues/251).
   */
  strictSSL?: boolean;
  /**
   * The version of the Jira API to which you will be connecting.  Currently, only 
   * version 2 is supported.
   */
  version?: number;
  /**
   * The authentication information used tp connect to Jira. Must contain EITHER username and password 
   * OR oauth information.  Oauth information will be used over username/password authentication.
   */
  basic_auth?: {
    /**
     * The email of the user that will be authenticated. MUST be included 
     * if using email and api_token authentication.
     */
    email?: string;
    /**
     * The api token of the user that will be authenticated. MUST be included 
     * if using email and api_token authentication.
     */
    api_token?: string;
    /**
     * @deprecated
     * The username of the user that will be authenticated. MUST be included 
     * if using username and password authentication.
     */
    username?: string;
    /**
     * @deprecated
     * The password of the user that will be authenticated. MUST be included 
     * if using username and password authentication.
     */
    password?: string;
    /**
     * Base64 that contains email:api_token.
     */
    base64?: string;
  };
  oauth?: {
    /**
     * The consumer key used in the Jira Application Link for oauth 
     * authentication.  MUST be included if using OAuth.
     */
    consumer_key: string;
    /**
     * The private key used for OAuth security. MUST be included if using OAuth.
     */
    private_key: string;
    /**
     * The VERIFIED token used to connect to the Jira API.  MUST be included if using
     * OAuth.
     */
    token: string;
    /**
     * The secret for the above token. MUST be included if using Oauth.
     */
    token_secret: string;
  };
  /**
   * The CookieJar to use for every requests.
   */
  cookie_jar?: any;
  /**
   * Any function (constructor) compatible with Promise (bluebird, Q,...). 
   * Default - native Promise.
   */
  promise?: PromiseLike<any>;
  /**
   * Any function (constructor) compatible with Request (request, supertest,...). 
   * Default - require('request').
   */
  request?: any;
  rejectUnauthorized?: any;
}
