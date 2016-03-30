import angular from 'angular';

import template from './replaceme.html';
import controller from './replaceme.controller.js';

let replacemeModule = angular.module('replaceme')
    .component('replaceme', {
        template,
        controller
    });

export default replacemeModule;