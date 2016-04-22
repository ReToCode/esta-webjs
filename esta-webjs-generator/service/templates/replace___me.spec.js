import Replace___meModule from './replace___me';

import Replace___meService from './replace___me.service.js';

describe('Replace___meService', () => {
    let $rootScope, makeService;

    beforeEach(window.module(Replace___meModule.name));
    beforeEach(inject((_$rootScope_) => {

        $rootScope = _$rootScope_;
        makeService = () => {
            return new Replace___meService();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {
        // service specs
    });
});