import angular from 'angular';
import replacemeService from './replaceme.service.js';

/*@ngInject*/
let replacemeModule = angular.module('replacemeService', [])

.service('replacemeService', replacemeService);

export default replacemeModule;