'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    var fs = require('fs');
    var RSON = require('rson');
    var DPE = require('data-parsing-engine');
    var DI = require('data-integration');
    var DU = require('data-upload');

    var appConfigFile = fs.readFileSync('configs/app-config.json');
    var appConfigRson = RSON.rson(RSON.binify(JSON.parse(appConfigFile)));

    var dpe = new DPE(appConfigRson, { debug: false });
    dpe.start();
    dpe.on('message', function (message) {
        //console.log(JSON.stringify(message, false, 4));
        di.store(message);
    });

    var di = new DI(appConfigRson, { debug: false });
    di.start();
    di.on('message', function (message) {
        //console.log(JSON.stringify(message, false, 4));
        du.store(message);
    });

    var du = new DU(appConfigRson, { debug: true });
    du.start();
});

$.end(function () {
});
