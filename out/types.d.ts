/**
 * Used to access Jira REST endpoints in '/rest/api/2/application-properties'
 * @constructor ApplicationPropertiesClient
 * @param {JiraClient} jiraClient
 */
declare class ApplicationPropertiesClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/application-properties'
    * @constructor ApplicationPropertiesClient
    * @param {JiraClient} jiraClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Gets an application property.
    * @method getProperties
    * @memberOf ApplicationPropertiesClient#
    * @param [opts] The options used to make the request.
    * @param [opts.key] A String containing the property key.
    * @param [opts.permissionLevel] When fetching a list specifies the permission level of all items in the list.
    * @param [opts.keyFilter] When fetching a list allows the list to be filtered by the property's start of key e.g.
    *     "jira.lf.*" whould fetch only those permissions that are editable and whose keys start with "jira.lf.". This
    *     is a regex
    * @param [callback] Called when the properties are retrieved.
    * @return {Promise} Resolved when the properties are retrieved.
    */
   getProperties(opts?: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/atachment'
 *
 * @constructor AttachmentClient
 * @param {JiraClient} jiraClient
 */
declare class AttachmentClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/atachment'
    *
    * @constructor AttachmentClient
    * @param {JiraClient} jiraClient
    */
   constructor(jiraClient: JiraClient);

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
   getAttachment(opts: any, callback?: any): Promise;

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
   deleteAttachment(opts: any, callback?: any): Promise;

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
   getGlobalAttachmentMetadata(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/auditing'
 * @param {JiraClient} jiraClient
 * @constructor AuditingClient
 */
declare class AuditingClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/auditing'
    * @param {JiraClient} jiraClient
    * @constructor AuditingClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns auditing records filtered using provided parameters
    *
    * @method getAudits
    * @memberOf AuditingClient#
    * @param opts The filtering options for retrieving audits.
    * @param [opts.offset] The number of record from which search starts
    * @param [opts.limit] Maximum number of returned results (if is limit is <= 0 or > 1000, it will be set do default
    *     value: 1000)
    * @param [opts.filter] Text query; each record that will be returned must contain the provided text in one of its
    *     fields
    * @param [opts.from] Timestamp in past; 'from' must be less or equal 'to', otherwise the result set will be empty
    *     only records that where created in the same moment or after the 'from' timestamp will be provided in
    *     response
    * @param [opts.to] Timestamp in past; 'from' must be less or equal 'to', otherwise the result set will be empty
    *     only records that where created in the same moment or earlier than the 'to' timestamp will be provided in
    *     response
    * @param [callback] Called when the audits are retrieved.
    * @return {Promise} Resolved when the audits are retrieved.
    */
   getAudits(opts: any, callback?: any): Promise;

   /**
    *
    * @method createAudit
    * @memberOf AuditingClient#
    * @param opts The request options.
    * @param opts.audit See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2557}
    * @param [callback] Called when the audit is created.
    * @return {Promise} Resolved when the audit is created.
    */
   createAudit(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/auth/1/session'
 *
 * @param {JiraClient} jiraClient
 * @constructor UserClient
 */
declare class UserClient {
   /**
    * Used to access Jira REST endpoints in '/rest/auth/1/session'
    *
    * @param {JiraClient} jiraClient
    * @constructor UserClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Get a user. This resource cannot be accessed anonymously.
    *
    * @method getUser
    * @memberOf UserClient#
    * @param opts The request options sent to the Jira API
    * @param opts.username The name of the user to retrieve.
    * @param opts.userKey The key of the user to retrieve.
    * @param {Object} opts.expand The fields to be expanded.
    * @param [callback] Called when the user has been retrieved.
    * @return {Promise} Resolved when the user has been retrieved.
    */
   getUser(opts: any, callback?: any): Promise;

   /**
    * Removes user.
    *
    * @method deleteUser
    * @memberOf UserClient#
    * @param opts The request options sent to the Jira API
    * @param opts.username The name of the user to delete.
    * @param opts.userKey The key of the user to delete.
    * @param [callback] Called when the user has been deleted.
    * @return {Promise} Resolved when the user has been deleted.
    */
   deleteUser(opts: any, callback?: any): Promise;

   /**
    * Create user. By default created user will not be notified with email. If password field is not set then password
    * will be randomly generated.
    *
    * @method createUser
    * @memberOf UserClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.user See {@link https://docs.atlassian.com/jira/REST/latest/#d2e4049}
    * @param [callback] Called when the user has been created.
    * @return {Promise} Resolved when the user has been created.
    */
   createUser(opts: any, callback?: any): Promise;

   /**
    * Modify user. The "value" fields present will override the existing value. Fields skipped in request will not be
    * changed.
    *
    * @method editUser
    * @memberOf UserClient#
    * @param opts The request options sent to the Jira API
    * @param opts.user See {@link https://docs.atlassian.com/jira/REST/latest/#d2e4081}
    * @param opts.username The name of the user to edit.
    * @param opts.userKey The key of the user to edit.
    * @param [callback] Called when the user has been edited.
    * @return {Promise} Resolved when the user has been edited.
    */
   editUser(opts: any, callback?: any): Promise;

   /**
    * Returns a list of users that match the search string and can be assigned issues for all the given projects. This
    * resource cannot be accessed anonymously.
    *
    * @method multiProjectSearchAssignable
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The name of the user to search.
    * @param {Array} opts.projectKeys The keys of the projects we are finding assignable users for
    * @param {number} [opts.startAt] The index of the first user to return (0-based)
    * @param {number} [opts.maxResults] The maximum number of users to return (defaults to 50). The maximum allowed
    *     value is 1000. If you specify a value that is higher than this number, your search results will be
    *     truncated.
    * @param [callback] Called when the search results have been retrieved.
    * @return {Promise} Resolved when the search results have been retrieved.
    */
   multiProjectSearchAssignable(opts: { username: string, projectKeys: Array, startAt: number, maxResults: number }, callback?: any): Promise;

   /**
    * Returns a list of users that match the search string. This resource cannot be accessed anonymously. Please note
    * that this resource should be called with an issue key when a list of assignable users is retrieved for editing.
    * For create only a project key should be supplied. The list of assignable users may be incorrect if it's called
    * with the project key for editing.
    *
    * @method searchAssignable
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The username
    * @param {string} opts.project The key of the project we are finding assignable users for
    * @param {string} [opts.issueKey] The issue key for the issue being edited we need to find assignable users for.
    * @param {number} [opts.startAt] The index of the first user to return (0-based)
    * @param {number} [opts.maxResults] The maximum number of users to return (defaults to 50). The maximum allowed
    *     value is 1000. If you specify a value that is higher than this number, your search results will be
    *     truncated.
    * @param {number} [opts.actionDescriptorId]
    * @param [callback] Called when the search results have been retrieved.
    * @return {Promise} Resolved when the search results have been retrieved.
    */
   searchAssignable(opts: { username: string, project: string, issueKey: string, startAt: number, maxResults: number, actionDescriptorId: number }, callback?: any): Promise;

   /**
    * Creates temporary avatar. Creating a temporary avatar is part of a 3-step process in uploading a new avatar for
    * a user: upload, crop, confirm.
    *
    * @method createTemporaryAvatar
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The username
    * @param {string} opts.filepath The path to the file to upload.
    * @param [callback] Called when the temporary avatar has been uploaded.
    * @return {Promise} Resolved when the temporary avatar has been uploaded.
    */
   createTemporaryAvatar(opts: { username: string, filepath: string }, callback?: any): Promise;

   /**
    * Converts temporary avatar into a real avatar
    *
    * @method convertTemporaryAvatar
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The username
    * @param {Object} opts.avatarId The id of the temporary avatar to convert.
    * @param [callback] Called when the avatar has been converted
    * @return {Promise} Resolved when the avatar has been converted
    */
   convertTemporaryAvatar(opts: { username: string, avatarId: Object }, callback?: any): Promise;

   /**
    * Deletes avatar
    *
    * @method deleteAvatar
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The username
    * @param {Object} opts.avatarId The id of the temporary avatar to delete.
    * @param [callback] Called when the avatar has been deleted.
    * @return {Promise} Resolved when the avatar has been deleted.
    */
   deleteAvatar(opts: { username: string, avatarId: Object }, callback?: any): Promise;

   /**
    * Returns all avatars which are visible for the currently logged in user.
    *
    * @method getAvatars
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The username
    * @param [callback] Called when the avatars have been retrieved.
    * @return {Promise} Resolved when the avatars have been retrieved.
    */
   getAvatars(opts: { username: string }, callback?: any): Promise;

   /**
    * Returns the default columns for the given user. Admin permission will be required to get columns for a user
    * other than the currently logged in user.
    *
    * @method getDefaultColumns
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The username
    * @param [callback] Called when the columns have been retrieved.
    * @return {Promise} Resolved when the columns have been retrieved.
    */
   getDefaultColumns(opts: { username: string }, callback?: any): Promise;

   /**
    * Sets the default columns for the given user. Admin permission will be required to get columns for a user other
    * than the currently logged in user.
    *
    * @method setDefaultColumns
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The username
    * @param {Array} opts.columns The names of the new columns.  See {@link
    *     https://docs.atlassian.com/jira/REST/latest/#d2e4566}
    * @param [callback] Called when the columns have been set.
    * @return {Promise} Resolved when the columns have been set.
    */
   setDefaultColumns(opts: { username: string, columns: Array }, callback?: any): Promise;

   /**
    * Reset the default columns for the given user to the system default. Admin permission will be required to get
    * columns for a user other than the currently logged in user.
    *
    * @method resetDefaultColumns
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.username The username
    * @param [callback] Called when the columns have been reset.
    * @return {Promise} Resolved when the columns have been reset.
    */
   resetDefaultColumns(opts: { username: string }, callback?: any): Promise;

   /**
    * Modify user password.
    *
    * @method changePassword
    * @memberOf UserClient#
    * @param opts The request options sent to the Jira API
    * @param opts.username The name of the user for which to change the password.
    * @param opts.userKey The key of the user for which to change the password.
    * @param opts.password The new password.
    * @param [callback] Called when the password has been set.
    * @return {Promise} Resolved when the password has been set.
    */
   changePassword(opts: any, callback?: any): Promise;

   /**
    * Returns a list of active users that match the search string and have all specified permissions for the project
    * or issue.
    *
    * This resource can be accessed by users with ADMINISTER_PROJECT permission for the project or global
    * ADMIN or SYSADMIN rights.
    *
    * @method searchPermissions
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the jira API
    * @param {string} opts.username The username filter, list includes all users if unspecified
    * @param {Array} opts.permissions Array of permissions for project or issue returned users must have, see
    *     [Permissions]{@link
    *     https://developer.atlassian.com/static/javadoc/jira/6.0/reference/com/atlassian/jira/security/Permissions.Permission.html}
    *     JavaDoc for the list of all possible permissions.
    * @param {string} [opts.issueKey] the issue key for the issue for which returned users have specified permissions.
    * @param {string} [opts.projectKey] the optional project key to search for users with if no issueKey is supplied.
    * @param {number} [opts.startAt] the index of the first user to return (0-based)
    * @param {number} [opts.maxResults] the maximum number of users to return (defaults to 50). The maximum allowed
    *     value is 1000. If you specify a value that is higher than this number, your search results will be
    *     truncated.
    * @param [callback] Called when the search results are retrieved.
    * @return {Promise} Resolved when the search results are retrieved.
    */
   searchPermissions(opts: { username: string, permissions: Array, issueKey: string, projectKey: string, startAt: number, maxResults: number }, callback?: any): Promise;

   /**
    * Returns a list of users matching query with highlighting. This resource cannot be accessed anonymously.
    *
    * @method searchPicker
    * @memberOf UserClient#
    * @param opts The request options sent to the Jira API.
    * @param {string} opts.query
    * @param {number} [opts.maxResults=50]
    * @param {boolean} [opts.showAvatar=false]
    * @param {string} [opts.exclude]
    * @param [callback] Called when the search results are retrieved.
    * @return {Promise} Resolved when the search results are retrieved.
    */
   searchPicker(opts: any, callback?: any): Promise;

   /**
    * Returns a list of users that match the search string. This resource cannot be accessed anonymously.
    *
    * @method search
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param {string} opts.username A query string used to search username, name or e-mail address
    * @param {number} [opts.startAt=0] the index of the first user to return (0-based)
    * @param {number} [opts.maxResults=50] the maximum number of users to return (defaults to 50). The maximum allowed
    *     value is 1000. If you specify a value that is higher than this number, your search results will be
    *     truncated.
    * @param {boolean} [opts.includeActive=true] If true, then active users are included in the results (default true)
    * @param {boolean} [opts.includeInactive=false] If true, then inactive users are included in the results (default
    *     false)
    * @param [callback] Called when the search results are retrieved.
    * @return {Promise} Resolved when the search results are retrieved.
    */
   search(opts: { username: string, startAt: number, maxResults: number, includeActive: boolean, includeInactive: boolean }, callback?: any): Promise;

   /**
    * Returns a list of active users that match the search string. This resource cannot be accessed anonymously. Given
    * an issue key this resource will provide a list of users that match the search string and have the browse issue
    * permission for the issue provided.
    *
    * @method viewIssueSearch
    * @memberOf UserClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param {string} opts.username A query string used to search username, name or e-mail address
    * @param {string} [opts.issueKey] the issue key for the issue being edited we need to find viewable users for.
    * @param {string} [opts.projectKey] the optional project key to search for users with if no issueKey is supplied.
    * @param {number} [opts.startAt=0] the index of the first user to return (0-based)
    * @param {number} [opts.maxResults=50] the maximum number of users to return (defaults to 50). The maximum allowed
    * @param [callback] Called when data has been retrieved
    * @return {Promise} Resolved when data has been retrieved
    */
   viewIssueSearch(opts: { username: string, issueKey: string, projectKey: string, startAt: number, maxResults: number }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/avatar'
 * @param {JiraClient} jiraClient
 * @constructor AvatarClient
 */
declare class AvatarClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/avatar'
    * @param {JiraClient} jiraClient
    * @constructor AvatarClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns all system avatars of the given type.
    *
    * @method getAvatars
    * @memberOf AvatarClient#
    * @param opts The options to be used in the API request.
    * @param opts.avatarType The avatar type.  May be 'project' or 'user'.
    * @param [callback] Called when the avatars are retrieved.
    * @return {Promise} Resolved when the avatars are retrieved.
    */
   getAvatars(opts: any, callback?: any): Promise;

   /**
    * Creates a temporary avatar.  This function doesn't seem to work the way the Jira API describes, so for now
    * just don't use it.
    *
    * @method createTemporaryAvatar
    * @memberOf AvatarClient#
    * @param opts The options to be used in the API request.
    * @param opts.avatarType The avatar type.  May be 'project' or 'user'.
    * @param opts.avatarFilename The name of the file being uploaded
    * @param opts.avatarFileSize The size of the file
    * @param opts.avatarFilePath The path to the avatar file.
    * @param [callback] Called when the avatar is created.
    * @return {Promise} Resolved when the avatar is created.
    */
   createTemporaryAvatar(opts: any, callback?: any): Promise;

   /**
    * Updates the cropping instructions of the temporary avatar.  This function doesn't seem to work the way the Jira
    * API describes, so for now just don't use it.
    *
    * @method cropTemporaryAvatar
    * @memberOf AvatarClient#
    * @param {Object} opts The options to be used in the API request.
    * @param {string} opts.avatarType The avatar type.  May be 'project' or 'user'.
    * @param {Object} opts.crop See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3316}
    * @param [callback] Called when the avatar has been cropped.
    * @return {Promise} Resolved when the avatar has been cropped.
    */
   cropTemporaryAvatar(opts: { avatarType: string, crop: Object }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/dashboard'
 * @param {JiraClient} jiraClient
 * @constructor AgileBoardClient
 */
declare class AgileBoardClient {
   /**
    * Used to access Jira REST endpoints in '/rest/agile/1.0/dashboard'
    * @param {JiraClient} jiraClient
    * @constructor AgileBoardClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Get a list of all dashboards, optionally filtering them.
    *
    * @method getAllBoards
    * @memberOf AgileBoardClient#
    * @param opts The request options to send to the Jira API
    * @param [opts.type] Limits returning boards of a specific type: `scrum` or `kanban`.
    * @param [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
    *     maxResults
    * @param [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
    *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
    *     provides, dues to lack or resources or any other condition. When this happens, your results will be
    *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
    *     being used.
    * @param [callback] Called when the dashboards have been retrieved.
    * @return {Promise} Resolved when the dashboards have been retrieved.
    */
   getAllBoards(opts: any, callback?: any): Promise;

   /**
    * Get a single agile board.
    *
    * @method getBoard
    * @memberOf AgileBoardClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.boardId The agile board id.
    * @param [callback] Called when the dashboard has been retrieved
    * @return {Promise} Resolved when the dashboard has been retrieved
    */
   getBoard(opts: any, callback?: any): Promise;

   /**
    * Get a list of all issues associated with an agile board
    *
    * @method getIssuesForBoard
    * @memberOf AgileBoardClient#
    * @param opts The request options to send to the Jira API
    * @param opts.boardId The agile board id.
    * @param [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
    *     maxResults
    * @param [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
    *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
    *     provides, dues to lack or resources or any other condition. When this happens, your results will be
    *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
    *     being used.
    * @param [callback] Called when the dashboards have been retrieved.
    * @return {Promise} Resolved when the dashboards have been retrieved.
    */
   getIssuesForBoard(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/comment'
 * @constructor CommentClient
 * @param {JiraClient} jiraClient
 */
declare class CommentClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/comment'
    * @constructor CommentClient
    * @param {JiraClient} jiraClient
    */
   constructor(jiraClient: JiraClient);

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
   getCommentPropertyKeys(opts: any, callback?: any): Promise;

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
   setCommentProperty(opts: any, callback?: any): Promise;

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
   getCommentProperty(opts: any, callback?: any): Promise;

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
   deleteCommentProperty(opts: any, callback?: any): Promise;

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
   private buildRequestOptions(opts: Object, path: string, method: string, body?: Object, qs?: Object): Object;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/component'
 *
 * @param {JiraClient} jiraClient
 * @constructor ComponentClient
 */
declare class ComponentClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/component'
    *
    * @param {JiraClient} jiraClient
    * @constructor ComponentClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Create a component via POST.
    *
    * @method createComponent
    * @memberOf ComponentClient#
    * @param opts The request options sent to the Jira API
    * @param opts.component See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3871}
    * @param [callback] Called when the component has been created.
    * @return {Promise} Resolved when the component has been created.
    */
   createComponent(opts: any, callback?: any): Promise;

   /**
    * Modify a component via PUT. Any fields present in the PUT will override existing values. As a convenience, if a
    * field is not present, it is silently ignored. If leadUserName is an empty string ("") the component lead will be
    * removed.
    *
    * @method editComponent
    * @memberOf ComponentClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.id The id of the component to edit.
    * @param opts.component The new data to place in the component.  See
    *      {@link https://docs.atlassian.com/jira/REST/latest/#d2e3939}
    * @param [callback] Called when the component has beed edited.
    * @return {Promise} Resolved when the component has beed edited.
    */
   editComponent(opts: any, callback?: any): Promise;

   /**
    * Get a project component.
    *
    * @method getComponent
    * @memberOf ComponentClient#
    * @param opts The options sent to the Jira API
    * @param opts.id The id of the component to edit.
    * @param [callback] Called when the component has been retrieved.
    * @return {Promise} Resolved when the component has been retrieved.
    */
   getComponent(opts: any, callback?: any): Promise;

   /**
    * Delete a project component.
    *
    * @method deleteComponent
    * @memberOf ComponentClient#
    * @param opts The options sent to the Jira API
    * @param opts.id The id of the component to edit.
    * @param [opts.moveIssuesTo] The new component applied to issues whose 'id' component will be deleted. If this
    *     value is null, then the 'id' component is simply removed from the related isues.
    * @param [callback] Called when the component has been deleted.
    * @return {Promise} Resolved when the component has been deleted.
    */
   deleteComponent(opts: any, callback?: any): Promise;

   /**
    * Get counts of issues related to this component.
    *
    * @method getRelatedIssueCounts
    * @memberOf ComponentClient#
    * @param opts The options sent to the Jira API
    * @param opts.id The id of the component to edit.
    * @param [callback] Called when the count has been retrieved.
    * @return {Promise} Resolved when the count has been retrieved.
    */
   getRelatedIssueCounts(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/customFieldOptions'
 *
 * @param {JiraClient} jiraClient
 * @constructor CustomFieldOptionClient
 */
declare class CustomFieldOptionClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/customFieldOptions'
    *
    * @param {JiraClient} jiraClient
    * @constructor CustomFieldOptionClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a full representation of the Custom Field Option that has the given id.
    *
    * @method getCustomFieldOption
    * @memberOf CustomFieldOptionClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.fieldOptionId A String containing an Custom Field Option id
    * @param [callback] Called when data has been retrieved
    * @return {Promise} Resolved when data has been retrieved
    */
   getCustomFieldOption(opts: { fieldOptionId: string }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/dashboard'
 * @param {JiraClient} jiraClient
 * @constructor DashboardClient
 */
declare class DashboardClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/dashboard'
    * @param {JiraClient} jiraClient
    * @constructor DashboardClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Get a list of all dashboards, optionally filtering them.
    *
    * @method getAllDashboards
    * @memberOf DashboardClient#
    * @param opts The request options to send to the Jira API
    * @param [opts.filter] An optional filter that is applied to the list of dashboards. Valid values include
    *     "favourite" for returning only favourite dashboards, and "my" for returning dashboards that are owned by the
    *     calling user.
    * @param [opts.startAt] The index of the first dashboard to return (0-based). must be 0 or a multiple of
    *     maxResults
    * @param [opts.maxResults] A hint as to the the maximum number of dashboards to return in each call. Note that the
    *     JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client
    *     provides, dues to lack or resources or any other condition. When this happens, your results will be
    *     truncated. Callers should always check the returned maxResults to determine the value that is effectively
    *     being used.
    * @param [callback] Called when the dashboards have been retrieved.
    * @return {Promise} Resolved when the dashboards have been retrieved.
    */
   getAllDashboards(opts: any, callback?: any): Promise;

   /**
    * Get a single dashboard.
    *
    * @method getDashboard
    * @memberOf DashboardClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.dashboardId The dashboard id.
    * @param [callback] Called when the dashboard has been retrieved
    * @return {Promise} Resolved when the dashboard has been retrieved
    */
   getDashboard(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/field'
 *
 * @param {JiraClient} jiraClient
 * @constructor FieldClient
 */
declare class FieldClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/field'
    *
    * @param {JiraClient} jiraClient
    * @constructor FieldClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of all fields, both System and Custom
    *
    * @method getAllFields
    * @memberOf FieldClient#
    * @param opts Ignored
    * @param [callback] Called when the fields have been retrieved.
    * @return {Promise} Resolved when the fields have been retrieved.
    */
   getAllFields(opts: any, callback?: any): Promise;

   /**
    * Creates a custom field using a definition (object encapsulating custom field data)
    *
    * @method createCustomField
    * @memberOf FieldClient#
    * @param opts The request options to send to Jira
    * @param opts.field See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3412}
    * @param [callback] Called when the custom field has been created.
    * @return {Promise} Resolved when the custom field has been created.
    */
   createCustomField(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/filter'
 *
 * @param {JiraClient} jiraClient
 * @constructor FilterClient
 */
declare class FilterClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/filter'
    *
    * @param {JiraClient} jiraClient
    * @constructor FilterClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Creates a new filter, and returns newly created filter. Currently sets permissions just using the users default
    * sharing permissions
    *
    * @method createFilter
    * @memberOf FilterClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {Array} [opts.expand] The parameters to expand.
    * @param {Object} opts.filter The filter to create.  See
    *      {@link https://docs.atlassian.com/jira/REST/latest/#d2e3347}
    * @param [callback] Called when the filter has been created.
    * @return {Promise} Resolved when the filter has been created.
    */
   createFilter(opts: { expand: Array, filter: Object }, callback?: any): Promise;

   /**
    * Returns a filter given an id
    *
    * @method getFilter
    * @memberOf FilterClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.filterId The id of the filter to retrieve
    * @param [callback] Called when the filter has been retrieved.
    * @return {Promise} Resolved when the filter has been retrieved.
    */
   getFilter(opts: { filterId: number }, callback?: any): Promise;

   /**
    * Updates an existing filter, and returns its new value.
    *
    * @method updateFilter
    * @memberOf FilterClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.filterId The id of the filter to update
    * @param {Object} opts.filter The new data for the filter.  See
    *      {@link https://docs.atlassian.com/jira/REST/latest/#d2e3401}
    * @param [callback] Called when the filter has been updated.
    * @return {Promise} Resolved when the filter has been updated.
    */
   updateFilter(opts: { filterId: number, filter: Object }, callback?: any): Promise;

   /**
    * Delete a filter.
    *
    * @method deleteFilter
    * @memberOf FilterClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.filterId The id of the filter to delete
    * @param [callback] Called when the filter has been deleted.
    * @return {Promise} Resolved when the filter has been deleted.
    */
   deleteFilter(opts: { filterId: number }, callback?: any): Promise;

   /**
    * Returns the default columns for the given filter. Currently logged in user will be used as the user making such
    * request.
    *
    * @method getFilterColumns
    * @memberOf FilterClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.filterId The id of the filter for which to retrieve columns.
    * @param [callback] Called when the columns have been retrieved.
    * @return {Promise} Resolved when the columns have been retrieved.
    */
   getFilterColumns(opts: { filterId: number }, callback?: any): Promise;

   /**
    * Sets the default columns for the given filter
    *
    * @method setFilterColumns
    * @memberOf FilterClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.filterId The id of the filter for which to update columns.
    * @param {Array} opts.columns The names of the new columns.
    *      See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3460}
    * @param [callback] Called when the columns have been set
    * @return {Promise} Resolved when the columns have been set
    */
   setFilterColumns(opts: { filterId: number, columns: Array }, callback?: any): Promise;

   /**
    * Resets the columns for the given filter such that the filter no longer has its own column config.
    *
    * @method resetFilterColumns
    * @memberOf FilterClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.filterId The id of the filter for which to reset columns.
    * @param [callback] Called when the columns have been reset.
    * @return {Promise} Resolved when the columns have been reset.
    */
   resetFilterColumns(opts: { filterId: number }, callback?: any): Promise;

   /**
    * Returns the default share scope of the logged-in user.
    *
    * @method getDefaultShareScore
    * @memberOf FilterClient#
    * @param opts Ignored.
    * @param [callback] Called when the default share scope has been retrieved.
    * @return {Promise} Resolved when the default share scope has been retrieved.
    */
   getDefaultShareScore(opts: any, callback?: any): Promise;

   /**
    * Sets the default share scope of the logged-in user.
    *
    * @method setDefaultShareScope
    * @memberOf FilterClient#
    * @param {Object} opts The request options sent to jira
    * @param {string} opts.scope The new default share scope. Available values are GLOBAL and PRIVATE.
    * @param [callback] Called when the default share scope has been set.
    * @return {Promise} Resolved when the default share scope has been set.
    */
   setDefaultShareScope(opts: { scope: string }, callback?: any): Promise;

   /**
    * Returns the favourite filters of the logged-in user.
    *
    * @method getFavouriteFilters
    * @memberOf FilterClient#
    * @param opts Ignored.
    * @param [callback] Called when the list of favourites has been retrieved.
    * @return {Promise} Resolved when the list of favourites has been retrieved.
    */
   getFavouriteFilters(opts: any, callback?: any): Promise;

   /**
    * Build out the request options necessary to make a particular API call.
    *
    * @private
    * @method buildRequestOptions
    * @memberOf FilterClient#
    * @param {Object} opts The arguments passed to the method.
    * @param {number} opts.filterId The id of the filter to use in the path.
    * @param {Array} [opts.fields] The fields to include
    * @param {Array} [opts.expand] The fields to expand
    * @param {string} path The path of the endpoint following /filter/{id}
    * @param {string} method The request method.
    * @param {Object} [body] The request body, if any.
    * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
    * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
    */
   private buildRequestOptions(opts: { filterId: number, fields: Array, expand: Array }, path: string, method: string, body?: Object, qs?: Object): Object;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/group'
 *
 * These are considered experimental according to the Jira Docs, use at your own risk.
 *
 * @param {JiraClient} jiraClient
 * @constructor GroupClient
 */
declare class GroupClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/group'
    *
    * These are considered experimental according to the Jira Docs, use at your own risk.
    *
    * @param {JiraClient} jiraClient
    * @constructor GroupClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Creates a group by given group parameter Returns REST representation for the requested group.
    *
    * @method createGroup
    * @memberOf GroupClient#
    * @param opts The request options sent to jira
    * @param opts.group The group to create.  See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2011}
    * @param [callback] Called when the group is created
    * @return {Promise} Resolved when the group is created
    */
   createGroup(opts: any, callback?: any): Promise;

   /**
    * Returns REST representation for the requested group. Allows to get list of active users belonging to the
    * specified group and its subgroups if "users" expand option is provided. You can page through users list by using
    * indexes in expand param. For example to get users from index 10 to index 15 use "users[10:15]" expand value.
    * This will return 6 users (if there are at least 16 users in this group). Indexes are 0-based and inclusive.
    *
    * @method getGroup
    * @memberOf GroupClient#
    * @param opts The request options sent to the Jira API
    * @param opts.groupName A name of requested group.
    * @param opts.expand Array of fields to expand. Currently only available expand is "users".
    * @param [callback] Called when the group is retrieved.
    * @return {Promise} Resolved when the group is retrieved.
    */
   getGroup(opts: any, callback?: any): Promise;

   /**
    * Adds given user to a group. Returns the current state of the group.
    *
    * @method addUserToGroup
    * @memberOf GroupClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.groupName A name of requested group.
    * @param {string} opts.userName The name of the user to add to the group.
    * @param [callback] Called when the user has been added to the group.
    * @return {Promise} Resolved when the user has been added to the group.
    */
   addUserToGroup(opts: { groupName: string, userName: string }, callback?: any): Promise;

   /**
    * Removes given user from a group. Returns no content
    *
    * @method removeUserFromGroup
    * @memberOf GroupClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.groupName A name of requested group.
    * @param {string} opts.userName The name of the user to add to the group.
    * @param [callback] Called when the user has been added to the group.
    * @return {Promise} Resolved when the user has been added to the group.
    */
   removeUserFromGroup(opts: { groupName: string, userName: string }, callback?: any): Promise;

   /**
    * Deletes a group by given group parameter. Returns no content
    *
    * @method deleteGroup
    * @memberOf GroupClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} opts.groupName A group to delete.
    * @param {string} [opts.swapGroup] A group to transfer visibility restrictions of the group that is being deleted
    * @param [callback] Called when the group has been deleted.
    * @return {Promise} Resolved when the group has been deleted.
    */
   deleteGroup(opts: { groupName: string, swapGroup: string }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/groupuserpicker'
 * @param {JiraClient} jiraClient
 * @constructor GroupUserPickerClient
 */
declare class GroupUserPickerClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/groupuserpicker'
    * @param {JiraClient} jiraClient
    * @constructor GroupUserPickerClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of users and groups matching query with highlighting. This resource cannot be accessed
    * anonymously.
    *
    * @method findUsersAndGroups
    * @memberOf GroupUserPickerClient#
    * @param {Object} opts The request options to send to the Jira API.
    * @param {string} opts.query A string used to search username, Name or e-mail address
    * @param {number} [opts.maxResults] the maximum number of users to return (defaults to 50). The maximum allowed
    *     value is 1000. If you specify a value that is higher than this number, your search results will be
    *     truncated.
    * @param {boolean} [opts.showAvatar] Whether to show the avatar
    * @param {string} [opts.fieldId] The custom field id, if this request comes from a custom field, such as a user
    *     picker. Optional.
    * @param {string} [opts.projectId] The list of project ids to further restrict the search This parameter can occur
    *     multiple times to pass in multiple project ids. Comma separated value is not supported. This parameter is
    *     only used when fieldId is present.
    * @param {string} [opts.issueTypeId] The list of issue type ids to further restrict the search. This parameter can
    *     occur multiple times to pass in multiple issue type ids. Comma separated value is not supported. Special
    *     values such as -1 (all standard issue types), -2 (all subtask issue types) are supported. This parameter is
    *     only used when fieldId is present.
    * @param [callback] Called when the search is completed.
    * @return {Promise} Resolved when the search is completed.
    */
   findUsersAndGroups(opts: { query: string, maxResults: number, showAvatar: boolean, fieldId: string, projectId: string, issueTypeId: string }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/groups'
 *
 * @param {JiraClient} jiraClient
 * @constructor GroupsClient
 */
declare class GroupsClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/groups'
    *
    * @param {JiraClient} jiraClient
    * @constructor GroupsClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns groups with substrings matching a given query. This is mainly for use with the group picker, so the
    * returned groups contain html to be used as picker suggestions. The groups are also wrapped in a single response
    * object that also contains a header for use in the picker, specifically Showing X of Y matching groups. The
    * number of groups returned is limited by the system property "jira.ajax.autocomplete.limit" The groups will be
    * unique and sorted.
    *
    * @method findGroups
    * @memberOf GroupsClient#
    * @param {Object} opts The request options to use in the Jira API.
    * @param {string} opts.query A string against which to match groups.  Leave this blank to return all groups.
    * @param {string} opts.exclude A string specifying groups to exclude.
    * @param {number} opts.maxResults The maximum number of results to return.
    * @param [callback] Called when the groups have been retrieved.
    * @return {Promise} Resolved when the groups have been retrieved.
    */
   findGroups(opts: { query: string, exclude: string, maxResults: number }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issue' and '/rest/agile/1.0/issue'
 * @constructor IssueClient
 * @param {JiraClient} jiraClient
 */
declare class IssueClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/issue' and '/rest/agile/1.0/issue'
    * @constructor IssueClient
    * @param {JiraClient} jiraClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns the estimation of the issue and a filedId of the field that is
    * used for it.  The boardId parameter is required, and determines which
    * field will be updated on an issue.
    *
    * @method getIssueEstimation
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this
    *        object must contain EITHER an issueId or issueKey property;
    *        issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of teh issue.  EX: JWR-3
    * @param {string} [opts.boardId] The id of the board required to
    *        determine which field is used for estimation.
    * @param [callback] Called when the issue estimation has been retrieved.
    * @return {Promise} Resolved when the issue estimation has been retrieved.
    */
   getIssueEstimation(opts: { issueId: string, issueKey: string, boardId: string }, callback?: any): Promise;

   /**
    * Updates the estimation of the issue.  The boardId parameter is required,
    * and determines which field will be updated on an issue.
    *
    * @method setIssueEstimation
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this
    *        object must contain EITHER an issueId or issueKey property;
    *        issueId will be used over issueKey if both are present.
    * @param {string} [opts.value] The value to set the issue estimation as.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of teh issue.  EX: JWR-3
    * @param {string} [opts.boardId] The id of the board required to
    *        determine which field is used for estimation.
    * @param [callback] Called when the issue estimation has been created.
    * @return {Promise} Resolved when the issue estimation has been created.
    */
   setIssueEstimation(opts: { value: string, issueId: string, issueKey: string, boardId: string }, callback?: any): Promise;

   /**
    * Moves (ranks) issues before or after a given issue.
    *
    * @method setIssueRanks
    * @memberOf IssueClient#
    * @param {Object} opts The options for the API request.
    * @param {Object} opts.data The ranking data in the form of PUT body to the
    *        Jira API.
    * @param [callback] Called when the issue rank has been created.
    * @return {Promise} Resolved when the issue rank has been created.
    */
   setIssueRanks(opts: { data: Object }, callback?: any): Promise;

   /**
    * Creates an issue or a sub-task from a JSON representation.
    *
    * The fields that can be set on create, in either the fields parameter or the update parameter can be determined
    * using the /rest/api/2/issue/createmeta resource. If a field is not configured to appear on the create screen,
    * then it will not be in the createmeta, and a field validation error will occur if it is submitted.
    *
    * Creating a sub-task is similar to creating a regular issue, with two important differences:
    *
    * * the issueType field must correspond to a sub-task issue type (you can use /issue/createmeta to discover
    * sub-task issue types), and
    * * you must provide a parent field in the issue create request containing the id or key of the parent issue.
    *
    * @method createIssue
    * @memberof IssueClient#
    * @param {Object} opts The options for the API request.
    * @param {Object} opts.data The issue data in the form of POST body to the JIRA API.
    * See {@link https://docs.atlassian.com/jira/REST/latest/#d2e398}
    * @param [callback] Called when the issue has been created.
    * @return {Promise} Resolved when the issue has been created.
    */
   createIssue(opts: { data: Object }, callback?: any): Promise;

   /**
    * Returns the meta data for creating issues. This includes the available projects, issue types and fields,
    * including field types and whether or not those fields are required. Projects will not be returned if the user
    * does not have permission to create issues in that project.
    *
    * The fields in the createmeta correspond to the fields in the create screen for the project/issuetype. Fields not
    * in the screen will not be in the createmeta.
    *
    * Fields will only be returned if ```expand=projects.issuetypes.fields.```
    *
    * The results can be filtered by project and/or issue type, given by the query params.
    *
    * @method getCreateMetadata
    * @memberOf IssueClient#
    * @param {Object} [opts] The options for the API request.
    * @param {string} [opts.projectIds] combined with the projectKeys param, lists the projects with which to filter
    *     the results. If absent, all projects are returned. This parameter can be specified multiple times, and/or be
    *     a comma-separated list. Specifiying a project that does not exist (or that you cannot create issues in) is
    *     not an error, but it will not be in the results.
    * @param {string} [opts.projectKeys] combined with the projectIds param, lists the projects with which to filter
    *     the results. If null, all projects are returned. This parameter can be specified multiple times, and/or be a
    *     comma-separated list. Specifiying a project that does not exist (or that you cannot create issues in) is not
    *     an error, but it will not be in the results.
    * @param {string} [opts.issuetypeIds] combinded with issuetypeNames, lists the issue types with which to filter
    *     the results. If null, all issue types are returned. This parameter can be specified multiple times, and/or
    *     be a comma-separated list. Specifiying an issue type that does not exist is not an error.
    * @param {string} [opts.issuetypeNames] combinded with issuetypeIds, lists the issue types with which to filter
    *     the results. If null, all issue types are returned. This parameter can be specified multiple times, but is
    *     NOT interpreted as a comma-separated list. Specifiying an issue type that does not exist is not an error.
    * @param {string} [opts.expand] in order to get expanded field descriptions, specify 'projects.issuetypes.fields' here.
    * @param [callback] Called when the metadata has been retrieved.
    * @return {Promise} Resolved when the metadata has been retrieved.
    */
   getCreateMetadata(opts?: { projectIds: string, projectKeys: string, issuetypeIds: string, issuetypeNames: string, expand: string }, callback?: any): Promise;

   /**
    * Creates issues or sub-tasks from a JSON representation.
    *
    * Creates many issues in one bulk operation.
    *
    * Creating a sub-task is similar to creating a regular issue. More details can be found in createIssue section:
    * {@link IssueResource#createIssue(IssueUpdateBean)}}
    *
    * @method bulkCreate
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.
    * @param {Array} opts.data issues See {@link https://docs.atlassian.com/jira/REST/latest/#d2e828}
    * @param [callback] Called when the issues have been created.
    * @return {Promise} Resolved when the issues have been created.
    */
   bulkCreate(opts: { data: Array }, callback?: any): Promise;

   /**
    * Returns a full representation of the issue for the given issue key.
    *
    * An issue JSON consists of the issue key, a collection of fields, a link to the workflow transition sub-resource,
    * and (optionally) the HTML rendered values of any fields that support it (e.g. if wiki syntax is enabled for the
    * description or comments).
    *
    * The fields param (which can be specified multiple times) gives a comma-separated list of fields to include in
    * the response. This can be used to retrieve a subset of fields. A particular field can be excluded by prefixing
    * it with a minus.
    *
    * By default, all (\*all) fields are returned in this get-issue resource. Note: the default is different when doing
    * a jql search -- the default there is just navigable fields (\*navigable).
    *
    * * \*all - include all fields
    * * \*navigable - include just navigable fields
    * * summary,comment - include just the summary and comments
    * * -comment - include everything except comments (the default is *all for get-issue)
    * * \*all,-comment - include everything except comments
    *
    * JIRA will attempt to identify the issue by the issueIdOrKey path parameter. This can be an issue id, or an issue
    * key. If the issue cannot be found via an exact match, JIRA will also look for the issue in a case-insensitive
    * way, or by looking to see if the issue was moved. In either of these cases, the request will proceed as normal
    * (a 302 or other redirect will not be returned). The issue key contained in the response will indicate the
    * current value of issue's key.
    *
    * @method getIssue
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {boolean} [opts.agile] Whether or not to call the agile version of this endpoint.  Defaults to false.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {Object} [opts.fields] See {@link https://docs.atlassian.com/jira/REST/latest/#d2e611}
    * @param {Object} [opts.expand] See {@link https://docs.atlassian.com/jira/REST/latest/#d2e611}
    * @param {Object} [opts.properties] See {@link https://docs.atlassian.com/jira/REST/latest/#d2e611}
    * @param [callback] Called when data has been retrieved
    * @return {Promise} Resolved when data has been retrieved
    */
   getIssue(opts: { agile: boolean, issueId: string, issueKey: string, fields: Object, expand: Object, properties: Object }, callback?: any): Promise;

   /**
    * Delete an issue. If the issue has subtasks you must set the parameter deleteSubtasks=true to delete the issue.
    * You cannot delete an issue without its subtasks also being deleted.
    *
    * @method deleteIssue
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {boolean} [opts.deleteSubTasks] "a String of true or false indicating that any subtasks should also
    *        be deleted. If the issue has no subtasks this parameter is ignored. If the issue has subtasks and this
    *        parameter is missing or false, then the issue will not be deleted and an error will be returned."
    * @param [callback] Called when data has been retrieved
    * @return {Promise} Resolved when data has been retrieved
    */
   deleteIssue(opts: { issueId: string, issueKey: string, deleteSubTasks: boolean }, callback?: any): Promise;

   /**
    *  Edits an issue from a JSON representation.
    *
    * The issue can either be updated by setting explicit the field value(s) or by using an operation to change the
    * field value.
    *
    * The fields that can be updated, in either the fields parameter or the update parameter, can be determined using
    * the {@link IssueClient#getEditMetadata} method. If a field is not configured to appear on the edit
    * screen, then it will not be in the editmeta, and a field validation error will occur if it is submitted.
    *
    * Specifying a "field_id": field_value in the "fields" is a shorthand for a "set" operation in the "update"
    * section. Field should appear either in "fields" or "update", not in both.
    *
    * @method editIssue
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {Object} opts.issue See {@link https://docs.atlassian.com/jira/REST/latest/#d2e656}
    * @param [callback] Called when data has been retrieved
    * @return {Promise} Resolved when data has been retrieved
    */
   editIssue(opts: { issueId: string, issueKey: string, issue: Object }, callback?: any): Promise;

   /**
    * Assigns an issue to a user. You can use this resource to assign issues when the user submitting the request has
    * the assign permission but not the edit issue permission. If the name is "-1" automatic assignee is used. A null
    * name will remove the assignee.
    *
    * @method assignIssue
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.assignee The name of the user to whom to assign the issue. -1 for default, null for no
    *     assignee.
    * @param [callback] Called when the issue has been assigned.
    * @return {Promise} Resolved when the issue has been assigned.
    */
   assignIssue(opts: { issueId: string, issueKey: string, assignee: string }, callback?: any): Promise;

   /**
    * Get all the comments for an issue.
    *
    * @method getComments
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {Object} opts.expand See {@link https://docs.atlassian.com/jira/REST/latest/#d2e461}
    * @param [callback] Called when the issue has been assigned.
    * @return {Promise} Resolved when the issue has been assigned.
    */
   getComments(opts: { issueId: string, issueKey: string, expand: Object }, callback?: any): Promise;

   /**
    * Add a comment to an issue
    *
    * @method addComment
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {Object} opts.comment See {@link https://docs.atlassian.com/jira/REST/latest/#d2e482}
    * @param [callback] Called when data has been retrieved
    * @return {Promise} Resolved when data has been retrieved
    */
   addComment(opts: { issueId: string, issueKey: string, comment: Object }, callback?: any): Promise;

   /**
    * Get a specific comment.
    *
    * @method getComment
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.commentId The id of the comment.
    * @param [callback] Called when the comment is retrieved.
    * @return {Promise} Resolved when the comment is retrieved.
    */
   getComment(opts: { issueId: string, issueKey: string, commentId: string }, callback?: any): Promise;

   /**
    * Updates an existing comment using its JSON representation.
    *
    * @method editComment
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.commentId The id of the comment.
    * @param {Object} opts.comment See {@link https://docs.atlassian.com/jira/REST/latest/#d2e539}
    * @param [callback] Called when data has been retrieved
    * @return {Promise} Resolved when data has been retrieved
    */
   editComment(opts: { issueId: string, issueKey: string, commentId: string, comment: Object }, callback?: any): Promise;

   /**
    * Delete an existing comment.
    *
    * @method deleteComment
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.commentId The id of the comment.
    * @param [callback] Called when the comment is retrieved.
    * @return {Promise} Resolved when the comment is retrieved.
    */
   deleteComment(opts: { issueId: string, issueKey: string, commentId: string }, callback?: any): Promise;

   /**
    * Returns the meta data for editing an issue.
    *
    * The fields in the editmeta correspond to the fields in the edit screen for the issue. Fields not in the screen
    * will not be in the editemeta.
    *
    * @method getEditMetadata
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param [callback] Called when the metadata is retrieved.
    * @return {Promise} Resolved when the metadata is retrieved.
    */
   getEditMetadata(opts: { issueId: string, issueKey: string }, callback?: any): Promise;

   /**
    * Sends a notification (email) to the list or recipients defined in the request.
    * A couple of notes: this may call back with the error 'No recipients were defined for notification.' if all
    * of the intended recipients have disabled notifications from Jira.
    *
    * @method sendEmailNotification
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *        issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {Object} opts.notification See {@link https://docs.atlassian.com/jira/REST/latest/#d2e435}
    * @param [callback] Called when the metadata is retrieved.
    * @return {Promise} Resolved when the metadata is retrieved.
    */
   sendEmailNotification(opts: { issueId: string, issueKey: string, notification: Object }, callback?: any): Promise;

   /**
    * Get a REST sub-resource representing the remote issue links on the issue.
    *
    * @method getRemoteLinks
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.globalId The id of the remote issue link to be returned. If null (not provided) all remote
    *     links for the issue are returned. For a full explanation of Issue Link fields please refer to
    *     {@link https://developer.atlassian.com/display/JIRADEV/Fields+in+Remote+Issue+Links}
    * @param [callback] Called when the remote links are retrieved.
    * @return {Promise} Resolved when the remote links are retrieved.
    */
   getRemoteLinks(opts: { issueId: string, issueKey: string, globalId: string }, callback?: any): Promise;

   /**
    * Creates (or updates) a remote issue link from a JSON representation. If a globalId is provided and a remote issue
    * link exists with that globalId, the remote issue link is updated. Otherwise, the remote issue link is created.
    *
    * @method createRemoteLink
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {Object} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e945}
    * @param [callback] Called when the remote links are retrieved.
    * @return {Promise} Resolved when the remote links are retrieved.
    */
   createRemoteLink(opts: { issueId: string, issueKey: string, remoteLink: Object }, callback?: any): Promise;

   /**
    * Updates (or creates) a remote issue link from a JSON representation. If a globalId is provided and a remote issue
    * link exists with that globalId, the remote issue link is updated. Otherwise, the remote issue link is created.
    *
    * @method updateRemoteLink
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {Object} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e945}
    * @param [callback] Called when the remote links are retrieved.
    * @return {Promise} Resolved when the remote links are retrieved.
    */
   updateRemoteLink(opts: { issueId: string, issueKey: string, remoteLink: Object }, callback?: any): Promise;

   /**
    * Delete the remote issue link with the given global id on the issue.
    *
    * @method deleteRemoteLink
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.globalId The global id of the remote issue link
    * @param [callback] Called when the remote links are retrieved.
    * @return {Promise} Resolved when the remote links are retrieved.
    */
   deleteRemoteLink(opts: { issueId: string, issueKey: string, globalId: string }, callback?: any): Promise;

   /**
    * Get the remote issue link with the given id on the issue.
    *
    * @method getRemoteLinkById
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.linkId The id of the remote link
    * @param [callback] Called when the remote links are retrieved.
    * @return {Promise} Resolved when the remote links are retrieved.
    */
   getRemoteLinkById(opts: { issueId: string, issueKey: string, linkId: string }, callback?: any): Promise;

   /**
    * Get the remote issue link with the given id on the issue.
    *
    * @method updateRemoteLinkById
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.linkId The id of the remote link
    * @param {string} opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e1037}
    * @param [callback] Called when the remote links are retrieved.
    * @return {Promise} Resolved when the remote links are retrieved.
    */
   updateRemoteLinkById(opts: { issueId: string, issueKey: string, linkId: string, remoteLink: string }, callback?: any): Promise;

   /**
    * Get the remote issue link with the given id on the issue.
    *
    * @method deleteRemoteLinkById
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.linkId The id of the remote link
    * @param [callback] Called when the remote links are retrieved.
    * @return {Promise} Resolved when the remote links are retrieved.
    */
   deleteRemoteLinkById(opts: { issueId: string, issueKey: string, linkId: string }, callback?: any): Promise;

   /**
    * Get a list of the transitions possible for this issue by the current user, along with fields that are required
    * and their types.
    *
    * Fields will only be returned if ```expand=transitions.fields.```
    *
    * The fields in the metadata correspond to the fields in the transition screen for that transition. Fields not in
    * the screen will not be in the metadata.
    *
    * @method getTransitions
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.transitionId If specified, will call back with only the transition with the specified id.
    * @param [callback] Called when the transitions are retrieved.
    * @return {Promise} Resolved when the transitions are retrieved.
    */
   getTransitions(opts: { issueId: string, issueKey: string, transitionId: string }, callback?: any): Promise;

   /**
    * Perform a transition on an issue. When performing the transition you can udate or set other issue fields.
    *
    * The fields that can be set on transtion, in either the fields parameter or the update parameter can be
    * determined using the** /rest/api/2/issue/{issueIdOrKey}/transitions?expand=transitions.fields resource**. If a
    * field is not configured to appear on the transition screen, then it will not be in the transition metadata, and
    * a field validation error will occur if it is submitted.
    *
    * @method transitionIssue
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.transition See {@link https://docs.atlassian.com/jira/REST/latest/#d2e698}
    * @param [callback] Called when the transitions are retrieved.
    * @return {Promise} Resolved when the transitions are retrieved.
    */
   transitionIssue(opts: { issueId: string, issueKey: string, transition: string }, callback?: any): Promise;

   /**
    * Remove your vote from an issue. (i.e. "unvote")
    *
    * @method unvote
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param [callback] Called after the vote is removed.
    * @return {Promise} Resolved after the vote is removed.
    */
   unvote(opts: { issueId: string, issueKey: string }, callback?: any): Promise;

   /**
    * Cast your vote in favour of an issue.
    *
    * @method vote
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param [callback] Called after the vote is removed.
    * @return {Promise} Resolved after the vote is removed.
    */
   vote(opts: { issueId: string, issueKey: string }, callback?: any): Promise;

   /**
    * Get a REST sub-resource representing the voters on the issue.
    *
    * @method getVotes
    * @memberof IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param [callback] Called after the votes are retrieved.
    * @return {Promise} Resolved after the votes are retrieved.
    */
   getVotes(opts: { issueId: string, issueKey: string }, callback?: any): Promise;

   /**
    * Returns the list of watchers for the issue with the given key.
    *
    * @method getWatchers
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param [callback] Called after the watchers are retrieved.
    * @return {Promise} Resolved after the watchers are retrieved.
    */
   getWatchers(opts: { issueId: string, issueKey: string }, callback?: any): Promise;

   /**
    * Adds a user to an issue's watcher list.
    *
    * @method addWatcher
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.watcher The username of the user to add as a watcher.
    * @param [callback] Called after the watcher is added.
    * @return {Promise} Resolved after the watcher is added.
    */
   addWatcher(opts: { issueId: string, issueKey: string, watcher: string }, callback?: any): Promise;

   /**
    * Adds a user to an issue's watcher list.
    *
    * @method removeWatcher
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.watcher The username of the user to remove as a watcher.
    * @param [callback] Called after the watcher is removed.
    * @return {Promise} Resolved after the watcher is removed.
    */
   removeWatcher(opts: { issueId: string, issueKey: string, watcher: string }, callback?: any): Promise;

   /**
    * Gets all work logs for an issue.
    *
    * @method getWorkLogs
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param [callback] Called after the worklogs are retrieved.
    * @return {Promise} Resolved after the worklogs are retrieved.
    */
   getWorkLogs(opts: { issueId: string, issueKey: string }, callback?: any): Promise;

   /**
    * Adds a new worklog entry to an issue.
    *
    * @method addWorkLog
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} [opts.adjustEstimate] Allows you to provide specific instructions to update the remaining time
    *     estimate of the issue. Valid values are
    *     * "new" - sets the estimate to a specific value
    *     * "leave"- leaves the estimate as is
    *     * "manual" - specify a specific amount to increase remaining estimate by
    *     * "auto"- Default option. Will automatically adjust the value based on the
    *          new timeSpent specified on the worklog
    * @param {string} [opts.newEstimate] (required when "new" is selected for adjustEstimate) the new value for the
    *     remaining estimate field. e.g. "2d"
    * @param {string} [opts.reduceBy] (required when "manual" is selected for adjustEstimate) the amount to reduce the
    *     remaining estimate by e.g. "2d"
    * @param {Object} opts.worklog See {@link: https://docs.atlassian.com/jira/REST/latest/#d2e1106}
    * @param [callback] Called after the worklog is added.
    * @return {Promise} Resolved after the worklog is added.
    */
   addWorkLog(opts: { issueId: string, issueKey: string, adjustEstimate: string, newEstimate: string, reduceBy: string, worklog: Object }, callback?: any): Promise;

   /**
    * Gets a specific worklog.
    *
    * @method getWorkLog
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.worklogId The id of the work log to retrieve.
    * @param [callback] Called after the worklog is retrieved.
    * @return {Promise} Resolved after the worklog is retrieved.
    */
   getWorkLog(opts: { issueId: string, issueKey: string, worklogId: string }, callback?: any): Promise;

   /**
    * Updates an existing worklog entry using its JSON representation.
    *
    * @method updateWorkLog
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.worklogId The id of the work log to retrieve.
    * @param {string} [opts.adjustEstimate] Allows you to provide specific instructions to update the remaining time
    *     estimate of the issue. Valid values are
    *     * "new" - sets the estimate to a specific value
    *     * "leave"- leaves the estimate as is
    *     * "auto"- Default option. Will automatically adjust the value based on the
    *          new timeSpent specified on the worklog
    * @param {string} [opts.newEstimate] (required when "new" is selected for adjustEstimate) the new value for the
    *     remaining estimate field. e.g. "2d"
    * @param {Object} opts.worklog See {@link: https://docs.atlassian.com/jira/REST/latest/#d2e1161}
    * @param [callback] Called after the worklog is updated.
    * @return {Promise} Resolved after the worklog is updated.
    */
   updateWorkLog(opts: { issueId: string, issueKey: string, worklogId: string, adjustEstimate: string, newEstimate: string, worklog: Object }, callback?: any): Promise;

   /**
    * Deletes an existing worklog entry
    *
    * @method deleteWorkLog
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.worklogId The id of the work log to delete.
    * @param {string} [opts.adjustEstimate] Allows you to provide specific instructions to update the remaining time
    *     estimate of the issue. Valid values are
    *     * "new" - sets the estimate to a specific value
    *     * "leave"- leaves the estimate as is
    *     * "manual" - specify a specific amount to increase remaining estimate by
    *     * "auto"- Default option. Will automatically adjust the value based on the
    *          new timeSpent specified on the worklog
    * @param {string} [opts.newEstimate] (required when "new" is selected for adjustEstimate) the new value for the
    *     remaining estimate field. e.g. "2d"
    * @param {string} [opts.increaseBy] (required when "manual" is selected for adjustEstimate) the amount to reduce
    *     the remaining estimate by e.g. "2d"
    * @param [callback] Called after the work log is deleted.
    * @return {Promise} Resolved after the work log is deleted.
    */
   deleteWorkLog(opts: { issueId: string, issueKey: string, worklogId: string, adjustEstimate: string, newEstimate: string, increaseBy: string }, callback?: any): Promise;

   /**
    * Add an attachments to an issue.
    *
    * @method addAttachment
    * @memberOf IssueClient
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.filename The file name of attachment. If you pass an array of filenames, multiple attachments will be added.
    * @param [callback] Called when the attachment has been attached.
    * @return {Promise} Resolved when the attachment has been attached.
    */
   static addAttachment(opts: { issueId: string, issueKey: string, filename: string }, callback?: any): Promise;

   /**
    * Returns the keys of all properties for the issue identified by the key or by the id.  This function is maked as
    * experimental in the Jira API docs, use at your own risk.
    *
    * @method getProperties
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param [callback] Called when the properties are retrieved.
    * @return {Promise} Resolved when the properties are retrieved.
    */
   getProperties(opts: { issueId: string, issueKey: string }, callback?: any): Promise;

   /**
    * Sets the value of the specified issue's property. You can use this resource to store a custom data against the
    * issue identified by the key or by the id. The user who stores the data is required to have permissions to edit
    * the issue.
    *
    * This function is maked as experimental in the Jira API docs, use at your own risk.
    *
    * @method setProperty
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.propertyKey The key of the property being set.
    * @param {Object} opts.propertyValue The value of the property being set.
    * @param [callback] Called when the property is set.
    * @return {Promise} Resolved when the property is set.
    */
   setProperty(opts: { issueId: string, issueKey: string, propertyKey: string, propertyValue: Object }, callback?: any): Promise;

   /**
    * Returns the value of the property with a given key from the issue identified by the key or by the id. The user
    * who retrieves the property is required to have permissions to read the issue.
    *
    * This function is maked as experimental in the Jira API docs, use at your own risk.
    *
    * @method getProperty
    * @memberOf IssueClient#
    * @param {Object} opts The options to pass to the API.  Note that this object must contain EITHER an issueId or
    *     issueKey property; issueId will be used over issueKey if both are present.
    * @param {string} [opts.issueId] The id of the issue.  EX: 10002
    * @param {string} [opts.issueKey] The Key of the issue.  EX: JWR-3
    * @param {string} opts.propertyKey The key of the property being set.
    * @param [callback] Called when the property is retrieved.
    * @return {Promise} Resolved when the property is retrieved.
    */
   getProperty(opts: { issueId: string, issueKey: string, propertyKey: string }, callback?: any): Promise;

}

/**
 * Build out the request options necessary to make a particular API call.
 *
 * @private
 * @method buildRequestOptions
 * @param {Object} opts The arguments passed to the method.
 * @param {string} path The path of the endpoint following /issue/{idOrKey}
 * @param {string} method The request method.
 * @param {Object} [body] The request body, if any.
 * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
 * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
 */
declare function buildRequestOptions(opts: Object, path: string, method: string, body?: Object, qs?: Object): Object;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issueLink'
 * @param {JiraClient} jiraClient
 * @constructor IssueLinkClient
 */
declare class IssueLinkClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/issueLink'
    * @param {JiraClient} jiraClient
    * @constructor IssueLinkClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Creates an issue link between two issues. The user requires the link issue permission for the issue which will
    * be linked to another issue. The specified link type in the request is used to create the link and will create a
    * link from the first issue to the second issue using the outward description. It also create a link from the
    * second issue to the first issue using the inward description of the issue link type. It will add the supplied
    * comment to the first issue. The comment can have a restriction who can view it. If group is specified, only
    * users of this group can view this comment, if roleLevel is specified only users who have the specified role can
    * view this comment. The user who creates the issue link needs to belong to the specified group or have the
    * specified role.
    *
    * @memberOf IssueLinkClient#
    * @method createIssueLink
    * @param opts The options for the request sent to the Jira API
    * @param opts.issueLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e5010}
    * @param [callback] Called when the link has been created.
    * @return {Promise} Resolved when the link has been created.
    */
   createIssueLink(opts: any, callback?: any): Promise;

   /**
    * Gets an issue link with the specified id.
    *
    * @method getIssueLink
    * @memberOf IssueLinkClient#
    * @param opts The options used in the request to the Jira API
    * @param opts.linkId The id of the link to retrieve.
    * @param [callback] Called when the Issue Link has been retrieved.
    * @return {Promise} Resolved when the Issue Link has been retrieved.
    */
   getIssueLink(opts: any, callback?: any): Promise;

   /**
    * Deletes an issue link with the specified id. To be able to delete an issue link you must be able to view both
    * issues and must have the link issue permission for at least one of the issues.
    *
    * @method deleteIssueLink
    * @memberOf IssueLinkClient#
    * @param opts The options used in the request to the Jira API
    * @param opts.linkId The id of the link to delete.
    * @param [callback] Called when the Issue Link has been deleted.
    * @return {Promise} Resolved when the Issue Link has been deleted.
    */
   deleteIssueLink(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issueLinkType'
 * @param {JiraClient} jiraClient
 * @constructor IssueLinkTypeClient
 */
declare class IssueLinkTypeClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/issueLinkType'
    * @param {JiraClient} jiraClient
    * @constructor IssueLinkTypeClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Get a list of available issue link types, if issue linking is enabled. Each issue link type has an id, a name
    * and a label for the outward and inward link relationship.
    *
    * @method getAvailableTypes
    * @memberOf IssueLinkTypeClient#
    * @param opts The request options for the API.  Ignored in this function.
    * @param [callback] Called when the available IssueLink types are retrieved.
    * @return {Promise} Resolved when the available IssueLink types are retrieved.
    */
   getAvailableTypes(opts: any, callback?: any): Promise;

   /**
    * Create a new issue link type.
    *
    * @method createIssueLinkType
    * @memberOf IssueLinkTypeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.linkType See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2018}
    * @param [callback] Called when the IssueLink type has been created.
    * @return {Promise} Resolved when the IssueLink type has been created.
    */
   createIssueLinkType(opts: any, callback?: any): Promise;

   /**
    * Gets for a given issue link type id all information about this issue link type.
    *
    * @method getIssueLinkType
    * @memberOf IssueLinkTypeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.issueLinkTypeId The id of the IssueLink type to retrieve.
    * @param [callback] Called when the IssueLink type has been retrieved
    * @return {Promise} Resolved when the IssueLink type has been retrieved
    */
   getIssueLinkType(opts: any, callback?: any): Promise;

   /**
    * Delete the specified issue link type.
    *
    * @method deleteIssueLinkType
    * @memberOf IssueLinkTypeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.issueLinkTypeId The id of the IssueLink type to delete.
    * @param [callback] Called when the IssueLink type has been delete
    * @return {Promise} Resolved when the IssueLink type has been delete
    */
   deleteIssueLinkType(opts: any, callback?: any): Promise;

   /**
    * Update the specified issue link type.
    *
    * @method editIssueLinkType
    * @memberOf IssueLinkTypeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.issueLinkTypeId The id of the IssueLink type to retrieve.
    * @param opts.linkType See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2071}
    * @param [callback] Called when the IssueLink type has been updated.
    * @return {Promise} Resolved when the IssueLink type has been updated.
    */
   editIssueLinkType(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/issuetype'
 *
 * @param {JiraClient} jiraClient
 * @constructor IssueTypeClient
 */
declare class IssueTypeClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/issuetype'
    *
    * @param {JiraClient} jiraClient
    * @constructor IssueTypeClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of all issue types visible to the user
    *
    * @method getAllIssueTypes
    * @memberOf IssueTypeClient#
    * @param opts Ignored
    * @param [callback] Called when the issue types have been retrieved.
    * @return {Promise} Resolved when the issue types have been retrieved.
    */
   getAllIssueTypes(opts: any, callback?: any): Promise;

   /**
    * Get a full representation of the issue type that has the given id.
    *
    * @method getIssueType
    * @memberOf IssueTypeClient#
    * @param opts The options sent to the Jira API
    * @param opts.issueTypeId A String containing an issue type id
    * @param [callback] Called when the issue type has been retrieved.
    * @return {Promise} Resolved when the issue type has been retrieved.
    */
   getIssueType(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/jql/autocompletedata'
 *
 * @param {JiraClient} jiraClient
 * @constructor JqlClient
 */
declare class JqlClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/jql/autocompletedata'
    *
    * @param {JiraClient} jiraClient
    * @constructor JqlClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns the auto complete data required for JQL searches.
    *
    * @method getAutoCompleteData
    * @memberOf JqlClient#
    * @param opts The options sent to the Jira API.  Ignored by this function.
    * @param [callback] Called when the autocomplete data is returned.
    * @return {Promise} Resolved when the autocomplete data is returned.
    */
   getAutoCompleteData(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/licenserole'
 * @param {JiraClient} jiraClient
 * @constructor LicenseRoleClient
 */
declare class LicenseRoleClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/licenserole'
    * @param {JiraClient} jiraClient
    * @constructor LicenseRoleClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns all license roles in the system.
    *
    * @method getAllLicenseRoles
    * @memberOf LicenseRoleClient#
    * @param opts Ignored
    * @param [callback] Called when the license roles have been retrieved.
    * @return {Promise} Resolved when the license roles have been retrieved.
    */
   getAllLicenseRoles(opts: any, callback?: any): Promise;

   /**
    * Gets the passed license role if it exists.
    *
    * @method getLicenseRole
    * @memberOf LicenseRoleClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.roleId The id of the license role to retrieve.
    * @param [callback] Called when the license role is retrieved.
    * @return {Promise} Resolved when the license role is retrieved.
    */
   getLicenseRole(opts: any, callback?: any): Promise;

   /**
    * Updates the license role with the passed data. Only the groups of the role may be updated. Requests to change
    * the id or the name of the role will be silently ignored.
    *
    * @method editLicenseRole
    * @memberOf LicenseRoleClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.roleId The id of the license role to retrieve.
    * @param opts.role The new data to place in the role.  See
    *  {@link https://docs.atlassian.com/jira/REST/latest/#d2e365}
    * @param [callback] Called when the license role is edited.
    * @return {Promise} Resolved when the license role is edited.
    */
   editLicenseRole(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/licenseValidator'
 *
 * @param {JiraClient} jiraClient
 * @constructor LicenseValidatorClient
 */
declare class LicenseValidatorClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/licenseValidator'
    *
    * @param {JiraClient} jiraClient
    * @constructor LicenseValidatorClient
    */
   constructor(jiraClient: JiraClient);

   /**
    *
    * @method validateLicense
    * @memberOf LicenseValidatorClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.license The license to validate.
    * @param [callback] Called when the license has been validated, or fails to validate.
    * @return {Promise} Resolved when the license has been validated, or fails to validate.
    */
   validateLicense(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/mypermissions'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyPermissionsClient
 */
declare class MyPermissionsClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/mypermissions'
    *
    * @param {JiraClient} jiraClient
    * @constructor MyPermissionsClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns all permissions in the system and whether the currently logged in user has them. You can optionally
    * provide a specific context to get permissions for (projectKey OR projectId OR issueKey OR issueId)
    *
    * * When no context supplied the project related permissions will return true if the user has that permission in
    * ANY project
    * * If a project context is provided, project related permissions will return true if the user has the permissions
    * in the specified project. For permissions that are determined using issue data (e.g Current Assignee), true will
    * be returned if the user meets the permission criteria in ANY issue in that project
    * * If an issue context is provided, it will return whether or not the user has each permission in that specific
    * issue
    *
    * NB: The above means that for issue-level permissions (EDIT_ISSUE for example), hasPermission may be true when no
    * context is provided, or when a project context is provided, but may be false for any given (or all) issues. This
    * would occur (for example) if Reporters were given the EDIT_ISSUE permission. This is because any user could be a
    * reporter, except in the context of a concrete issue, where the reporter is known.
    *
    * Global permissions will still be returned for all scopes.
    *
    * @method getMyPermissions
    * @memberOf MyPermissionsClient#
    * @param opts The request options sent to the Jira API
    * @param [callback] Called when the permissions have been returned.
    * @return {Promise} Resolved when the permissions have been returned.
    */
   getMyPermissions(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/mypreferences'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyPreferencesClient
 */
declare class MyPreferencesClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/mypreferences'
    *
    * @param {JiraClient} jiraClient
    * @constructor MyPreferencesClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Gets preference of the currently logged in user. Preference key must be provided as input parameter (key).
    * The value is returned exactly as it is.
    *
    * @method getPreference
    * @memberOf MyPreferencesClient#
    * @param opts The request options send to the Jira API.
    * @param opts.key Key of the preference to be returned.
    * @param [callback] Called when the preference has been retrieved.
    * @return {Promise} Resolved when the preference has been retrieved.
    */
   getPreference(opts: any, callback?: any): Promise;

   /**
    * Sets preference of the currently logged in user. Preference key must be provided as input parameters (key).
    *
    * @method editPreference
    * @memberOf MyPreferencesClient#
    * @param opts The request options send to the Jira API.
    * @param opts.key Key of the preference to be edited.
    * @param opts.value The new value to set for the preference.
    * @param [callback] Called when the preference has been edited.
    * @return {Promise} Resolved when the preference has been edited.
    */
   editPreference(opts: any, callback?: any): Promise;

   /**
    * Removes preference of the currently logged in user. Preference key must be provided as input parameters (key).
    *
    * @method deletePreference
    * @memberOf MyPreferencesClient#
    * @param opts The request options send to the Jira API.
    * @param opts.key Key of the preference to be deleted.
    * @param [callback] Called when the preference has been deleted.
    * @return {Promise} Resolved when the preference has been deleted.
    */
   deletePreference(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/myself'
 *
 * @param {JiraClient} jiraClient
 * @constructor MyselfClient
 */
declare class MyselfClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/myself'
    *
    * @param {JiraClient} jiraClient
    * @constructor MyselfClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns currently logged user. This resource cannot be accessed anonymously.
    *
    * @method getMyself
    * @memberOf MyselfClient#
    * @param opts Ignored
    * @param [callback] Called when the current user is retrieved.
    * @return {Promise} Resolved when the current user is retrieved.
    */
   getMyself(opts: any, callback?: any): Promise;

   /**
    * Modify currently logged user. The "value" fields present will override the existing value. Fields skipped in
    * request will not be changed. Only email and display name can be change that way.
    *
    * @method editMyself
    * @memberOf MyselfClient#
    * @param opts The request options send to the Jira API.
    * @param opts.newData The new data.  See {@link https://docs.atlassian.com/jira/REST/latest/#d2e1242}
    * @param [callback] Called when the user's data has been modified
    * @return {Promise} Resolved when the user's data has been modified
    */
   editMyself(opts: any, callback?: any): Promise;

   /**
    * Modify caller password.
    *
    * @method changePassword
    * @memberOf MyselfClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.newData The new data
    * @param [callback] Called when the password has been changed.
    * @return {Promise} Resolved when the password has been changed.
    */
   changePassword(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/password'
 *
 * @param {JiraClient} jiraClient
 * @constructor PasswordClient
 */
declare class PasswordClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/password'
    *
    * @param {JiraClient} jiraClient
    * @constructor PasswordClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns user-friendly statements governing the system's password policy.
    *
    * @method getPasswordPolicy
    * @memberOf PasswordClient#
    * @param opts The request options to send to the Jira API
    * @param {boolean} [opts.hasOldPassword=false] Whether or not the user will be required to enter their current
    *     password. Use false (the default) if this is a new user or if an administrator is forcibly changing another
    *     user's password.
    * @param [callback] Called when the password policy has been retrieved.
    * @return {Promise} Resolved when the password policy has been retrieved.
    */
   getPasswordPolicy(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/priority'
 *
 * @param {JiraClient} jiraClient
 * @constructor PriorityClient
 */
declare class PriorityClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/priority'
    *
    * @param {JiraClient} jiraClient
    * @constructor PriorityClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of all priorities visible to the user
    *
    * @method getAllPriorities
    * @memberOf PriorityClient#
    * @param opts Ignored
    * @param [callback] Called when the priorities have been retrieved.
    * @return {Promise} Resolved when the priorities have been retrieved.
    */
   getAllPriorities(opts: any, callback?: any): Promise;

   /**
    * Get a full representation of the priority that has the given id.
    *
    * @method getPriority
    * @memberOf PriorityClient#
    * @param opts The options sent to the Jira API
    * @param opts.priorityId A String containing a priority id
    * @param [callback] Called when the priority has been retrieved.
    * @return {Promise} Resolved when the priority has been retrieved.
    */
   getPriority(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/project'
 * @param {JiraClient} jiraClient
 * @constructor ProjectClient
 */
declare class ProjectClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/project'
    * @param {JiraClient} jiraClient
    * @constructor ProjectClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns all projects which are visible for the currently logged in user. If no user is logged in, it returns the
    * list of projects that are visible when using anonymous access.
    *
    * @method getAllProjects
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param [callback] Called when the projects have been retrieved.
    * @return {Promise} Resolved when the projects have been retrieved.
    */
   getAllProjects(opts: any, callback?: any): Promise;

   /**
    * Deletes a project
    *
    * @method deleteProject
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param [callback] Called when the project has been deleted.
    * @return {Promise} Resolved when the project has been deleted.
    */
   deleteProject(opts: any, callback?: any): Promise;

   /**
    * Creates a project.
    *
    * @method createProject
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.data The project properties. See {@link https://docs.atlassian.com/jira/REST/latest/#api/2/project}
    * @param [callback] Called when the project has been created.
    * @return {Promise} Resolved when the project has been created.
    */
   createProject(opts: any, callback?: any): Promise;

   /**
    * Gets project propertes.
    *
    * @method getProjectProperties
    * @memberOf ProjectClient#
    * @param opts Options
    * @param opts.projectIdOrKey The project id or project key
    * @param [callback] Called when properties has been retrieved.
    * @return {Promise} Resolved when properties has been retrieved.
    */
   getProjectProperties(opts: any, callback?: any): Promise;

   /**
    * Contains a full representation of a project in JSON format.
    *
    * All project keys associated with the project will only be returned if expand=projectKeys.
    *
    * @method getProject
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param [callback] Called when the project is retrieved.
    * @return {Promise} Resolved when the project is retrieved.
    */
   getProject(opts: any, callback?: any): Promise;

   /**
    * Contains a full representation of a the specified project's components.
    *
    * @method getComponents
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param [callback] Called when the components are retrieved.
    * @return {Promise} Resolved when the components are retrieved.
    */
   getComponents(opts: any, callback?: any): Promise;

   /**
    * Get all issue types with valid status values for a project
    *
    * @method getStatuses
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param [callback] Called when the statuses have been retrieved.
    * @return {Promise} Resolved when the statuses have been retrieved.
    */
   getStatuses(opts: any, callback?: any): Promise;

   /**
    * Contains a full representation of a the specified project's versions.
    *
    * @method getVersions
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param [callback] Called when the versions have been retrieved.
    * @return {Promise} Resolved when the versions have been retrieved.
    */
   getVersions(opts: any, callback?: any): Promise;

   /**
    * Contains a list of roles in this project with links to full details.
    *
    * @method getRoles
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param [callback] Called when the roles have been retrieved.
    * @return {Promise} Resolved when the roles have been retrieved.
    */
   getRoles(opts: any, callback?: any): Promise;

   /**
    * Details on a given project role.
    *
    * @method getRole
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param opts.roleId The id of the role to retrieve.
    * @param [callback] Called when the roles have been retrieved.
    * @return {Promise} Resolved when the roles have been retrieved.
    */
   getRole(opts: any, callback?: any): Promise;

   /**
    * Updates a project role to contain the sent actors.
    *
    * @method updateRole
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param opts.roleId The id of the role to retrieve.
    * @param opts.newRole See {@link https://docs.atlassian.com/jira/REST/latest/#d2e108}
    * @param [callback] Called when the roles have been retrieved.
    * @return {Promise} Resolved when the roles have been retrieved.
    */
   updateRole(opts: any, callback?: any): Promise;

   /**
    * Add an actor to a project role.
    *
    * @method addToRole
    * @memberOf ProjectClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectIdOrKey The project id or project key
    * @param opts.roleId The id of the role to retrieve.
    * @param opts.newRole See {@link https://docs.atlassian.com/jira/REST/latest/#d2e134}
    * @param [callback] Called when the roles have been retrieved.
    * @return {Promise} Resolved when the roles have been retrieved.
    */
   addToRole(opts: any, callback?: any): Promise;

   /**
    * Build out the request options necessary to make a particular API call.
    *
    * @private
    * @method buildRequestOptions
    * @memberOf ProjectClient#
    * @param {Object} opts The arguments passed to the method.
    * @param {number} opts.projectIdOrKey The id of the project to use in the path.
    * @param {Array} [opts.fields] The fields to include
    * @param {Array} [opts.expand] The fields to expand
    * @param {string} path The path of the endpoint following /project/{id}
    * @param {string} method The request method.
    * @param {Object} [body] The request body, if any.
    * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
    * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
    */
   private buildRequestOptions(opts: { projectIdOrKey: number, fields: Array, expand: Array }, path: string, method: string, body?: Object, qs?: Object): Object;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/projectCategory'
 *
 * @param {JiraClient} jiraClient
 * @constructor ProjectCategoryClient
 */
declare class ProjectCategoryClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/projectCategory'
    *
    * @param {JiraClient} jiraClient
    * @constructor ProjectCategoryClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of all projectCategories visible to the user
    *
    * @method getAllProjectCategories
    * @memberOf ProjectCategoryClient#
    * @param opts Ignored
    * @param [callback] Called when the statusCategories have been retrieved.
    * @return {Promise} Resolved when the statusCategories have been retrieved.
    */
   getAllProjectCategories(opts: any, callback?: any): Promise;

   /**
    * Get a full representation of the projectCategory that has the given id.
    *
    * @method getProjectCategory
    * @memberOf ProjectCategoryClient#
    * @param opts The options sent to the Jira API
    * @param opts.projectCategoryId A String containing a projectCategory id
    * @param [callback] Called when the projectCategory has been retrieved.
    * @return {Promise} Resolved when the projectCategory has been retrieved.
    */
   getProjectCategory(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/projectvalidate'
 *
 * @param {JiraClient} jiraClient
 * @constructor ProjectValidateClient
 */
declare class ProjectValidateClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/projectvalidate'
    *
    * @param {JiraClient} jiraClient
    * @constructor ProjectValidateClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Validates a project key.  This endpoint is a little wonky, as it returns a list of errors as a valid response;
    * even if the key is invalid, it still returns a 200 response.
    * See {@link https://docs.atlassian.com/jira/REST/latest/#d2e297}
    *
    * @method validateProjectKey
    * @memberOf ProjectValidateClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.projectKey The key of the project.
    * @param [callback] Called when the key has been validated.
    * @return {Promise} Resolved when the key has been validated.
    */
   validateProjectKey(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/reindex'
 *
 * @param {JiraClient} jiraClient
 * @constructor ReindexClient
 */
declare class ReindexClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/reindex'
    *
    * @param {JiraClient} jiraClient
    * @constructor ReindexClient
    */
   constructor(jiraClient: JiraClient);

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
   doReindex(opts: any, callback?: any): Promise;

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
   getReindex(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/resolution'
 *
 * @param {JiraClient} jiraClient
 * @constructor ResolutionClient
 */
declare class ResolutionClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/resolution'
    *
    * @param {JiraClient} jiraClient
    * @constructor ResolutionClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of all resolutions visible to the user
    *
    * @method getAllResolutions
    * @memberOf ResolutionClient#
    * @param opts Ignored
    * @param [callback] Called when the resolutions have been retrieved.
    * @return {Promise} Resolved when the resolutions have been retrieved.
    */
   getAllResolutions(opts: any, callback?: any): Promise;

   /**
    * Get a full representation of the resolution that has the given id.
    *
    * @method getResolution
    * @memberOf ResolutionClient#
    * @param opts The options sent to the Jira API
    * @param opts.resolutionId A String containing a resolution id
    * @param [callback] Called when the resolution has been retrieved.
    * @return {Promise} Resolved when the resolution has been retrieved.
    */
   getResolution(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/screens'
 *
 * @param {JiraClient} jiraClient
 * @constructor ScreensClient
 */
declare class ScreensClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/screens'
    *
    * @param {JiraClient} jiraClient
    * @constructor ScreensClient
    */
   constructor(jiraClient: JiraClient);

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
   getAvailableFields(opts: { screenId: number }, callback?: any): Promise;

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
   getTabs(opts: { screenId: number }, callback?: any): Promise;

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
   createTab(opts: { screenId: number, name: string }, callback?: any): Promise;

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
   renameTab(opts: { screenId: number, tabId: number, name: string }, callback?: any): Promise;

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
   deleteTab(opts: { screenId: number, tabId: number }, callback?: any): Promise;

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
   addFieldToTab(opts: { screenId: number, tabId: number, fieldId: string }, callback?: any): Promise;

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
   getFieldsInTab(opts: { screenId: number, tabId: number }, callback?: any): Promise;

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
   removeFieldFromTab(opts: { screenId: number, tabId: number, fieldId: string }, callback?: any): Promise;

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
   moveFieldOnTab(opts: { screenId: number, tabId: number, fieldId: string, newPosition: number }, callback?: any): Promise;

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
   moveTabPosition(opts: { screenId: number, tabId: number, newPosition: number }, callback?: any): Promise;

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
   addFieldToDefaultTab(opts: { fieldId: string }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/search'
 *
 * @param {JiraClient} jiraClient
 * @constructor SearchClient
 */
declare class SearchClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/search'
    *
    * @param {JiraClient} jiraClient
    * @constructor SearchClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Searches for issues using JQL.
    *
    * Sorting the jql parameter is a full JQL expression, and includes an ORDER BY clause.
    *
    * The fields param (which can be specified multiple times) gives a comma-separated list of fields to include in
    * the response. This can be used to retrieve a subset of fields. A particular field can be excluded by prefixing
    * it with a minus.
    *
    * By default, only navigable (*navigable) fields are returned in this search resource. Note: the default is
    * different in the get-issue resource -- the default there all fields (*all).
    *
    * * *all - include all fields
    * * navigable - include just navigable fields
    * * summary,comment - include just the summary and comments
    * * -description - include navigable fields except the description (the default is *navigable for search)
    * * *all,-comment - include everything except comments
    *
    * Expanding Issues in the Search Result: It is possible to expand the issues returned by directly specifying the
    * expansion on the expand parameter passed in to this resources.
    *
    * For instance, to expand the "changelog" for all the issues on the search result, it is neccesary to specify
    * "changelog" as one of the values to expand.
    *
    * @method search
    * @memberOf SearchClient#
    * @param opts The options for the search.
    * @param {string} opts.jql The JQL query string
    * @param {number} [opts.startAt] The index of the first issue to return (0-based)
    * @param {number} [opts.maxResults] The maximum number of issues to return (defaults to 50). The maximum allowable
    *     value is dictated by the JIRA property 'jira.search.views.default.max'. If you specify a value that is
    *     higher than this number, your search results will be truncated.
    * @param {boolean} [opts.validateQuery=true] Whether to validate the JQL query
    * @param {array} [opts.fields] The list of fields to return for each issue. By default, all navigable fields are
    *     returned.
    * @param {array} [opts.expand] A list of the parameters to expand.
    * @param [callback] Called with the search results.
    * @return {Promise} Resolved with the search results.
    */
   search(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/securitylevel'
 *
 * @param {JiraClient} jiraClient
 * @constructor SecurityLevelClient
 */
declare class SecurityLevelClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/securitylevel'
    *
    * @param {JiraClient} jiraClient
    * @constructor SecurityLevelClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Get a full representation of the security level that has the given id.
    *
    * @method getSecurityLevel
    * @memberOf SecurityLevelClient#
    * @param opts The request options to send to the Jira API.
    * @param opts.securityLevelId The id of the security level to retrieve
    * @param [callback] Called when the security level has been retrieved.
    * @return {Promise} Resolved when the security level has been retrieved.
    */
   getSecurityLevel(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/serverInfo'
 * @param {JiraClient} jiraClient
 * @constructor ServerInfoClient
 */
declare class ServerInfoClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/serverInfo'
    * @param {JiraClient} jiraClient
    * @constructor ServerInfoClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns general information about the current JIRA server.
    *
    * @method getServerInfo
    * @memberOf ServerInfoClient#
    * @param opts The request options sent to the Jira API.
    * @param {boolean} [opts.doHealthCheck] Whether to perform a health check on the server.
    * @param [callback] Called when the server info has been retrieved.
    * @return {Promise} Resolved when the server info has been retrieved.
    */
   getServerInfo(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/settings'
 * @param {JiraClient} jiraClient
 * @constructor SettingsClient
 */
declare class SettingsClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/settings'
    * @param {JiraClient} jiraClient
    * @constructor SettingsClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Sets the base URL that is configured for this JIRA instance.
    *
    * @method setBaseUrl
    * @memberOf SettingsClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.newUrl The new base url.
    * @param [callback] Called when the base url has been set.
    * @return {Promise} Resolved when the base url has been set.
    */
   setBaseUrl(opts: any, callback?: any): Promise;

   /**
    * Returns the default system columns for issue navigator. Admin permission will be required.
    *
    * @method getIssueNavColumns
    * @memberOf SettingsClient#
    * @param opts Ignored
    * @param [callback] Called when the columns have been retrieved
    * @return {Promise} Resolved when the columns have been retrieved
    */
   getIssueNavColumns(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/sprint'
 * @param {JiraClient} jiraClient
 * @constructor AgileSprintClient
 */
declare class AgileSprintClient {
   /**
    * Used to access Jira REST endpoints in '/rest/agile/1.0/sprint'
    * @param {JiraClient} jiraClient
    * @constructor AgileSprintClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Creates a sprint from a JSON representation.
    *
    * @method createSprint
    * @memberOf AgileSprintClient#
    * @param {object} opts The request options sent to the Jira API.
    * @param {Object} opts.data The sprint data in the form of POST body to the
    *   Jira API.
    * @param [callback] Called when the sprint has been created.
    * @return {Promise} Resolved when the sprint has been created.
    */
   createSprint(opts: { data: Object }, callback?: any): Promise;

   /**
    * Get a single sprint.
    *
    * @method getSprint
    * @memberOf AgileSprintClient#
    * @param {object} opts The request options sent to the Jira API.
    * @param opts.sprintId The sprint id.
    * @param [callback] Called when the sprint has been retrieved.
    * @return {Promise} Resolved when the sprint has been retrieved.
    */
   getSprint(opts: { sprintId: any }, callback?: any): Promise;

   /**
    * Perform a full update of a sprint.
    *
    * @method updateSprint
    * @memberOf AgileSprintClient#
    * @param {object} opts The request options sent to the Jira API.
    * @param {Object} opts.data The sprint data in the form of PUT body to the
    *   Jira API.
    * @param {string} [opts.data.sprintId] The id of the sprint.  EX: 331
    * @param [callback] Called when the sprint has been updated.
    * @return {Promise} Resolved when the sprint has been updated.
    */
   updateSprint(opts: { data: Object }, callback?: any): Promise;

   /**
    * Perform a partial update of a sprint.
    *
    * @method partiallyUpdateSprint
    * @memberOf AgileSprintClient#
    * @param {object} opts The request options sent to the Jira API.
    * @param {Object} opts.data The sprint data in the form of POST body to the
    *   Jira API.
    * @param {string} [opts.data.sprintId] The id of the sprint.  EX: 331.
    * @param callback Called when the sprint has been updated.
    * @return {Promise} Resolved when the sprint has been updated.
    */
   partiallyUpdateSprint(opts: { data: Object }, callback: any): Promise;

   /**
    * Delete an existing sprint.
    *
    * @method deleteSprint
    * @memberOf AgileSprintClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param {string} opts.sprintId The id of the sprint.  EX: 331
    * @param [callback] Called when the sprint is deleted.
    * @return {Promise} Resolved when the sprint is deleted.
    */
   deleteSprint(opts: { sprintId: string }, callback?: any): Promise;

   /**
    * Return all issues in a sprint, for a given sprint id.
    *
    * @method getSprintIssues
    * @memberOf AgileSprintClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param opts.sprintId The sprint id.
    * @param {string} jql Filters results using a JQL query.
    * @param {boolean} validateQuery Specifies whether to valide the JQL query.
    * @param {string} fields The list of fields to return for each issue.
    * @param {string} expand A comma-separated list of the parameters to expand.
    * @param [callback] Called when the issues are returned.
    * @return {Promise} Resolved when the issues are returned.
    */
   getSprintIssues(opts: { sprintId: any }, jql: string, validateQuery: boolean, fields: string, expand: string, callback?: any): Promise;

   /**
    * Move issues to a sprint, for a given sprint id.
    *
    * @method moveSprintIssues
    * @memberOf AgileSprintClient#
    * @param {Object} opts The issue data in the form of POST body to the
    *   Jira API.
    * @param {string} [opts.sprintId] The sprint id.
    * @param [callback] Called when the sprint has been retrieved.
    * @return {Promise} Resolved when the sprint has been retrieved.
    */
   moveSprintIssues(opts: { sprintId: string }, callback?: any): Promise;

   /**
    * Swap the position of the sprint (given by sprint id) with the second
    * sprint.
    *
    * @method swapSprint
    * @memberOf AgileSprintClient#
    * @param {Object} swapped The data in the form of POST body to the Jira API.
    * @param {string} [swapped.sprintId] The id of the sprint.  EX: 311
    * @param [callback] Called when the sprint has been retrived.
    * @return {Promise} Resolved when the sprint has been retrived.
    */
   swapSprint(swapped: { sprintId: string }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/status'
 *
 * @param {JiraClient} jiraClient
 * @constructor StatusClient
 */
declare class StatusClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/status'
    *
    * @param {JiraClient} jiraClient
    * @constructor StatusClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of all statuses visible to the user
    *
    * @method getAllStatuses
    * @memberOf StatusClient#
    * @param opts Ignored
    * @param [callback] Called when statuses have been retrieved.
    * @return {Promise} Resolved when statuses have been retrieved.
    */
   getAllStatuses(opts: any, callback?: any): Promise;

   /**
    * Get a full representation of the status that has the given id.
    *
    * @method getStatus
    * @memberOf StatusClient#
    * @param opts The options sent to the Jira API
    * @param opts.statusId A String containing a status id
    * @param [callback] Called when the status has been retrieved.
    * @return {Promise} Resolved when the status has been retrieved.
    */
   getStatus(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/statuscategory'
 *
 * @param {JiraClient} jiraClient
 * @constructor StatusCategoryClient
 */
declare class StatusCategoryClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/statuscategory'
    *
    * @param {JiraClient} jiraClient
    * @constructor StatusCategoryClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of all statusCategories visible to the user
    *
    * @method getAllStatusCategories
    * @memberOf StatusCategoryClient#
    * @param opts Ignored
    * @param [callback] Called when the statusCategories have been retrieved.
    * @return {Promise} Resolved when the statusCategories have been retrieved.
    */
   getAllStatusCategories(opts: any, callback?: any): Promise;

   /**
    * Get a full representation of the statusCategory that has the given id or key.
    *
    * @method getStatusCategory
    * @memberOf StatusCategoryClient#
    * @param opts The options sent to the Jira API
    * @param opts.statusCategoryIdOrKey A String containing a statusCategory id
    * @param [callback] Called when the statusCategory has been retrieved.
    * @return {Promise} Resolved when the statusCategory has been retrieved.
    */
   getStatusCategory(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/version'
 * @param {JiraClient} jiraClient
 * @constructor VersionClient
 */
declare class VersionClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/version'
    * @param {JiraClient} jiraClient
    * @constructor VersionClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Creates a version
    *
    * @method createVersion
    * @memberOf VersionClient#
    * @param {Object} opts The request options sent to Jira.
    * @param {Object} opts.version See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3549}
    * @param [callback] Called when the version has been created.
    * @return {Promise} Resolved when the version has been created.
    */
   createVersion(opts: { version: Object }, callback?: any): Promise;

   /**
    * Modify a version's sequence within a project. The move version bean has 2 alternative field value pairs
    * (opts.position or opts.after).  One and only one of these two must be provided.
    *
    * @method moveVersion
    * @memberOf VersionClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param {string} opts.versionId The id of the version to move.
    * @param {string} [opts.position] An absolute position, which may have a value of 'First', 'Last', 'Earlier' or
    *     'Later'. Must be provided if opts.after is missing.
    * @param {string} [opts.after] A version to place this version after. The value should be the self link of another
    *     version. Must be provided if opts.position is missing
    * @param [callback] Called when the version has been moved.
    * @return {Promise} Resolved when the version has been moved.
    */
   moveVersion(opts: { versionId: string, position: string, after: string }, callback?: any): Promise;

   /**
    * Get a project version.
    *
    * @method getVersion
    * @memberOf VersionClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param {string|number} opts.versionId The id of the version to retrieve.
    * @param [callback] Called when the version is retrieved.
    * @return {Promise} Resolved when the version is retrieved.
    */
   getVersion(opts: { versionId: (string|number) }, callback?: any): Promise;

   /**
    * Modify an existing version; any omitted fields will be ignored.
    *
    * @method editVersion
    * @memberOf VersionClient#
    * @param {Object} opts The request options sent to Jira.
    * @param {string} opts.versionId The id of the version to edit.
    * @param {Object} opts.version See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3619}
    * @param [callback] Called when the version has been modified.
    * @return {Promise} Resolved when the version has been modified.
    */
   editVersion(opts: { versionId: string, version: Object }, callback?: any): Promise;

   /**
    * Get a bean containing the number of fixed in and affected issues for the given version.
    *
    * @method getRelatedIssueCounts
    * @memberOf VersionClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.versionId The version for which to retrieve related issues.
    * @param [callback] Called when the count has been retrieved.
    * @return {Promise} Resolved when the count has been retrieved.
    */
   getRelatedIssueCounts(opts: any, callback?: any): Promise;

   /**
    * Get the number of unresolved issues for the given version
    *
    * @method getUnresolvedIssueCount
    * @memberOf VersionClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.versionId The version for which to retrieve unresolved issues.
    * @param [callback] Called when the count has been retrieved.
    * @return {Promise} Resolved when the count has been retrieved.
    */
   getUnresolvedIssueCount(opts: any, callback?: any): Promise;

   /**
    * Get the remote version links associated with the given version id.
    *
    * @method getRemoteLinks
    * @memberOf VersionClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.versionId The version for which to retrieve remote links.
    * @param [callback] Called when the links have been retrieved.
    * @return {Promise} Resolved when the links have been retrieved.
    */
   getRemoteLinks(opts: any, callback?: any): Promise;

   /**
    * Create a remote version link via POST. The link's global id will be taken from the JSON payload if provided;
    * otherwise, it will be generated.
    *
    * @method createRemoteLink
    * @memberOf VersionClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.versionId The version for which to retrieve unresolved issues.
    * @param opts.remoteLink See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3753}
    * @param [callback] Called when the remote link has been created.
    * @return {Promise} Resolved when the remote link has been created.
    */
   createRemoteLink(opts: any, callback?: any): Promise;

   /**
    * Delete a remote version link.
    *
    * @method deleteRemoteLink
    * @memberOf VersionClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.versionId The version id
    * @param opts.remoteLinkId The global id of the remote link
    * @param [callback] Called when the link has been deleted.
    * @return {Promise} Resolved when the link has been deleted.
    */
   deleteRemoteLink(opts: any, callback?: any): Promise;

   /**
    * Delete a project version.
    *
    * @method deleteVersion
    * @memberOf VersionClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param {string|number} opts.versionId The id of the version to delete.
    * @param [callback] Called when the version is deleted.
    * @return {Promise} Resolved when the version is deleted.
    */
   deleteVersion(opts: { versionId: (string|number) }, callback?: any): Promise;

   /**
    * Delete all remote version links for a given version id.
    *
    * @method deleteAllRemoteLinks
    * @memberOf VersionClient#
    * @param {Object} opts The request options sent to the Jira API.
    * @param {string|number} opts.versionId The id of the version to delete.
    * @param [callback] Called when the version is deleted.
    * @return {Promise} Resolved when the version is deleted.
    */
   deleteAllRemoteLinks(opts: { versionId: (string|number) }, callback?: any): Promise;

   /**
    * Returns the remote version links for a given global id.
    *
    * @method getGlobalRemoteLink
    * @memberOf VersionClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.globalId The global id of the remote resource that is linked to the versions
    * @param [callback] Called when the remote link is returned.
    * @return {Promise} Resolved when the remote link is returned.
    */
   getGlobalRemoteLink(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/webhook/1.0/webhook'
 *
 * @param {JiraClient} jiraClient
 * @constructor WebhookClient
 */
declare class WebhookClient {
   /**
    * Used to access Jira REST endpoints in '/rest/webhook/1.0/webhook'
    *
    * @param {JiraClient} jiraClient
    * @constructor WebhookClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns a list of all registered webhooks.
    *
    * @method getAllWebhooks
    * @memberOf WebhookClient#
    * @param opts Ignored
    * @param [callback] Called when the webhooks have been retrieved.
    * @return {Promise} Resolved when the webhooks have been retrieved.
    */
   getAllWebhooks(opts: any, callback?: any): Promise;

   /**
    * Returns a webhook with a specific ID.
    *
    * @method getWebhook
    * @memberOf WebhookClient#
    * @param opts The options sent to the JIRA API.
    * @param opts.webhookId The numerical webhook ID.
    * @param [callback] Called when the webhook has been retrieved.
    * @return {Promise} Resolved when the webhook has been retrieved.
    */
   getWebhook(opts: any, callback?: any): Promise;

   /**
    * Registers a new webhook.
    *
    * @method createWebhook
    * @memberOf WebhookClient#
    * @param opts The options sent to the JIRA API.
    * @param opts.name The name of the webhook.
    * @param opts.url The URL of the webhook.
    * @param opts.events An array of events with which the webhook should be registered. See
    *   {@link https://developer.atlassian.com/jiradev/jira-apis/webhooks#Webhooks-configureConfiguringawebhook}.
    * @param opts.enabled Whether the webhook is enabled.
    * @param opts.filter An object containing filter configuration.
    * @param opts.filter.issue-related-events-section A filter for issues, written in JQL.
    * @param opts.excludeBody Whether to send an empty body to the webhook URL.
    * @param [callback] Called when the webhook has been retrieved.
    * @return {Promise} Resolved when the webhook has been retrieved.
    */
   createWebhook(opts: any, callback?: any): Promise;

   /**
    * Deletes a registered webhook.
    *
    * @method deleteWebhook
    * @memberOf WebhookClient#
    * @param opts The options sent to the JIRA API.
    * @param opts.webhookId The numerical webhook ID.
    * @param [callback] Called when the webhook has been retrieved.
    * @return {Promise} Resolved when the webhook has been retrieved.
    */
   deleteWebhook(opts: any, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/workflow'
 *
 * @param {JiraClient} jiraClient
 * @constructor WorkflowClient
 */
declare class WorkflowClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/workflow'
    *
    * @param {JiraClient} jiraClient
    * @constructor WorkflowClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Returns all workflows.
    *
    * @method getWorkflows
    * @memberOf WorkflowClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {string} [opts.workflowName] The name of the workflow to retrieve.
    * @param [callback] Called when the workflow(s) have been retrieved.
    * @return {Promise} Resolved when the workflow(s) have been retrieved.
    */
   getWorkflows(opts: { workflowName: string }, callback?: any): Promise;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/workflowscheme'
 * @param {JiraClient} jiraClient
 * @constructor WorkflowSchemeClient
 */
declare class WorkflowSchemeClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/workflowscheme'
    * @param {JiraClient} jiraClient
    * @constructor WorkflowSchemeClient
    */
   constructor(jiraClient: JiraClient);

   /**
    * Create a new workflow scheme. The body contains a representation of the new scheme. Values not passed are
    * assumed to be set to their defaults.
    *
    * @method createWorkflowScheme
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowScheme See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2196}
    * @param [callback] Called when the workflow scheme has been created.
    * @return {Promise} Resolved when the workflow scheme has been created.
    */
   createWorkflowScheme(opts: any, callback?: any): Promise;

   /**
    * Update the passed workflow scheme. The body of the request is a representation of the workflow scheme. Values
    * not passed are assumed to indicate no change for that field. The passed representation can have its
    * updateDraftIfNeeded flag set to true to indicate that the draft should be created and/or updated when the actual
    * scheme cannot be edited (e.g. when the scheme is being used by a project). Values not appearing the body will
    * not be touched.
    *
    * @method editWorkflowScheme
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.workflowScheme See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2305}
    * @param [callback] Called when the workflow scheme has been edited.
    * @return {Promise} Resolved when the workflow scheme has been edited.
    */
   editWorkflowScheme(opts: any, callback?: any): Promise;

   /**
    * Get the requested workflow scheme
    *
    * @method getWorkflowScheme
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param [opts.returnDraftIfExists=false] when true indicates that a scheme's draft, if it exists, should be
    *     queried instead of the scheme itself.
    * @param [callback] Called when the workflow scheme has been retrieved.
    * @return {Promise} Resolved when the workflow scheme has been retrieved.
    */
   getWorkflowScheme(opts: any, callback?: any): Promise;

   /**
    * Delete the passed workflow scheme.
    *
    * @method deleteWorkflowScheme
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param [callback] Called when the workflow scheme has been deleted.
    * @return {Promise} Resolved when the workflow scheme has been deleted.
    */
   deleteWorkflowScheme(opts: any, callback?: any): Promise;

   /**
    * Create a draft for the passed scheme. The draft will be a copy of the state of the parent.
    *
    * @method createDraft
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param [callback] Called when the draft has been created.
    * @return {Promise} Resolved when the draft has been created.
    */
   createDraft(opts: any, callback?: any): Promise;

   /**
    * Get the default workflow from the passed workflow scheme.
    *
    * @method getDefaultWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.returnDraftIfExists when true indicates that a scheme's draft, if it exists, should be queried
    *     instead of the scheme itself.
    * @param [callback] Called when the default workflow is returned.
    * @return {Promise} Resolved when the default workflow is returned.
    */
   getDefaultWorkflow(opts: any, callback?: any): Promise;

   /**
    * Remove the default workflow from the passed workflow scheme.
    *
    * @method removeDefaultWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.updateDraftIfNeeded when true will create and return a draft when the workflow scheme cannot be
    *     edited (e.g. when it is being used by a project).
    * @param [callback] Called when the defaul workflow has been removed.
    * @return {Promise} Resolved when the defaul workflow has been removed.
    */
   removeDefaultWorkflow(opts: any, callback?: any): Promise;

   /**
    * Remove the default workflow from the passed workflow scheme.
    *
    * @method setDefaultWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.workflowName The name of the new deafault workflow
    * @param opts.updateDraftIfNeeded when true will create and return a draft when the workflow scheme cannot be
    *     edited (e.g. when it is being used by a project).
    * @param [callback] Called when the default workflow has been updated.
    * @return {Promise} Resolved when the default workflow has been updated.
    */
   setDefaultWorkflow(opts: any, callback?: any): Promise;

   /**
    * Get the requested draft workflow scheme
    *
    * @method getDraft
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param [callback] Called when the draft has been retrieved.
    * @return {Promise} Resolved when the draft has been retrieved.
    */
   getDraft(opts: any, callback?: any): Promise;

   /**
    * Update a draft workflow scheme. The draft will created if necessary. The body is a representation of the
    * workflow scheme. Values not passed are assumed to indicate no change for that field.
    *
    * @method editDraft
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.draft See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2575}
    * @param [callback] Called when the draft has been edited.
    * @return {Promise} Resolved when the draft has been edited.
    */
   editDraft(opts: any, callback?: any): Promise;

   /**
    * Delete the passed draft workflow scheme.
    *
    * @method deleteDraft
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param [callback] Called when the draft has been deleted.
    * @return {Promise} Resolved when the draft has been deleted.
    */
   deleteDraft(opts: any, callback?: any): Promise;

   /**
    * Get the default workflow from the passed draft workflow scheme
    *
    * @method getDraftDefaultWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param [callback] Called when the default workflow is returned.
    * @return {Promise} Resolved when the default workflow is returned.
    */
   getDraftDefaultWorkflow(opts: any, callback?: any): Promise;

   /**
    * Remove the default workflow from the passed workflow scheme.
    *
    * @method setDraftDefaultWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.workflowName The name of the new default workflow
    * @param [callback] Called when the default workflow has been updated.
    * @return {Promise} Resolved when the default workflow has been updated.
    */
   setDraftDefaultWorkflow(opts: any, callback?: any): Promise;

   /**
    * Remove the default workflow from the passed draft workflow scheme.
    *
    * @method removeDraftDefaultWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param [callback] Called when the defaul workflow has been removed.
    * @return {Promise} Resolved when the defaul workflow has been removed.
    */
   removeDraftDefaultWorkflow(opts: any, callback?: any): Promise;

   /**
    * Returns the issue type mapping for the passed workflow scheme.
    *
    * @method getIssueType
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.issueType The issue type
    * @param opts.returnDraftIfExists when true indicates that a scheme's draft, if it exists, should be queried
    *     instead of the scheme itself.
    * @param [callback] Called when the issue type has been retrieved.
    * @return {Promise} Resolved when the issue type has been retrieved.
    */
   getIssueType(opts: any, callback?: any): Promise;

   /**
    * Set the issue type mapping for the passed scheme. The passed representation can have its updateDraftIfNeeded
    * flag set to true to indicate that the draft should be created/updated when the actual scheme cannot be edited.
    *
    * @method editIssueType
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.issueType The issue type
    * @param opts.workflow The new workflow
    * @param opts.updateDraftIfNeeded when true will create and return a draft when the workflow scheme cannot be
    *     edited (e.g. when it is being used by a project).
    * @param [callback] Called when the issue type has been edited
    * @return {Promise} Resolved when the issue type has been edited
    */
   editIssueType(opts: any, callback?: any): Promise;

   /**
    * Remove the specified issue type mapping from the scheme.
    *
    * @method removeIssueType
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.issueType The issue type
    * @param [callback] Called when the issue type mapping has been removed.
    * @return {Promise} Resolved when the issue type mapping has been removed.
    */
   removeIssueType(opts: any, callback?: any): Promise;

   /**
    * Returns the issue type mapping for the passed draft workflow scheme.
    *
    * @method getDraftIssueType
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API.
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.issueType The issue type
    * @param [callback] Called when the issue type has been retrieved.
    * @return {Promise} Resolved when the issue type has been retrieved.
    */
   getDraftIssueType(opts: any, callback?: any): Promise;

   /**
    * Set the issue type mapping for the passed draft scheme.
    *
    * @method editDraftIssueType
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.issueType The issue type
    * @param opts.workflow The new workflow
    * @param [callback] Called when the issue type has been edited
    * @return {Promise} Resolved when the issue type has been edited
    */
   editDraftIssueType(opts: any, callback?: any): Promise;

   /**
    * Remove the specified issue type mapping from the scheme.
    *
    * @method removeDraftIssueType
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.issueType The issue type
    * @param [callback] Called when the issue type mapping has been removed.
    * @return {Promise} Resolved when the issue type mapping has been removed.
    */
   removeDraftIssueType(opts: any, callback?: any): Promise;

   /**
    * Returns the workflow mappings or requested mapping to the caller for the passed scheme.
    *
    * @method getWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.workflowName The name of the workflow.
    * @param [callback] Called when the workflow has been retrieved.
    * @return {Promise} Resolved when the workflow has been retrieved.
    */
   getWorkflow(opts: any, callback?: any): Promise;

   /**
    * Returns the workflow mappings or requested mapping to the caller for the passed draft scheme.
    *
    * @method getDraftWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param opts The request options sent to the Jira API
    * @param opts.workflowSchemeId The id of the workflow scheme.
    * @param opts.workflowName The name of the workflow.
    * @param [callback] Called when the workflow has been retrieved.
    * @return {Promise} Resolved when the workflow has been retrieved.
    */
   getDraftWorkflow(opts: any, callback?: any): Promise;

   /**
    * Update the scheme to include the passed mapping. The body is a representation of the workflow mapping. Values
    * not passed are assumed to indicate no change for that field.
    *
    * @method editWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.workflowSchemeId The id of the workflow scheme.
    * @param {string} opts.workflowName The name of the workflow.
    * @param {Array} opts.issueTypes The new issue types to inclue in the workflow.
    *      See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2509}
    * @param [callback] Called when the workflow has been edited.
    * @return {Promise} Resolved when the workflow has been edited.
    */
   editWorkflow(opts: { workflowSchemeId: number, workflowName: string, issueTypes: Array }, callback?: any): Promise;

   /**
    * Update the draft scheme to include the passed mapping. The body is a representation of the workflow mapping.
    * Values not passed are assumed to indicate no change for that field.
    *
    * @method editDraftWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.workflowSchemeId The id of the workflow scheme.
    * @param {string} opts.workflowName The name of the workflow.
    * @param {Array} opts.issueTypes The new issue types to inclue in the workflow.
    *      See {@link https://docs.atlassian.com/jira/REST/latest/#d2e2670 }
    * @param [callback] Called when the workflow has been edited.
    * @return {Promise} Resolved when the workflow has been edited.
    */
   editDraftWorkflow(opts: { workflowSchemeId: number, workflowName: string, issueTypes: Array }, callback?: any): Promise;

   /**
    * Delete the passed workflow from the workflow scheme.
    *
    * @method deleteWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.workflowSchemeId The id of the workflow scheme.
    * @param {string} opts.workflowName The name of the workflow.
    * @param [callback] Called when the workflow has been edited.
    * @return {Promise} Resolved when the workflow has been edited.
    */
   deleteWorkflow(opts: { workflowSchemeId: number, workflowName: string }, callback?: any): Promise;

   /**
    * Delete the passed workflow from the workflow draft scheme.
    *
    * @method deleteDraftWorkflow
    * @memberOf WorkflowSchemeClient#
    * @param {Object} opts The request options sent to the Jira API
    * @param {number} opts.workflowSchemeId The id of the workflow scheme.
    * @param {string} opts.workflowName The name of the workflow.
    * @param [callback] Called when the workflow has been edited.
    * @return {Promise} Resolved when the workflow has been edited.
    */
   deleteDraftWorkflow(opts: { workflowSchemeId: number, workflowName: string }, callback?: any): Promise;

   /**
    * Build out the request options necessary to make a particular API call.
    *
    * @private
    * @method buildRequestOptions
    * @memberOf WorkflowSchemeClient#
    * @param {Object} opts The arguments passed to the method.
    * @param {number} opts.workflowSchemeId The id of the workflowScheme to use in the path.
    * @param {Array} [opts.fields] The fields to include
    * @param {Array} [opts.expand] The fields to expand
    * @param {string} path The path of the endpoint following /workflowScheme/{id}
    * @param {string} method The request method.
    * @param {Object} [body] The request body, if any.
    * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
    * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
    */
   private buildRequestOptions(opts: { workflowSchemeId: number, fields: Array, expand: Array }, path: string, method: string, body?: Object, qs?: Object): Object;

}

/**
 * Used to access Jira REST endpoints in '/rest/api/2/worklog'
 *
 * @param {JiraClient} jiraClient
 * @constructor WorkLogClient
 */
declare class WorkLogClient {
   /**
    * Used to access Jira REST endpoints in '/rest/api/2/worklog'
    *
    * @param {JiraClient} jiraClient
    * @constructor WorkLogClient
    */
   constructor(jiraClient: JiraClient);

}

