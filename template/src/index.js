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

    var deviceConfigFile = fs.readFileSync('configs/device.json');
    var deviceConfigRson = RSON.rson(RSON.binify(JSON.parse(deviceConfigFile)));

    var connConfigFile = fs.readFileSync('configs/connector.json');
    var connConfigRson = RSON.rson(RSON.binify(JSON.parse(connConfigFile)));

    var dpe = new DPE(deviceConfigRson, { debug: false });
    dpe.start();
    dpe.on('message', function (message) {
        //console.log(JSON.stringify(message, false, 4));
        di.store(message);
    });

    var di = new DI(deviceConfigRson, { debug: false });
    di.start();
    di.on('message', function (message) {
        //console.log(JSON.stringify(message, false, 4));
        du.store(message);
    });

    var du = new DU(deviceConfigRson, connConfigRson, { debug: true });
    du.start();
});

$.end(function () {
});
