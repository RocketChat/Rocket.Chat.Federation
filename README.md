# Repo unused

This repo is currently not used.  Federation support has been merged in Rocket.Chat 1.0.  

Source code can be found [here](https://github.com/RocketChat/Rocket.Chat/tree/d53e264b83ccc971236123853e4b68c9eb6beeb4/app/federation)


## Federation support

The is our _native federation_ implementation.  It will enable Rocket.Chat to federate with other Rocket.Chat servers directly without bridges or intermdiary servers.  It will add matrix.org protocol compatibitily to Rocket.Chat.

_Currently under active development._

#### Future road map
* synchronizes messages between (occassionally) connected Rocket.Chat servers
* interoperate with other Chat servers/services supporting Federation: including Slack, Skype, IRC, Asterisk, and more
* extend video chat, audio chat, and screensharing to users across the federated servers/services network
* enable control, management, monitoring, communication, and collboration between intelligent devices (things) connected throughout a federated servers/services network; with zero-overhead lightweight junctions to accomodate legacy MQTT islands
