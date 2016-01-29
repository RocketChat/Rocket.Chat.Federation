// node registerappservice.js -r -u "http://hubothost:9000"
var bridge;
var ROOM_ID = "!MGrcqSNUJhyIKSFYpH:corei5";
var SERVER="http://corei5:8008/"

var Cli = require("matrix-appservice-bridge").Cli;
var Bridge = require("matrix-appservice-bridge").Bridge;
var AppServiceRegistration = require("matrix-appservice-bridge").AppServiceRegistration;

new Cli({
    registrationPath: "rocketchat-registration.yaml",
    generateRegistration: function(reg, callback) {
        reg.setHomeserverToken(AppServiceRegistration.generateToken());
        reg.setAppServiceToken(AppServiceRegistration.generateToken());
        reg.setSenderLocalpart("rcbot");
        reg.addRegexPattern("users", "@rocketchat_.*", true);
        callback(reg);
    });


