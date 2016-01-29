bridge = require('./matrix/matrixbridge')
port = 9000  # incoming webhook for messges from HomeServer
roomid = '!MGrcqSNUJhyIKSFYpH:corei5'  # HomeServer federated room id
rocketroomid = 'GENERAL'   # Rocketchat federated room id
config = {}

module.exports = (robot) ->
  #  start the matrix bridge and pass in our requst handler
  bridge.run port, config, (request, context) =>
    console.log("event fired!")
    event = request.getData()
    if (event.type isnt "m.room.message") || (!event.content) || (event.room_id isnt roomid)
      return
    # send the message coming in from the HS into Rocket.Chat room
    msgpayload = { channel: rocketroomid, attachments: [{ title: "From: " + event.user_id, title_link: "https://matrix.org/", "text" : "<i>" + event.content.body + "</i"}]}
    robot.adapter.customMessage  msgpayload

  # messages coming from Rocket.Chat room(s) monitored
  robot.hear /.*/, (msg) ->
    #  send the received Rocket.Chat message into the paired HS
    intent = bridge.getBridge().getIntent("@rocketchat_" + msg.message.user.name.toLowerCase() + ":corei5");
    intent.sendText(roomid, msg.message.text);
