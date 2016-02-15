# ESTA WebJS
ESTA WebJS is a development stack for web applications with AngularJS, written in EcmaScript 6 and bundeled with webpack.

## Features
* AngularJS with EcmaScript6 and Webpack
* Yeoman based generator for fast project startup
* Component based structure
* Build System using maven > gulp > webpack
* Test setup using karma & jasmine on PhantomJS and Selenium Webgrid. Results are sent to SonarQube
* Docker base-image to run the application in nginx within a docker container.

## Credits to
* [NG6 Starter](https://github.com/AngularClass/NG6-starter)
* [Johnpapa AngularJS Styleguide](https://github.com/johnpapa/angular-styleguide)

## How to run
* You'll need node & npm installed
* Install the tools: npm install -g yo webpack webpack-dev-server gulp
* Install the generator: npm install -g generator-esta-webjs
* Start the generator and follow the instructions: yo esta-webjs
