# Federation 

Federation is now under active development.  The following is synopsis of the current activities.  

## Hubot Freddie - the Federation bridge npm module for Rocket.Chat

https://www.npmjs.com/package/hubot-freddie

This is a working bot that can be added to any Rocket.Chat server and allows one channel to be federated with other similarly configured Rocket.Chat server.   It works by bridging a channel from a Rocket.Chat server to a Matrix.org synapse homeserver. 

#### Federated by hubot freddie

You can see hubot freddie in action on our community server:

The #general channel of our community server https://demo.rocket.chat/channel/general

is bridged via hubot freddie to this paired homeserver and room: 

http://federation.rocket.chat/_matrix/client/#/room/!KgtAjQXVRcuoqmtfHC:federation.rocket.chat

This room can be federated throughout the Matrix.org realm.  Any server in the realm can also be paired with another Rocket.Chat server via hubot freddie.

#### Contributing

Ongoing development with hubot freddie is taking place here, contributions welcomed:

https://github.com/RocketChat/Rocket.Chat.Federation/tree/develop/matrix.org

## Federation Server

The is our _native federation_ implementation.  It will enable Rocket.Chat to federate with other Rocket.Chat servers directly without bridges or intermdiary servers.  It will add matrix.org protocol compatibitily to Rocket.Chat.

_Currently under active development._

#### Future road map
* synchronizes messages between (occassionally) connected Rocket.Chat servers
* interoperate with other Chat servers/services supporting Federation: including Slack, Skype, IRC, Asterisk, and more
* extend video chat, audio chat, and screensharing to users across the federated servers/services network
* enable control, management, monitoring, communication, and collboration between intelligent devices (things) connected throughout a federated servers/services network; with zero-overhead lightweight junctions to accomodate legacy MQTT islands
