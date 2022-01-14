const aedes = require("aedes")({
  id: "BROKER_",
});
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const port = 8888;

ws.createServer({ server: httpServer }, aedes.handle);
httpServer.listen(port, () => {
  console.log("Websocket server @ 8888");
});

aedes.on("subscribe", (subscriptions, client) => {
  console.log(
    "MQTT client \x1b[32m" +
      (client ? client.id : client) +
      "\x1b[0m subscribed to topics: " +
      subscriptions.map((s) => s.topic).join("\n"),
    "from broker",
    aedes.id
  );
});

aedes.on("client", (client) => {
  console.log(
    "Client Connected: \x1b[33m" + (client ? client.id : client) + "\x1b[0m",
    "to broker",
    aedes.id
  );
});

aedes.on("publish", async function (packet, client) {
  console.log(
    "Client \x1b[31m" +
      (client ? client.id : "BROKER_" + aedes.id) +
      "\x1b[0m has published",
    packet.payload.toString(),
    "on",
    packet.topic,
    "to broker",
    aedes.id
  );
});

//const fs = require("fs");
//const knexConfig = require("./knexfile");
//const knex = require("knex")(knexConfig["development"]);
//const http = require('http');
//const ws = require('ws')
//const wss = new ws.Server({ noServer: true});

/*const accept = (req,res) => {
    console.log("connecting?")
    if(req.headers.upgrade.toLowerCase() != 'websocket'){
        res.end();
        return;
    }

    if (!req.headers.connection.match(/\bupgrade\b/i)) {
        res.end();
        return;
    }
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

const onConnect = (ws) => {
    console.log("onConnect")
    ws.on('message', (message)=> {
        console.log('' + message)
        
        ws.send(`Hello, ${message}, nice to see ya`)
    })
}

http.createServer(accept).listen(8080);*/

//const ffmpeg = require('ffmpeg');
/*Stream = require('node-rtsp-stream');
stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://admin:KauraKoira69@80.186.159.32:554',
    wsPort: 9999,
    ffmpegOptions: {
        '-stats': '',
        '-r':30
    }
})*/
