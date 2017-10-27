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

    this._client  = mqtt.connect(this.broker);
    this.start();
  }


  start() {
    this._client.on("connect", () => {
      this._client.subscribe(this.topic);
    });
  }

  client() {
    return this._client;
  }

  observable() {
    
    this.start();

    return Observable.create((observer) => {

      this._client.on("message", (topic, message) => {
        observer.onNext(message);
      });

      this._client.on("close", () => {
        observer.onNext("close");
      });

      this._client.on("offline", () => {
        observer.onNext("offline");
      });

      this._client.on("error", (error) => {
        observer.onError(error);
      });

    });
  }


}

module.exports = Gatal;
