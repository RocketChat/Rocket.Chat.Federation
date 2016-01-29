var Bridge = require("matrix-appservice-bridge").Bridge;


var localbridge;

var bridge = {
  run:   function(port, config, eventHanlder) {
          localbridge = new Bridge({
            homeserverUrl: "http://corei5:8008",
            domain: "corei5",
            registration: "/Users/sing/hubot/scripts/matrix/rocketchat-registration.yaml",

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

