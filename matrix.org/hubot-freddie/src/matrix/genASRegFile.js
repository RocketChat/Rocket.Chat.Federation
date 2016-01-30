
// Usage:
//
// set the HOMESERVER_SENDER_LOCAL and ROCKETCHAT_USER_PREFIX environment variables
//
// node genASRegFile.js -r -u <URL of hubot-freddie's incoming webhook>  # remember to add the registration to the HomeServer!


var Cli = require("matrix-appservice-bridge").Cli;
var Bridge = require("matrix-appservice-bridge").Bridge;
var AppServiceRegistration = require("matrix-appservice-bridge").AppServiceRegistration;

HomeServerSenderLocal = process.env['HOMESERVER_SENDER_LOCAL'] || 'rcbot'
RocketChatUserPrefix = process.env['ROCKETCHAT_USER_PREFIX'] || '@rocketchat_'  // user name prefix for Rocket.Chat users

new Cli({
    registrationPath: "rocketchat-registration.yaml",
    generateRegistration: function(reg, callback) {
        reg.setHomeserverToken(AppServiceRegistration.generateToken());
        reg.setAppServiceToken(AppServiceRegistration.generateToken());
        reg.setSenderLocalpart(HomeServerSenderLocal);
        reg.addRegexPattern("users", RocketChatUserPrefix + ".*", true);
        callback(reg);
    },
    run: function(port, config) {
    }
}).run();


