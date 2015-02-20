angular-github-dashboard
============

This is a very simple demo project to showcase how we can build a single page dashboard application with AngularJS to discover interesting stuff about GitHub repositories or users.

###Try the [DEMO](http://zsoltiii.github.io/angular-github-dashboard/app/index.html)!

![screenshot](http://i.imgur.com/850yb2y.png "Opening screen")

![screenshot](http://i.imgur.com/sG4g5va.png "Search results")

This app is using the [Github API v3](https://developer.github.com/v3/) via unauthenticated requests, which is unfortunately limited and allows only 60 requests per hour. This is fine for a demo but if you are keen to take this to an other level please feel free to fork and implement your own authentication against the API.

The concept of the Dashboard is very simple, start by searching for a Github user, then their basic information will be shown, including a list of public repositories.

Drilling in, repos will reveal further details with an option to list their current issues and watchers.

That's pretty much it.

## Getting started

To get you started you can simply clone the repository and install the npm and bower dependencies.

## Prerequisites

You need git to clone the angular-github-dashboard repository. You can get git from http://git-scm.com/.

There are also a number of node.js tools to initialize and test the app. You must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/.

## Clone angular-github-dashboard

Clone the angular-github-dashboard repository using git:

```
git clone https://github.com/zsoltiii/angular-github-dashboard.git
cd angular-github-dashboard
```

## Install dependencies

The dependencies in this project are two kinds, development tools and front end libraries.

- the tools are handled by the [node package manager][npm].
- front end libraries by bower, a [client-side package manager][bower].

The project is pre-configured to automatically run npm and bower installs so you can simply do:

```
npm install
```

and behind the scenes this will also call `bower install`.

You should find that you have two new folders in your project:

- node_modules - contains the npm packages
- bower_components - contains the front end stuff including the angular framework

## Run

The application can be run on npm's simple http-server. The simplest way to start the server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/` and enjoy.

## Directory Layout

```
app/                        --> all of the source files for the application
    css/
        app.css             --> default stylesheet
    js/
        app.js              --> main application module
        controllers.js      --> angular controllers
        services.js         --> angular services
    index.html              --> app layout file (the main html template file of the app)
    tests/                  --> all we need for testing
        e2e/
            scenarios.spec.js        --> end-to-end scenarios to be run by Protractor
        mock/
            data/               --> all the mock data in json format
            js/                 --> all the mock data defined as angular values
        unit/
            controllers.spec.js         --> unit tests for controllers
            services.spec.js            --> unit tests for services
    karma.conf.js               --> config file for running unit tests with Karma
    protractor-conf.js          --> config file for running end-to-end tests with Protractor
.gitignore                      --> useful bits for git to ignore
README.md                       --> this documentation
LICENSE                         --> MIT license
bower.json                      --> bower dependency definitions
package.json                    --> npm dependency definitions
```

## Testing

There are two kinds of tests for this application: unit tests and end-to-end tests.

## Unit tests

The angular-github-dashboard has a number of unit tests - fingers crossed - with 100% coverage. These are written in
[Jasmine][jasmine], which can run with the [Karma Test Runner][karma]. There is a Karma
configuration file that describes how.

* the configuration is found at `karma.conf.js`
* the unit tests are found in tests/unit/ folder and named accordingly what they test: controllers or services

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

## End-to-end tests

The guys at Angular built Protractor, an end-to-end test framework for AngularJS applications. Protractor runs tests against the application running in a real browser, interacting with it as a user would.

Protractor simulates interaction with our web app and verifies that the application responds correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

npm supports custom scripts, defined in package.json, that you can use easily from the console. Running end-to-end testing therefore is simple as:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the development server.

The end-to-end tests are written in [Jasmine][jasmine], the same way as the unit tests above.

* the configuration is found at `protractor.conf.js`
* the scenarios file is found in tests/e2e/ folder


## References

- [AngularJS](https://angularjs.org/)
- [git](http://git-scm.com/)
- [bower](http://bower.io)
- [npm](https://www.npmjs.org/)
- [node](http://nodejs.org)
- [protractor](https://github.com/angular/protractor)
- [jasmine](http://jasmine.github.io)
- [karma](http://karma-runner.github.io)
- [http-server](https://github.com/nodeapps/http-server)