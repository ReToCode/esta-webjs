/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Messages-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import template from './messages.html';
import controller from './messages.controller';

let messagesComponent = {
    template,
    controller,
    controllerAs: 'vm'
};

export default messagesComponent;