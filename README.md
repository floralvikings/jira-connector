# JavaScript Jira API Wrapper for NodeJS

Node.JS module which provides easy-to-use access to the Jira REST API.

## Important Change in Version 1.0.0

Starting with version 1.0.0, all functions and parameters utilize ```xxxId``` instead of ```xxxID```.
Prior to this update, this naming convention was inconsistent and easily confused.

Please update your code accordingly.

## Installation

Install with [npm](http://npmjs.org/):

```
    $ npm install jira-connector
```

Install via Git clone:

```
    $ git clone https://github.com/floralvikings/jira-connector.git
    $ cd jira-connector
    $ npm install
```

## Documentation

The documentation for jira-connector can be found in the source; If you'd like to view
the source as an HTML document, you can use [JSDoc](http://usejsdoc.org/) to generate these
pages.  Simply run:

```
    $ jsdoc -c jsdoc.json
```

In the jira-connector source directory.  This will create a ```docs``` directory, containing the HTML
markup for the docs.

Also, the [official Jira API docs](https://docs.atlassian.com/jira/REST/latest/) are very useful; many of
the functions in jira-connector use the exact same format as the request bodies of these endpoints.

## Example

Retrieve an issue from Jira, and print its summary to the console.

```javascript

var JiraClient = require('jira-connector');

var jira = new JiraClient( {
    host: 'jenjinstudios.atlassian.net'
});

jira.issue.getIssue({
    issueKey: 'JWR-19'
}, function(error, issue) {
    console.log(issue.fields.summary);
});

```

First, the ```JiraApi``` class is imported from the ```jira-connector``` module.  This class
provides access to the Jira REST endpoints, organized into related classes.

The ```issue``` property of the ```JiraApi``` class is used to retrieve and modify Jira Issues.

All of the methods in the jira-connector API classes take two arguments; the ```opts``` and ```callback```.

* The ```opts``` argument specifies the options that will be used when communicating with the Jira API.  For a detailed
  list of options, see the documentation for the method into which you are passing the options.
* The ```callback``` argument should be a function expecting two arguments; and error, and the results of the API
  request.

## Authentication

Depending on the Jira instance to which you are connecting, authentication may or may not be required
for various API calls.

jira-connector supports two forms of authentication:

### Basic Authentication

This is not recommended; it will require you to provide a username and password each time you connect to the
Jira instance.  However, jira-connector supports it for users who are unable to use OAuth.

Example:

```javascript
var JiraClient = require('jira-connector');

var jira = new JiraClient( {
    host: 'jenjinstudios.atlassian.net',
    basic_auth: {
        username: 'SirUserOfName',
        password: 'Password123'
    }
});
```


### Basic Authentication (Base64)

Also not recommended, but slightly better than the above; it will require you to provide a Base64 encoded username
and password (a Base64 encoding in the format of "username:password") each time you connect to the Jira instance.

More examples [here](https://developer.atlassian.com/jiradev/jira-apis/jira-rest-apis/jira-rest-api-tutorials/jira-rest-api-example-basic-authentication).

Example:

```javascript
var JiraClient = require('jira-connector');

var jira = new JiraClient( {
    host: 'jenjinstudios.atlassian.net',
    basic_auth: {
        base64: 'U2lyVXNlck9mTmFtZTpQYXNzd29yZDEyMw=='
    }
});

// Base64 encoding of 'SirUserOfName:Password123'
```

### OAuth Authentication

This should be the preferred method of authentication; it is more secure and does not require disclosing
your password.

However, setting up OAuth access in Jira can be somewhat complicated; first the Jira administrator must create
an Application Link; for instructions on how to do this, see
[Linking to Another Application](https://confluence.atlassian.com/display/JIRA/Linking+to+Another+Application).

[This example](https://developer.atlassian.com/display/JIRADEV/JIRA+REST+API+Example+-+OAuth+authentication) may also
be helpful in configuring OAuth Access.

Once the Application Link has been created, you will need the private key that corresponds to the public key used to
create the link, and the consumer key that was provided when the link was created.

Once you have this data, you will need to generate an OAuth token and secret for your account; jira-connector provides
helper functions for exactly this purpose:

```javascript
var JiraClient = require('./index.js');

JiraClient.oauth_util.getAuthorizeURL({
    host: 'jenjinstudios.atlassian.net',
    oauth: {
        consumer_key: 'your-consumer-key',
        private_key: '-----BEGIN RSA PRIVATE KEY-----\n' +
        'SomePrivateKeyHere\n' +
        '-----END RSA PRIVATE KEY-----'
    }
}, function (error, oauth) {
    console.log(oauth);
});
```

This will output something similar to the following:

```javascript
{
    url: 'https://jenjinstudios.atlassian.net/plugins/servlet/oauth/authorize?oauth_token=some-token-here',
    token: 'some-token-here',
    token_secret: 'some-secret-here'
}
```

You can then visit the specified URL, which will display a page asking you to allow or deny the request for access.
Allowing access will display a verifier code.  Once you have this code, you can swap out your current OAuth token
for an Access Token with all the permissions of your account; jira-connector provides a function to help with this:

```javascript
var JiraClient = require('./index.js');

JiraClient.oauth_util.swapRequestTokenWithAccessToken({
    host: 'jenjinstudios.atlassian.net',
    oauth: {
        token: 'your-oauth-token',
        token_secret: 'your-token-secret',
        oauth_verifier: 'verifier-code-from-jira',
        consumer_key: 'your-consumer-key',
        private_key: '-----BEGIN RSA PRIVATE KEY-----\n' +
        'SomePrivateKeyHere\n' +
        '-----END RSA PRIVATE KEY-----'
    }
}, function (error, accessToken) {
    console.log(accessToken);
});
```

This will query Jira for an Access Token, which will then be printed to the screen.  Finally, you're ready to access
Jira with OAuth!

```javascript
var JiraClient = require('./index.js');

var jira = new JiraClient({
    host: 'jenjinstudios.atlassian.net',
    oauth: {
        consumer_key: 'your-consumer-key',
        private_key: '-----BEGIN RSA PRIVATE KEY-----\n' +
        'SomePrivateKey\n' +
        '-----END RSA PRIVATE KEY-----',
        token: 'your-access-token',
        token_secret: 'your-token-secret'
    }
});

// Jira is now authenticted with your account!
```

### Cookie Jar

You can also use a Cookie Jar for your request. It could be an easier way to prompt for a login only once, without the
pain of setting up an OAuth method.

For example, using `though-cookie-filestore`:
```javascript
var JiraClient = require('../jira-connector'),
    FileCookieStore = require('tough-cookie-filestore'),

    request = require('request'),
    path = require('path');

var jar = request.jar(new FileCookieStore(path.join(__dirname, 'cookies.json')));

// For the first connection
var jira = new JiraClient( {
    host: 'jenjinstudios.atlassian.net',
    basic_auth: {
        username: 'SirUserOfName',
        password: 'Password123'
    },
    cookie_jar: jar
});

// For the following connections
var jira = new JiraClient( {
    host: 'jenjinstudios.atlassian.net',
    cookie_jar: jar
});
```

In this example, all your cookies are save in a file, `cookies.json`. Currently, the file **MUST** exist, it's a
limitation from `though-cookie-filestore`...

You can now only use the Cookie Jar for all the following request, as long as the file exists and the cookie
is still valid!

## Supported API Calls

* applicationProperties (/rest/api/2/application-properties)
  * getProperties
  * setProperty
* attachment (/rest/api/2/atachment)
  * getAttachment
  * deleteAttachment
  * getGlobalAttachmentMetadata
* auditing (/rest/api/2/auditing)
  * getAudits
  * createAudit
* avatar (/rest/api/2/avatar) (Untested; use at your own peril)
  * getAvatars
  * createTemporaryAvatar
  * cropTemporaryAvatar
* board (/rest/agile/1.0/board)
  * getAllBoards
  * getBoard
  * getIssuesForBoard
  * getSprintsForBoard
* comment (/rest/api/2/comment)
  * getCommentPropertyKeys
  * setCommentProperty
  * getCommentProperty
  * deleteCommentProperty
* component (/rest/api/2/component)
  * getComponent
  * createComponent
  * editComponent
  * deleteComponent
  * getRelatedIssueCount
* customFieldOption (/rest/api/2/customFieldOptions)
  * getCustomFieldOption
* dashboard (/rest/api/2/dashboard)
  * getAllDashboards
  * getDashboard
* field (/rest/api/2/field)
  * getAllFields
  * createCustomField
* filter (/rest/api/2/filter)
  * createFilter
  * getFilter
  * updateFilter
  * deleteFilter
  * getFilterColumns
  * setFilterColumns
  * resetFilterColumns
  * getDefaultShareScope
  * setDefaultShareScope
  * getFavoriteFilters
* group (/rest/api/2/group)
  * createGroup
  * getGroup [DEPRECATED, use getMembers]
  * addUserToGroup
  * removeUserFromGroup
  * deleteGroup
  * getMembers
* groups (/rest/api/2/groups)
  * findGroups
* groupUserPicker (/rest/api/2/groupuserpicker)
  * findUsersAndGroups
* issue (/rest/api/2/issue and /rest/agile/1.0/issue)
  * getIssue (agile api, set `opts.agile: true`)
  * getIssueEstimation (agile api)
  * setIssueEstimation (agile api)
  * setIssueRanks (agile api)
  * createIssue
  * getCreateMetadata
  * bulkCreate
  * getIssue
  * deleteIssue
  * editIssue
  * assignIssue
  * getComments
  * addComment
  * getComment
  * editComment
  * deleteComment
  * getEditMetadata
  * sendEmailNotification
  * getRemoteLinks
  * createRemoteLink
  * updateRemoteLink
  * deleteRemoteLink
  * getRemoteLinkByID
  * updateRemoteLinkByID
  * deleteRemoteLinkByID
  * getTransitions
  * transitionIssue
  * unvote
  * vote
  * getVotes
  * getWatchers
  * addWatcher
  * removeWatcher
  * getWorkLogs
  * addWorkLog
  * updateWorkLog
  * deleteWorkLog
  * addAttachment
  * getProperties
  * setProperty
  * getProperty
  * deleteProperty
  * getIssuePicker
* issueLink (/rest/api/2/issueLink)
  * createIssueLink
  * getIssueLink
  * deleteIssueLink
* issueLinkType (/rest/api/2/issueLinkType)
  * getAvailableTypes
  * createIssueLinkType
  * getIssueLinkType
  * deleteIssueLinkType
  * editIssueLinkType
* issueType (/rest/api/2/issuetype)
  * getAllIssueTypes
  * getIssueType
  * createIssueType
  * deleteIssueType
  * updateIssueType
  * getAlternativeIssueTypes
* jql (/rest/api/2/jql/autocompletedata)
  * getAutoCompleteData
* licenseRole (/rest/api/2/licenserole)
  * getAllLicenseRoles
  * getLicenseRole
  * editLicenseRole
* licenseValidator (/rest/api/2/licenseValidator)
  * validateLicense
* myPermissions (/rest/api/2/mypermissions)
  * getMyPermissions
* myPreferences (/rest/api/2/mypreferences)
  * getPreference
  * editPreference
  * deletePreference
* myself (/rest/api/2/myself)
  * getMyself
  * editMyslef
  * changePassword
* password (/rest/api/2/password)
  * getPasswordPolicy
* permissions (/rest/api/2/permissions)
  * getAllPermissions
* permissionScheme (/rest/api/2/permissionscheme)
 * getAllPermissionSchemes
 * createPermissionScheme
 * getPermissionScheme
 * editPermissionScheme
 * deletePermissionScheme
 * getPermissionSchemeGrants
 * createPermissionGrantInScheme
 * deletePermissionGrantFromScheme
 * getPermissionSchemeGrantById
* priority (/rest/api/2/priority)
  * getAllPriorities
  * getPriority
* project (/rest/api/2/project)
  * getAllProjects
  * getProject
  * getComponents
  * getVersions
  * getStatuses
  * getRoles
  * getRole
  * updateRole
  * addToRole
* projectCategory (/rest/api/2/projectCategory)
  * getAllProjectCategories
  * getProjectCategory
* projectValidate (/rest/api/2/projectvalidate)
  * validateProjectKey
* reindex (/rest/api/2/reindex)
  * doReindex
  * getReindex
* resolution (/rest/api/2/resolution)
  * getAllResolutions
  * getResolution
* roles (/rest/api/2/role) (a.k.a. ProjectRoles)
  * getAll
  * createRole
  * getRoleById
  * updateRole
  * deleteRole
  * getActors
  * addActors
  * removeActor
* screens (/rest/api/2/screens)
  * getAvailableFields
  * getTabs
  * createTab
  * renameTab
  * deleteTab
  * addFieldToTab
  * getFieldsInTab
  * removeFieldFromTab
  * moveFieldOnTab
  * moveTabPosition
  * addFieldToDefaultTab
* search (/rest/api/2/search)
  * search
* securityLevel (/rest/api/2/securitylevel)
  * getSecurityLevel
* serverInfo (/rest/api/2/serverInfo)
  * getServerInfo
* settings (/rest/api/2/settings)
  * setBaseUrl
  * getIssueNavColumns
* sprint (/rest/agile/1.0/sprint)
  * createSprint
  * getSprint
  * updateSprint
  * partiallyUpdateSprint
  * deleteSprint
  * getSprintIssues
  * moveSprintIssues
  * swapSprint
* status (/rest/api/2/status)
  * getAllStatuses
  * getStatus
* statusCategory (/rest/api/2/statuscategory)
  * getAllStatusCategories
  * getStatusCategory
* user (/rest/api/2/user)
  * getUser
  * deleteUser
  * editUser
  * multiProjectSearchAssignable
  * searchAssignable
  * createTemporaryAvatar
  * convertTemporaryAvatar
  * deleteAvatar
  * getAvatars
  * getDefaultColumns
  * setDefaultColumns
  * resetDefaultColumns
  * changePassword
  * searchPermissions
  * searchPicker
  * search
  * viewIssueSearch
* version (/rest/api/2/version)
  * createVersion
  * moveVersion
  * getVersion
  * editVersion
  * getRelatedIssueCounts
  * getUnresolvedIssueCount
  * getRemoteLinks
  * createRemoteLink
  * getRemoteLink
  * deleteRemoteLink
  * deleteVersion
  * deleteAllRemoteLinks
  * getGlobalRemoteLink
* webhook (/rest/webhooks/1.0/webhook)
  * getAllWebhooks
  * getWebhook
  * createWebhook
  * deleteWebhook
* workflow (/rest/api/2/workflow)
  * getWorkflows
* workflowScheme (/rest/api/2/workflowscheme)
  * createWorkflowScheme
  * editWorkflowScheme
  * deleteWorkflowScheme
  * createDraft
  * getDefaultWorkflow
  * removeDefaultWorkflow
  * setDefaultWorkflow
  * getDraft
  * editDraft
  * deleteDraft
  * getDraftDefaultWorkflow
  * setDraftDefaultWorkflow
  * removeDraftDefaultWorkflow
  * getIssueType
  * removeIssueType
  * editIssueType
  * getDraftIssueType
  * editDraftIssueType
  * removeDraftIssueType
  * getWorkflow
  * editWorkflow
  * deleteWorkflow
  * getDraftWorkflow
  * editDraftWorkflow
  * deleteDraftWorkflow
* worklog (/rest/api/2/worklog)
  * getWorklogDeleted
  * worklogList
  * getWorklogUpdated

## License

[MIT license](http://opensource.org/licenses/MIT)
