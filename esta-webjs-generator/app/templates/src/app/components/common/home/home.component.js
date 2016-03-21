/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Home-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import template from './home.html';
import controller from './home.controller';

let homeComponent = {
    template,
    controller,
    controllerAs: 'vm'
};

export default homeComponent;