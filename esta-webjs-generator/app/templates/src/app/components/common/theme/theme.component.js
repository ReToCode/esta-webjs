/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Definition der Theme-Komponente.
 *
 * @author u202666 (Jonas Graber)
 * @version: 0.0.1
 * @since 10.12.2015, 2015.
 */
import template from './theme.html';
import controller from './theme.controller';

let themeComponent = {
    template,
    controller,
    controllerAs: 'vm'
};

export default themeComponent;