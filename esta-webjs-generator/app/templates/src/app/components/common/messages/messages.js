/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Messages-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.2
 * @since 06.11.2015, 2015.
 */
import angular from 'angular';

import service from './messages.service';
import component from './messages.component';

let messagesModule = angular.module('messages', [])
    .service('messagesService', service)

    .directive('messages', component);

export default messagesModule;