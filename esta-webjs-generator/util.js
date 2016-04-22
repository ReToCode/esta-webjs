/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Hilfsklasse fuer Generatoren
 *
 * @author u215942 (Stefan Zeller)
 * @version: 1.1.0
 * @since 20.04.2016, 2016.
 */
var mkdirp = require('mkdirp');

var upperCase = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

var lowerCase = function(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

var create = function(yo, type, files) {
    var nameUpperCase = upperCase(yo.name);
    var nameLowerCase = lowerCase(yo.name);
    console.log('Creating ' + type + ' ' + nameLowerCase);

    var result = mkdirp.sync(yo.destinationPath(nameLowerCase));
    if (!result) {
        console.log('Error: Target directory already exists');
        return;
    }

    console.log('   create ' + nameLowerCase);

    files.forEach(function(file){
        var newFilename = file.replace(/replace___me/, nameLowerCase);

        yo.fs.copy(yo.templatePath(file), yo.destinationPath('./' + nameLowerCase + '/' + newFilename), {
            process: function (content) {
                return content.toString()
                    .replace(/Replace___me/g, nameUpperCase)
                    .replace(/replace___me/g, nameLowerCase);
            }
        });
    });
};

exports.create = create;