/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016
 */

'use strict';

var generators = require('yeoman-generator');

function upperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

var self;

module.exports = generators.Base.extend({
    constructor: function () {

        self = this;

        generators.Base.apply(self, arguments);

        self.argument('name', {
            type: String,
            required: true,
            description: 'Name of component'
        });
    },

    writing: function () {
        var nameUpperCase = upperCase(self.name);
        var nameLowerCase = lowerCase(self.name);

        var files = [
            'replace___me.controller.js',
            'replace___me.html',
            'replace___me.js',
            'replace___me.spec.js'
        ];

        files.forEach(function(file){
            var newFilename = file.replace(/replace___me/, nameLowerCase);

            self.fs.copy(self.templatePath(file), self.destinationPath(newFilename), {
                process: function (content) {
                    return content.toString()
                        .replace(/Replace___me/g, nameUpperCase)
                        .replace(/replace___me/g, nameLowerCase);
                }
            });
        });
    }

});