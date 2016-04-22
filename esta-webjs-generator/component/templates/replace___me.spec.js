import Replace___meModule from './replace___me';
import Replace___meController from './replace___me.controller.js';
import Replace___meTemplate from './replace___me.html';

describe('Replace___me', () => {
    let $rootScope, makeController;

    beforeEach(window.module(Replace___meModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new Replace___meController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [content]', () => {
            let controller = makeController();
            expect(controller.content).toBe('Hello, Replace___me');
        });
    });

    describe('Template', () => {
        // use regex to ensure correct bindings are used e.g., {{  }}
        it('has template', () => {
            expect(Replace___meTemplate).length > 0;
        });
    });

});