export const kafkaConf = {
    "group.id": "tricycle.srvs.cloudkafka.com",
    "metadata.broker.list": "tricycle-01.srvs.cloudkafka.com:9094,tricycle-02.srvs.cloudkafka.com:9094,tricycle-03.srvs.cloudkafka.com:9094".split(","),
    "socket.keepalive.enable": true,
    "security.protocol": "SASL_SSL",
    "sasl.mechanisms": "SCRAM-SHA-256",
    "sasl.username": "w1ypgbv4",
    "sasl.password": "I_Hi4yznM4jOSnWrVhaahJBqRChJBpus",
    "debug": "generic,broker,security"
  };