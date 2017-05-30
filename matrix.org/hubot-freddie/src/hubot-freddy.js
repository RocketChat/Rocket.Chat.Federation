'use strict';
const matrixBridge = require('./matrix/matrixbridge');
const HomeServerURL = process.env['HOMESERVER_URL'] || 'http://0.0.0.0:8008';
const HomeServerDomain = process.env['HOMESERVER_DOMAIN'] || '0.0.0.0';
const HomeServerRoomID = process.env['HOMESERVER_ROOM_ID'] || '!WKVTQyzUAjcsqmTGjA:35.185.41.10,';  // HomeServer federated room id
const RocketChatRoomID = process.env['ROCKETCHAT_ROOM_ID'] || 'WIJbAHNEdgMNavYM5';   // Rocket.Chat federated room id
const HomeServerSenderLocal = process.env['HOMESERVER_SENDER_LOCAL'] || 'rcbot';
const IncomingPort = process.env['INCOMING_PORT']  || 8089;
const RocketChatUserPrefix = process.env['ROCKETCHAT_USER_PREFIX'] || '@rocketchat_';  // user name prefix for Rocket.Chat users
const WritableConfigPath = process.env['WRITABLE_CONFIG_PATH']  || './config';  // path of directory to write configuarion file

const bridgeHelpers = require('./bridge')(HomeServerDomain, RocketChatUserPrefix, HomeServerURL)
const handleMatrixMessage = bridgeHelpers.handleMatrixMessage;
const handleRocketChatMessage = bridgeHelpers.handleRocketChatMessage;
const ROOM_MAP = bridgeHelpers.maps({HomeServerRoomID: HomeServerRoomID, RocketChatRoomID: RocketChatRoomID});


module.exports = function(robot) {

  const regFileFullPath = WritableConfigPath + '/' + 'rocketchat-registration.yaml';
  //  start the matrix bridge and pass in our request handler
  matrixBridge.run(IncomingPort, { hsurl : HomeServerURL,  domain: HomeServerDomain, registration: regFileFullPath}, {
    onMessage:(event, rocketRoomId, matrixRoomId) => {
      handleMatrixMessage(event, robot, matrixBridge, rocketRoomId, matrixRoomId)
    }
  }, ROOM_MAP).then(() => {
    // messages coming from Rocket.Chat room(s) monitored
    robot.hear(/.*/, (msg) => {
      const room =  ROOM_MAP.findIndex((ids) => msg.message.room == ids[0])
      if(room < 0 ) { return }
      return handleRocketChatMessage(msg, ROOM_MAP[room][1], matrixBridge)
    })
    ROOM_MAP.forEach(ids => console.log(`Mapping Rocketchat(${ ids[0] }) <==> Matrix(${ ids[1] })`))
  });
};
