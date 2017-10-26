const mqtt = require("mqtt");
const {Observable} = require("rx");

class Gatal {

  constructor(broker = {}, topic) {

    if (typeof broker === "object") {
      this.broker = broker.broker;
      this.topic = broker.topic;
    }

    this.broker = this.broker || broker;
    this.topic = this.topic || topic;

    if (typeof this.broker !== "string") {
      throw new Error("Please provide broker as a string");
    }

    this.client  = mqtt.connect(this.broker);
    this.start();

    return this.getObservable();
  }


  start() {
    this.client.on("connect", () => {
      this.client.subscribe(this.topic);
    });
  }

  getObservable() {
    this.start();
    return Observable.create((observer) => {

      this.client.on("message", (topic, message) => {
        observer.onNext(message);
      });

      this.client.on("close", (topic, message) => {
        observer.onNext("close");
      });

      this.client.on("offline", (error) => {
        observer.onNext("offline");
      });

      this.client.on("error", (error) => {
        observer.onError(error);
      });

    });
  }


}

module.exports = Gatal;
