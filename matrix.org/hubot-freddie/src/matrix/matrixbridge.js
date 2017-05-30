var Bridge = require("matrix-appservice-bridge").Bridge;
var Cli = require("matrix-appservice-bridge").Cli;
var AppServiceRegistration = require("matrix-appservice-bridge").AppServiceRegistration;

var localbridge;

var bridge = {
  run: function (port, config, eventHandler, mapRoom ) {
      localbridge = new Bridge({
        homeserverUrl: config.hsurl,
        domain: config.domain,
        registration: config.registration,
        controller: {
            onUserQuery: function(queriedUser) {
                return {}; // auto-provision users with no additonal data
            },
            onEvent: (request, context) => {
              const event = request.getData();
              if (event.type !== "m.room.message" || !event.content) {
                return;
              }
              const room =  mapRoom.findIndex((ids) => event.room_id == ids[1])
              console.log(room,mapRoom, event.room_id);
              if(room > -1) {
                eventHandler.onMessage(event, mapRoom[room][0], mapRoom[room][1])
              }
            }
        }
    });
    console.log("Matrix-side listening on port %s", port);
    return localbridge.run(port, config);
  },
  getBridge: function() {
    return localbridge;
  }
};


module.exports = bridge;
