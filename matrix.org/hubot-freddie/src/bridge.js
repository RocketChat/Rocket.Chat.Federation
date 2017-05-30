'use strict';
module.exports = (HomeServerDomain, RocketChatUserPrefix, HomeServerURL) => {
  const handleMatrixMessage = (event, robot, matrix, rocketRoomId, matrixRoomId) => {
    console.log('[handleMatrixMessage]');
    const msgpayload = { channel: rocketRoomId, alias: event.user_id, msg: event.content.body };
    return getUserFromMatrix(event.user_id, matrix).then(function (data) {
      if(data.avatar) {
        msgpayload.avatar = data.avatar;
      }
      if(data.displayname) {
        msgpayload.alias = `${data.displayname}:${HomeServerDomain}`
      }
      return msgpayload
    }, (e) => {
      console.error(e);
      return msgpayload
    })
    .then(msgpayload => {
      console.log(`Sending "${ msgpayload.msg }"   to Matrix:${ matrixRoomId }`);
      robot.adapter.customMessage(msgpayload);
    });
  }
  function getUserFromMatrix(userId, matrix) {
    console.log('[getUserFromMatrix]')
    const intent = matrix.getBridge().getIntent();
      // send the message coming in from the HS into Rocket.Chat room
    return intent.client.getProfileInfo(userId).then(function(data){
      console.log('[getUserFromMatrix] SUCCESS')
      const regex = new RegExp(`(mxc:\/\/)(${escapeRegExp(HomeServerDomain)}\/.*)`, 'g');
      const str = data.avatar_url;
      const subst = `${HomeServerURL}/_matrix/media/v1/thumbnail/$2?width=96&height=96&method=crop`;
      return { avatar: (str || '').replace(regex, subst) || '', displayname: data.displayname}
    }, error => {
      console.log('[getUserFromMatrix] ERROR')
      console.error(error);
      throw error;
    });
  }
  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  const getMaps = (params) => {
    let tmp = params.HomeServerRoomID && params.RocketChatRoomID ? `${ params.RocketChatRoomID }=${ params.HomeServerRoomID }` : '';
    console.log(tmp);
    if (process.env['ROOM_MAP']){
      tmp += (tmp? ',': '') + process.env['ROOM_MAP']
    }
    console.log(tmp);
    return tmp.split(',').map(val => val.split('='))
  }
  const handleRocketChatMessage = (msg, matrixRoomId, matrix) => {
  //  send the received Rocket.Chat message into the paired HS
    const intent = matrix.getBridge().getIntent(RocketChatUserPrefix + msg.message.user.name.toLowerCase() + ":" + HomeServerDomain );
    console.log(`Sending "${ msg.message.text }" to Matrix:${ matrixRoomId }`);
    return intent.sendText(matrixRoomId, msg.message.text);
  }
  return {maps: getMaps, handleMatrixMessage, handleRocketChatMessage};
}
