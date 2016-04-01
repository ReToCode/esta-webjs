/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016
 */

'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var util = require('../util');

var yo;

module.exports = generators.Base.extend({
    constructor: function () {

        yo = this;

        generators.Base.apply(yo, arguments);

        yo.argument('name', {
            type: String,
            required: true,
            description: 'Name of Service'
        });
    },

    writing: function () {
        var files = [
            'replace___me.service.js',
            'replace___me.js',
            'replace___me.spec.js'
        ];

        util.create(yo, 'service', files);
    }

});