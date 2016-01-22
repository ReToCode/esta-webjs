/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Unit-Tests OAuthService
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.2
 * @since 06.11.2015, 2015.
 */
import 'angular-cookies';
import OAuthModule from './oauth';
import OAuthService from './oauth.service';

describe('OAuthService', () => {
    let $rootScope, makeService, $httpBackend, $cookies,
        messagesServiceMock, configMock, translateMock,
        $location, $windowMock;

    messagesServiceMock = {
        errorMessage: function () {}
    };

    configMock = {
        authServerUrl: 'authServerUrl/',
        authLoginUrl: 'authLoginUrl',
        authRedirectUrl: '#/logincallback'
    };

    translateMock = {
        instant: function () {
            return 'Login fehlgeschlagen';
        }
    };

    $windowMock = {
        location: {
            replace: function() {}
        }
    };

    beforeEach(window.module(OAuthModule.name));
    beforeEach(inject((_$rootScope_, _$httpBackend_, _$http_, _$cookies_, _$log_,
                       _$location_, _$httpParamSerializer_, _$q_) => {

        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        $cookies = _$cookies_;

        $cookies.remove('auth');

        makeService = () => {
            return new OAuthService(_$http_, configMock, $cookies, _$log_, $location,
                $windowMock, _$httpParamSerializer_, messagesServiceMock, translateMock, _$q_);
        };
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {

        it('login() should redirect to login-page when !isloggedIn', () => {

            let service = makeService();

            spyOn($windowMock.location, 'replace');

            service.login();

            expect($windowMock.location.replace).toHaveBeenCalledWith('authServerUrl/authLoginUrl%23%2Flogincallback');
        });

        it('login() should redirect to homepage when isloggedIn', () => {

            let service = makeService();

            $cookies.putObject('auth', {
                authData: {
                    authenticated: true
                }
            });

            spyOn($windowMock.location, 'replace');

            service.login();

            expect($windowMock.location.replace).not.toHaveBeenCalled();
        });

        it('handleCallback() should POST to authApi when tempCode is present && not loggedIn', () => {
            let service = makeService();

            spyOn(OAuthService, '_getParameterByName').and.callFake(() => {
                return 'Xd21Aa';
            });

            $httpBackend.expectPOST('authServerUrl/oauth/token').respond(200, '');

            service.handleCallback();
            $httpBackend.flush();
        });

        it('handleCallback() should handle error when POST fails', () => {
            let service = makeService();

            spyOn(OAuthService, '_getParameterByName').and.callFake(() => {
                return 'Xd21Aa';
            });
            spyOn(messagesServiceMock, 'errorMessage');

            $httpBackend.expectPOST('authServerUrl/oauth/token').respond(500, '');

            service.handleCallback();
            $httpBackend.flush();

            expect(messagesServiceMock.errorMessage).toHaveBeenCalledWith('Login fehlgeschlagen', true);
        });

        it('handleCallback() should GET userData && save authCookie when token is present', () => {
            let service = makeService();

            spyOn(OAuthService, '_getParameterByName').and.callFake(() => {
                return 'Xd21Aa';
            });
            spyOn($windowMock.location, 'replace');

            $httpBackend.expectPOST('authServerUrl/oauth/token').respond(200, {access_token: 'abcd'});
            $httpBackend.expectGET('authServerUrl/user').respond(200, {name: 'Reto Lehmann'});

            service.handleCallback();
            $httpBackend.flush();

            expect($windowMock.location.replace).toHaveBeenCalled();
            expect($cookies.getObject('auth').authData.name).toBe('Reto Lehmann');
        });

        it('handleCallback() should not save authCookie when userdata-POST fails', () => {
            let service = makeService();

            spyOn(OAuthService, '_getParameterByName').and.callFake(() => {
                return 'Xd21Aa';
            });
            spyOn($windowMock.location, 'replace');
            spyOn(messagesServiceMock, 'errorMessage');

            $httpBackend.expectPOST('authServerUrl/oauth/token').respond(200, {access_token: 'abcd'});
            $httpBackend.expectGET('authServerUrl/user').respond(500, {name: 'Reto Lehmann'});

            service.handleCallback();
            $httpBackend.flush();

            expect($cookies.getObject('auth')).toBeUndefined();
            expect(messagesServiceMock.errorMessage).toHaveBeenCalledWith('Login fehlgeschlagen', true);
        });

        it('logout() should do nothing when not loggedIn', () => {
            let service = makeService();

            spyOn($location, 'path');

            service.logout();

            expect($location.path).toHaveBeenCalledWith('/');
        });

        it('logout() should POST to logout and remove auth cookie when loggedIn', () => {
            let service = makeService();

            $cookies.putObject('auth', {
                authData: {
                    authenticated: true
                }
            });

            $httpBackend.expectPOST('authServerUrl/logout').respond(200, '');

            service.logout();

            $httpBackend.flush();

            expect($cookies.getObject('auth')).toBeUndefined();
        });

        it('logout() should remove auth cookie when loggedIn and POST fails', () => {
            let service = makeService();

            $cookies.putObject('auth', {
                authData: {
                    authenticated: true
                }
            });

            $httpBackend.expectPOST('authServerUrl/logout').respond(500, '');

            service.logout();

            $httpBackend.flush();

            expect($cookies.getObject('auth')).toBeUndefined();
        });

        it('checkToken() should return false when not isLoggedIn', () => {
            let service = makeService();

            var result = service.checkToken();

            result.then((val) => {
                expect(val).toBeFalsy();
            });
        });

        it('checkToken() should return true when isLoggedIn && token is valid', () => {
            let service = makeService();

            $httpBackend.expectPOST('authServerUrl/oauth/check_token').respond(200, '');

            $cookies.putObject('auth', {
                authData: {
                    authenticated: true,
                    details: {tokenValue: 'xxxx'}
                }
            });

            var result = service.checkToken();
            $httpBackend.flush();

            result.then((val) => {
                expect(val).toBeTruthy();
            });
        });

        it('checkToken() should return false when POST fails', () => {
            let service = makeService();

            $httpBackend.expectPOST('authServerUrl/oauth/check_token').respond(500, '');

            $cookies.putObject('auth', {
                authData: {
                    authenticated: true,
                    details: {tokenValue: 'xxxx'}
                }
            });

            var result = service.checkToken();
            $httpBackend.flush();

            result.then((val) => {
                expect(val).toBeFalsy();
            });
        });

        it('isLoggedIn() should return true when isAuthenticated', () => {
            let service = makeService();

            $cookies.putObject('auth', {
                authData: {
                    authenticated: true
                }
            });

            let result = service.isLoggedIn();

            expect(result).toBeTruthy();
        });

        it('isLoggedIn() should return false when !isAuthenticated', () => {
            let service = makeService();

            let result = service.isLoggedIn();

            expect(result).toBeFalsy();
        });

        it('getUsername() should return username when isAuthenticated', () => {
            let service = makeService();

            $cookies.putObject('auth', {
                authData: {
                    authenticated: true,
                    name: 'Reto Lehmann'
                }
            });

            let result = service.getUsername();

            expect(result).toBe('Reto Lehmann');
        });

        it('getUsername() should return "" when !isAuthenticated', () => {
            let service = makeService();

            let result = service.getUsername();

            expect(result).toBe('');
        });
    });
});