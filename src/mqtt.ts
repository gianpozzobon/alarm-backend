import mqtt from 'mqtt';

const host = process.env.URL;
const port = '1883';
const clientId = 'backend';

const client = mqtt.connect(`mqtt://${host}:${port}`, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

let armed = false;
let sinister = false;
let sensors: Array<number> = [];

if (client) {
  client.on('connect', () => {
    console.log('MQTT conectado');
    client.subscribe(['get/state', 'update/state'], () => {
      console.log('Inscrito');
    });
  });
  client.on('message', (topic, payload) => {
    console.log('Topic: ', topic);
    console.log('Message: ', payload.toString());
    if (topic === 'get/state') {
      const body = { armed, sensors };
      client.publish('send/state', JSON.stringify(body), { retain: true, qos: 0 });
    } else if (topic === 'update/state') {
      try {
        const reqBody = JSON.parse(payload.toString());
        armed = reqBody.armed ?? armed;
        if (!armed) sinister = false;
        else sinister = reqBody.sinister ?? sinister;
        sensors = reqBody.sensors ?? sensors;
        client.publish('send/state', JSON.stringify({ armed, sensors, sinister }), { retain: true, qos: 0 });
      } catch (err) {
        console.log(err);
      }
    }
  });
}

// io.on('connect', (socket) => {
//   console.log('Sucesso');
//   socket.emit('front/newConnection/device', { armed, sensors });

//   socket.on('front/changeStatus/device', (arg) => {
//     const infos = JSON.parse(arg);
//     console.log('connected: ', infos);
//     if (typeof infos.armed === 'boolean' && infos?.sensors?.length) {
//       armed = infos.armed;
//       sensors = infos.sensors;
//       socket.emit('hardware/status/device', { armed, sensors });
//     }
//   });
// });
