/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der About-Komponente
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import template from './about.html';
import controller from './about.controller';
import './about.css';

let aboutComponent = {
    template,
    controller,
    controllerAs: 'vm'
};

export default aboutComponent;