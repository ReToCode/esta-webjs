/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Theme-Komponente.
 *
 * @author u202666 (Jonas Graber)
 * @version: 0.0.1
 * @since 10.12.2015, 2015.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import themeComponent from './theme.component';

let themeModule = angular.module('theme', [
    uiRouter
])
    .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('theme', {
            url: '/theme', template: '<theme></theme>'
        });
    })

    .directive('theme', themeComponent);

export default themeModule;