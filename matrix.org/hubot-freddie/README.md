hubot-freddie
=============

Freddie is Rocket.Chat's Hubot for Federation via Matrix.org

Freddie pairs a Rocket.Chat server with a Synapse Home Server.

This is a work in progress.

# Installation

```
npm install --save hubot-freddie
```

Next, you must edit the `external-scripts.json` file to load Freddie:

```
[
  ...
  "hubot-freddie"
]
```

You will also need to configure Freddie for your Rocket.Chat server and Synapse Home sever..


#Configuration

You can configure Freddie via environment variables.


##ENV

#####HOMESERVER_URL


```
HOMESERVER_URL="http://corei5:8008/"
```



