import ReplacemeModule from './replaceme';
import ReplacemeService from './replaceme.service.js';

describe('ReplacemeService', () => {
    let $rootScope, makeService;

    beforeEach(window.module(ReplacemeModule.name));
    beforeEach(inject((_$rootScope_) => {

        $rootScope = _$rootScope_;
        makeService = () => {
            return new ReplacemeService();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {
        // service specs
    });
});