/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests Theme.
 *
 * @author u202666 (Jonas Graber)
 * @version: 0.0.1
 * @since 10.12.2015, 2015.
 */
import ThemeModule from './theme';
import ThemeController from './theme.controller';
import ThemeComponent from './theme.component';
import ThemeTemplate from './theme.html';

describe('Theme', () => {
    let $rootScope, makeController;

    beforeEach(window.module(ThemeModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new ThemeController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
    });

    describe('Template', () => {
    });

    describe('Component', () => {
        let component = new ThemeComponent();

        it('includes the intended template', () => {
            expect(component.template).toBe(ThemeTemplate);
        });

        it('uses `controllerAs` syntax', () => {
            expect(component.controllerAs).not.toBeNull();
        });

        it('invokes the right controller', () => {
            expect(component.controller).toBe(ThemeController);
        });
    });
});