bridge = require('./matrix/matrixbridge')
fs = require('fs');

module.exports = (robot) ->
    HomeServerURL = process.env['HOMESERVER_URL'] or 'http://corei5:8008'
    HomeServerDomain = process.env['HOMESERVER_DOMAIN'] or 'corei5'
    HomeServerRoomID = process.env['HOMESERVER_ROOM_ID'] or '!MGrcqSNUJhyIKSFYpH:corei5'  # HomeServer federated room id
    RocketChatRoomID = process.env['ROCKETCHAT_ROOM_ID'] or 'GENERAL'   # Rocket.Chat federated room id
    HomeServerSenderLocal = process.env['HOMESERVER_SENDER_LOCAL'] or 'rcobt'
    IncomingPort = process.env['INCOMING_PORT']  or 9000  # bot's incoming webhook port for messges from HomeServer
    RocketChatUserPrefix = process.env['ROCKETCHAT_USER_PREFIX'] or '@rocketchat_'  # user name prefix for Rocket.Chat users
    WritableConfigPath = process.env['WRITABLE_CONFIG_PATH']  or '/tmp'  # path of directory to write configuarion file

    regFileFullPath = WritableConfigPath + '/' + 'rocketchat-registration.yaml'


    #  start the matrix bridge and pass in our requst handler
    config = { hsurl : HomeServerURL,  domain: HomeServerDomain, registration: regFileFullPath}
    bridge.run IncomingPort, config, (request, context) =>
      console.log("event fired!")
      event = request.getData()
      if (event.type isnt "m.room.message") || (!event.content) || (event.room_id isnt HomeServerRoomID)
        return
        # send the message coming in from the HS into Rocket.Chat room
      msgpayload = { channel: RocketChatRoomID, attachments: [{ title: "From: " + event.user_id, title_link: "https://matrix.org/", "text" : "<i>" + event.content.body + "</i"}]}
      robot.adapter.customMessage  msgpayload

    # messages coming from Rocket.Chat room(s) monitored
    robot.hear /.*/, (msg) ->
      #  send the received Rocket.Chat message into the paired HS
      intent = bridge.getBridge().getIntent(RocketChatUserPrefix + msg.message.user.name.toLowerCase() + ":corei5");
      intent.sendText(HomeServerRoomID, msg.message.text);
