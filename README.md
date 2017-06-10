# ESTA WebJS
ESTA WebJS is a development stack for web applications with AngularJS, written in ECMAScript 6 and bundled with webpack.

## Features
* AngularJS with ECMAScript6 and Webpack
* Yeoman based generator for fast project startup
* Component based structure
* Build System using maven > gulp > webpack
* Test setup using karma & jasmine on PhantomJS and Selenium Webgrid. Results are sent to SonarQube
* Docker base-image to run the application in nginx within a docker container.

## Credits to
* [NG6 Starter](https://github.com/AngularClass/NG6-starter)
* [Johnpapa AngularJS Styleguide](https://github.com/johnpapa/angular-styleguide)

## How to run
* As we cannot release all our used packages because of license issues, you have to do some manual work

* First you'll need node & npm installed
* Install the tools: npm install -g yo webpack webpack-dev-server gulp-cli
* Checkout this repository: `git clone https://github.com/SchweizerischeBundesbahnen/esta-webjs.git`
* Remove `esta-webjs-style` from `/app/templates/package.json`
* Remove the `import 'esta-webjs-style/build/css/style.css';` from `/app/templates/app/src/app.js`
* Navigate to `<checkout-root>/esta-webjs-generator` and run `npm link`
* Navigate to where you want your app and run `yo esta-webjs`

## Tasks
We introduced a few tasks to create common types:

### To create a component

`yo esta-webjs:component <name>`

Creates the directory and all files for a component.

### To create a service

`yo esta-webjs:service <name>`

Creates the directory and all files for a service.
