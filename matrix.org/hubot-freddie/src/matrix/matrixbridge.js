var Bridge = require("matrix-appservice-bridge").Bridge;
var Cli = require("matrix-appservice-bridge").Cli;
var AppServiceRegistration = require("matrix-appservice-bridge").AppServiceRegistration;

var localbridge;

var bridge = {
  run:   function(port, config, eventHanlder) {
          localbridge = new Bridge({
            homeserverUrl: config.hsurl,
            domain: config.domain,
            registration: config.registration,
            controller: {
                onUserQuery: function(queriedUser) {
                    return {}; // auto-provision users with no additonal data
                },

                onEvent: eventHanlder
            }
        });
        console.log("Matrix-side listening on port %s", port);
        localbridge.run(port, config);
      },
  getBridge: function() {
        return localbridge;
      }
    };


module.exports = bridge;

