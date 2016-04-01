/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016
 */

'use strict';

var generators = require('yeoman-generator');
var util = require('../util');

var yo;

module.exports = generators.Base.extend({
    constructor: function () {

        yo = this;

        generators.Base.apply(yo, arguments);

        yo.argument('name', {
            type: String,
            required: true,
            description: 'Name of component'
        });
    },

    writing: function () {
        var files = [
            'replace___me.controller.js',
            'replace___me.html',
            'replace___me.js',
            'replace___me.spec.js'
        ];

        util.create(yo, 'component', files);
    }

});