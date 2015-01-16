# JavaScript Jira API Wrapper for NodeJS

Node.JS module which provides easy-to-use access to the Jira REST API.

## Installation

Install with [npm](http://npmjs.org/):

```
    $ npm install jira-connector
```

Install via Git clone:

```
    $ git clone https://github.com/jenjinstudios/jira-connector.git
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
    auth: {
        username: 'SirUserOfName',
        password: 'Password123'
    }
});
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

JiraClient.oauth_util.getAuthorizeUrl({
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
        oauth_verified: 'verifier-code-from-jira',
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

## License

[MIT license](http://opensource.org/licenses/MIT)
