const io = require("socket.io");
const ioServerRedis = io(6063);
const kafka = require('../Kafka/kafkaProduce');

ioServerRedis.on("connection", (socket) => {
    console.log("new user connected to call center");

    socket.on("totalWaitingCalls", (msg) => { 
  
        console.log("got new message in Call center.js: ", msg); 
        //console.log("msg")
       // kafka.publish(msg)
       kafka.publish(msg,"w1ypgbv4-new");
       kafka.publish(msg,"w1ypgbv4-kobi");
       // kafka.publish(msg, "Mongo");
        console.log("msg",msg);
      // kafka.publish(msg, "Redis");
    });

    socket.on("callDetails", (msg) => { 
      //  console.log(msg);
        kafka.publish(msg,"w1ypgbv4-new");
       kafka.publish(msg,"w1ypgbv4-kobi");
      //  kafka.publish(msg)
     //  kafka.publish(msg, "Mongo");
      //  kafka.publish(msg, "Redis");
    });
});