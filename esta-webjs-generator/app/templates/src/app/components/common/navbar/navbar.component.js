/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Navbar-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import template from './navbar.html';
import controller from './navbar.controller';

let navbarComponent = {
    template,
    controller,
    controllerAs: 'vm'
};

export default navbarComponent;