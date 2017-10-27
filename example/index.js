const Gatal = require("../");

const config = {broker: "mqtt://test.mosquitto.org", topic: "presence"};

const gatal = new Gatal(config);
const mqttObservable = gatal.observable();

mqttObservable
  .subscribe(
    message => console.info(message.toString("utf8")),
    err => console.error(err.message)
  );