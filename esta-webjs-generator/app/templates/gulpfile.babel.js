/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Gulp Konfigurationsdatei
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import gulp     from 'gulp';
import path     from 'path';
import webpack  from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import karma    from 'karma';
import esdoc    from 'gulp-esdoc';
import ip from 'ip';
import runSequence from 'run-sequence';

let webpackConfig = require('./webpack.config');
let root = 'src';

/**
 * Hilfsmethode: Dateien vom Pfad app/{glob} erhalten
 * @param glob Pfad nach app/
 * @returns {string} Den Pfad zur Applikation app/{glob}
 */
let resolveToApp = (glob) => {
    glob = glob || '';
    return path.join(root, 'app', glob);
};

/**
 * Hilfsmethode: Dateien vom Pfad app/components/{glob} erhalten
 * @param glob Pfad nach app/components/
 * @returns {string} Den Pfad zur Applikation app/components/{glob}
 */
let resolveToComponents = (glob) => {
    glob = glob || '';
    return path.join(root, 'app/components', glob);
};

/**
 * Map aller Dateien
 */
let paths = {
    js: resolveToComponents('**/*!(.spec.js).js'), // Alle .js ohne .spec.js
    css: resolveToApp('**/*.css'),
    html: [resolveToApp('**/*.html'), path.join(root, 'index.html')],
    entry: path.join(root, 'app/app.js'),
    output: 'dist',
    build: path.join(__dirname, 'target/build'),
    documentation: path.join(__dirname, 'target/documentation')
};

/**
 * Gulp-Task: Fuehrt webpack aus und startet den Development-Server
 */
gulp.task('serve', () => {
    return new WebpackDevServer(webpack(webpackConfig.development), {
        hot: true, contentBase: './dist/', watchOptions: {
            aggregateTimeout: 100, poll: 300
        }, stats: {
            colors: true
        }
    }).listen(3000, 'localhost', function (err) {
        if (err) {
            console.error(err);
        }
    });
});

/**
 * Gulp-Task: Fuehrt die Karma-Tests auf dem Selenium Webgrid aus
 */
gulp.task('test-selenium-webgrid', (done) => {
    let hostname = process.env.host || ip.address();
    let externalport = process.env.externalport || 7777;

    process.env.NODE_ENV = 'test';

    return new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        hostname: hostname,
        port: externalport,
        browsers: ['SeleniumFF', 'SeleniumCH'] // IE ausgeschaltet aufgrund Bug im Selenium-Grid: 'SeleniumIE'
    }, done).start();
});

/**
 * Gulp-Task: Fuehrt die Karma-Tests auf dem PhantomJS Browser aus
 */
gulp.task('test-phantomjs', (done) => {
    let hostname = process.env.host || ip.address();
    let externalport = process.env.externalport || 7777;

    process.env.NODE_ENV = 'test';

    return new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        hostname: hostname,
        port: externalport,
        browsers: ['PhantomJS']
    }, done).start();
});

/**
 * Gulp-Task: Stellt sicher das alle Browsertreiber vorhanden sind
 */
let webdriver_update = require('gulp-protractor').webdriver_update;
gulp.task('webdriver_update', webdriver_update);

/**
 * Gulp-Task: Fuehrt Protractor Tests lokal aus
 */
gulp.task('e2e-test-local', ['webdriver_update'], () => {
    let protractor = require('gulp-protractor').protractor;

    return gulp.src(['e2e/**/*.spec.js'])
        .pipe(protractor({
            configFile: './protractor.config.js',
            args: ['--baseUrl', 'http://localhost:3000',
                '--directConnect', 'true']
        }))
        .on('error', function (e) {
            throw e;
        });
});

/**
 * Gulp-Task: Fuehrt Protractor Tests auf dem SBB Selenium-Grid aus
 */
gulp.task('e2e-test-selenium-webgrid', (done) => {
    let hostname = process.env.host || ip.address();
    let externalport = process.env.externalport || 3000;

    console.log('Protractor-Tests running on: ', hostname, externalport);

    // Start WebpackDev-Server
    let devServer = new WebpackDevServer(webpack(webpackConfig.protractor), {
        contentBase: './dist/',
        disableHostCheck: true,
        public: hostname + ':' + externalport,
        historyApiFallback: true
    });

    devServer.listen(externalport, '0.0.0.0', () => {
        // Start protractor tests
        let protractor = require('gulp-protractor').protractor;

        gulp.src(['e2e/**/*.spec.js'])
            .pipe(protractor({
                configFile: './protractor.config.js',
                args: ['--baseUrl', 'http://' + hostname + ':' + externalport,
                    '--seleniumAddress', 'http://webtestgrid.sbb.ch:4444/wd/hub']
            })
                .on('error', function (e) {
                    throw e;
                })
                .on('end', function () {
                    console.log('e2e-tests are done now closing webserver');
                    devServer.close();
                    done();
                }));
    });
});

/**
 * Gulp-Task: Fuehrt ESDoc aus um die Code-Dokumentation zu erstellen
 */
gulp.task('doc', () => {
    return gulp.src(root).pipe(esdoc({
        destination: paths.documentation,
        index: path.join(root, 'README.md')
    }));
});

/**
 * Gulp-Task: Baut die Applikation fuer das Deployment
 * - Fuehrt die Tests aus
 * - Erstellt die Code-Dokumentation
 * - Erstellt das Webpack-Bundle und kopiert es nach /target/build
 * - Kopiert index.html nach /target/build
 */
gulp.task('build', (done) => {
    process.env.NODE_ENV = 'prod';
    runSequence('doc',
        'test-selenium-webgrid', 'e2e-test-selenium-webgrid', () => {
            gulp.src(path.join(root, 'index.html')).pipe(gulp.dest(paths.build));
            return webpack(webpackConfig.production, done);
        });
});


/**
 * Gulp-Task: Standardfall mit 'gulp' kopiert das HTML nach /dist und startet Webserver
 */
gulp.task('default', ['serve']);