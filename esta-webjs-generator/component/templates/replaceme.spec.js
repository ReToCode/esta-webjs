import ReplacemeModule from './replaceme';
import ReplacemeController from './replaceme.controller.js';
import ReplacemeTemplate from './replaceme.html';

describe('Replaceme', () => {
    let $rootScope, makeController;

    beforeEach(window.module(ReplacemeModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new ReplacemeController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [name]', () => {
            let controller = makeController();
            expect(controller.name).toBe('replaceme');
        });
    });

    describe('Template', () => {
        // use regex to ensure correct bindings are used e.g., {{  }}
        it('has template', () => {
            expect(ReplacemeTemplate).length > 0;
        });
    });

});