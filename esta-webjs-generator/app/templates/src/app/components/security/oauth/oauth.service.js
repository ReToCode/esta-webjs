/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */
class OAuthService {

    /*@ngInject*/
    constructor($http, config, $cookies, $log, $location, $window,
                $httpParamSerializer, messagesService,
                $translate, $q) {

        this.$http = $http;
        this.$httpParamSerializer = $httpParamSerializer;
        this.$location = $location;
        this.$window = $window;
        this.config = config;
        this.messagesService = messagesService;
        this.$log = $log;
        this.$cookies = $cookies;
        this.$translate = $translate;
        this.$q = $q;
    }

    /**
     * Diese Methode handelt das Login, sowie den Callback nach dem Login.
     * - Leitet den Browser zum Login-Server um falls er noch nicht eingeloggt ist
     */
    login() {
        let service = this;

        if (!service.isLoggedIn()) {
            service.$log.debug('Now redirecting to login-page of auth-server.');
            service.$window.location.replace(service.config.authServerUrl +
                service.config.authLoginUrl + encodeURIComponent(service.config.authRedirectUrl));
        } else {
            service.$location.path('/');
        }
    }

    /**
     * Loggt den User aus. Ruft dazu den Login-Server auf um das Login-Cookie loeschen zu lassen
     * und entfernt das lokale Auth-Cookie.
     */
    logout() {
        let service = this;

        if (!service.isLoggedIn()) {
            service.$location.path('/');
            return;
        }

        service.$http.post(service.config.authServerUrl + 'logout')
            .success(() => {
                service.$cookies.remove('auth');
                service.$location.path('/');
            }).error(() => {
                service.$cookies.remove('auth');
                service.$location.path('/');
            });
    }

    /**
     * Diese Methode behandelt den Callback nach dem Redirect auf den Auth-Server
     * - Prueft ob ein Temp-Token (&code=xxxxxx) in der URL ist.
     * - Nimmt andernfalls den Code aus der URL entgegen und ruft die Daten vom Login-Server ab.
     * - Speichert die Login-Daten in einem Cookie ab.
     */
    handleCallback() {
        let service = this;
        let tempCode = OAuthService._getParameterByName('code');

        service.$log.debug('Found a temp-code, now trying to get an access-token');

        service.$http.post(service.config.authServerUrl + 'oauth/token',
            service.$httpParamSerializer({
                'grant_type': 'authorization_code',
                'client_id': service.config.authClientId,
                'code': tempCode,
                'redirect_uri': service.config.authRedirectUrl
            }),
            {
                headers: service._getAppAuthHeader()
            }).success(response => {
                service._handleLoginResponse(response);
            }).error(err => {
                service._handleErrorResponse(err, true);
            });
    }

    /**
     * Diese Methode prueft ein Token auf dem Auth-Server.
     * @returns {promise|boolean} Ist das Token gueltig?
     */
    checkToken() {
        let service = this;
        let defer = service.$q.defer();

        if (!service.isLoggedIn()) {
            defer.resolve(false);
        } else {
            service.$http.post(service.config.authServerUrl + 'oauth/check_token',
                service.$httpParamSerializer({token: service._getAuthData().details.tokenValue}),
                {
                    headers: service._getAppAuthHeader()
                })
                .success(response => {
                    service.$log.debug(response);
                    defer.resolve(true);
                })
                .error(err => {
                    service.$log.error('Error: Invalid token response.', err);
                    defer.resolve(false);
                });
        }

        return defer.promise;
    }

    /**
     * Gibt zurueck ob ein Benutzer eingeloggt ist.
     * @returns {boolean} Eingeloggt?
     */
    isLoggedIn() {
        return !!this._getAuthData().authenticated;
    }

    /**
     * Gibt den Benutzername eines Users zurueck falls eingelogt. Sonst ''.
     * @returns {*} Benutzername oder ''.
     */
    getUsername() {
        if (this.isLoggedIn()) {
            return this._getAuthData().name;
        } else {
            return '';
        }
    }

    /**
     * Falls ein access_token enthalten ist, werden die Benutzerdaten geladen.
     * @param response Die Antwort vom token Aufruf.
     * @private
     */
    _handleLoginResponse(response) {
        let service = this;

        if (response && response.access_token) {

            service.$log.debug('Got an access_token, now trying to get user-info from backend');

            service.$http.get(service.config.authServerUrl + 'user', {
                headers: {'Authorization': 'Bearer ' + response.access_token}
            })
                .success(userResponse => {
                    if (userResponse) {
                        service._setAuthData(userResponse);
                        // Manuelle URL bauen um den Code im Querystring zu entfernen
                        service.$window.location.replace([location.protocol, '//', location.host, location.pathname].join(''));
                    }
                })
                .error(err => {
                    service._handleErrorResponse(err, true);
                });
        }
    }

    /**
     * Behandelt eine feherhafte Antwort.
     * @param error Der Fehler.
     * @param logError Soll der Fehler geloggt werden?
     * @private
     */
    _handleErrorResponse(error, logError) {
        let service = this;

        if (logError) {
            service.$log.error('Error while logging in: ', error);
            service.messagesService.errorMessage(service.$translate.instant('LOGIN_ERROR'), true);
        }

        service.$location.path('/');
    }

    /**
     * Schreibt die authDaten in ein Cookie.
     * @param authData Die authDaten.
     * @private
     */
    _setAuthData(authData) {
        this.$cookies.putObject('auth', {
            authData
        });
    }

    /**
     * Liest die authDaten aus dem Cookie.
     * @returns {*} AuthDaten oder {}.
     * @private
     */
    _getAuthData() {
        let cookie = this.$cookies.getObject('auth');
        if (cookie && cookie.authData) {
            return cookie.authData;
        } else {
            return {};
        }
    }

    /**
     * Gibt die notwendigen Header fuer Auth-Server-Aufrufe zurueck.
     * @returns {Authorization: string, Content-Type: String("application/x-www-form-urlencoded")}
     * @private
     */
    _getAppAuthHeader() {
        return {
            'Authorization': 'Basic ' + btoa(this.config.authClientId + ':' + this.config.authClientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    }

    /**
     * Helfermethode um den Query-String zu parsen.
     * @param name Den zu suchenden Namen.
     * @returns {string} Den gefundenen Wert oder ''.
     * @private
     */
    static _getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}

export default OAuthService;