const mqtt = require('mqtt');

const connectUrl = 'mqtt://localhost:1883';
const client = mqtt.connect(connectUrl);

client.on('connect', ()=> {
    client.subscribe('presence', (err)=>{
        if(err){
            console.log(err)
        } else{
            client.publish('presence', 'Hello mqtt server!')
        }
    })
})

client.on('message', (topic,message)=>{
    console.log(message.toString())
})