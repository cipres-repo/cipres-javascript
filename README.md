# Cipres-ember

This README outlines the details of collaborating on this Ember application.

This sample web application demonstrates a way to consume the CIPRES REST API service
using Ember.js. The application was developed using [ember-cli](http://www.ember-cli.com/)
and utilizes the [xml2json](http://www.thomasfrank.se/xml_to_json.html) library by Thomas Frank
for XML data parsing, as well as the [Bootstrap CSS Framework](http://getbootstrap.com/)
 for styling of the application.

The application allows users to create, list, and view information for jobs using the
CIPRES REST API. Unfortunately, due to the limitations of JavaScript, the application does not allow
for downloading of outputted files. However, this can be remedied through proper server-side
 scripting. [End user documentation](docs/end_user_documentation.md) can be found in the `docs` directory.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone https://github.com/robreys/cipres-ember.git` this repository
* change into the new directory
* `npm install`
* `bower install`

## Preparation

* Register for a [CIPRES REST account](https://bumper.sdsc.edu/restusers/docs/guide.html;jsessionid=4B3813FEFA3E2D9D77144705B06A8E1C#Register)
* Update `app/initializers/set-user.js` to include your CIPRES Application ID

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* CIPRES REST v1.1 Users Guide: https://bumper.sdsc.edu/restusers/docs/guide.html;jsessionid=4B3813FEFA3E2D9D77144705B06A8E1C
* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

