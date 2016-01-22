/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Navbar-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import navbarComponent from './navbar.component';

let navbarModule = angular.module('navbar', [
    uiRouter
])
    .directive('navbar',navbarComponent);

export default navbarModule;