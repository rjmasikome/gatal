const gatal = require("../");

console.info("Starting...");

const config = {broker: "mqtt://test.mosquitto.org", topic: "presence"};
const mqttObservable = new gatal(config);

mqttObservable
.subscribe(
  message => console.info(message.toString("utf8")),
  err => console.error(err.message),
  () => console.info("finished")
);
