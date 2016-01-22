/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */
let service; // This ist in einem Interceptor nicht verfuegbar => Deshalb im Konstruktor abspeichern in Variable
class OAuthInterceptorService {

    /*@ngInject*/
    constructor($q, $location, $cookies) {
        service = this;
        service.$q = $q;
        service.$location = $location;
        service.$cookies = $cookies;
    }

    responseError(res) {
        if (res.status === 401) {
            service.$cookies.remove('auth');
            service.$location.path('/login');
        } else {
            return service.$q.reject(res);
        }
    }
}

export default OAuthInterceptorService;