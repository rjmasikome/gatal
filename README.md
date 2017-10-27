# gatal

This project is experimental, and inspired by kafka-stream. Instead of using kafka, this project is using mqtt with Observable from rx. 

The name means itchy in Indonesian. That's the first time that came to my mind, if you imagine a stream of mosquitoes.

### Get Started

* Make sure node and npm (and yarn optionally) are installed
* `yarn add gatal` or `npm install gatal`
* The usage of the code is in next section
* Produce to the same topic as instantiated

### Usage

You can get `mqtt.js` client by calling `client()` function (take a look at example below). More documentation about this, can be found on [MQTT.js](https://github.com/mqttjs/MQTT.js);

```js
const Gatal = require("gatal");

const config = {broker: "mqtt://test.mosquitto.org", topic: "presence"};

const gatal = new Gatal(config);

const mqtt = gatal.client();
const mqttObservable = gatal.observable();

mqttObservable
.subscribe(
  message => console.info(message.toString("utf8")),
  err => console.error(err.message)
);
```