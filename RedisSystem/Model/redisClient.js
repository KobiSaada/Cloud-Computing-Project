
io = require("socket.io-client");
ioClient = io.connect("http://localhost:6062");
redisForclient=require("./redisServer")

ioClient.on("viewDash", (msg) => {
    sendDashboardData();
});

ioClient.on("getAverageWait", (msg) => {
    sendAverageWait();
});

async function sendAverageWait(){
    var average = redisForclient.getAverageWaitTime();
    ioClient.emit("avgWaitTime", average);
}

async function sendDashboardData(){

    var totalWaitingCalls = redisForclient.getTotalWaitingCalls();
    var avgWaitTime = redisForclient.getAverageWaitTime();
    var productsData = redisForclient.getNumberOfCallsPerproduct();
    var products = productsData[0];
    var callPerproduct = productsData[1];
    var cityData = redisForclient.getNumberOfCallsPerCity();
    var cities = cityData[0];
    var callsPerCity = cityData[1];
    var topicData = redisForclient.getNumberOfCallsPerTopic();
    var topics = topicData[0];
    var callsPerTopic = topicData[1];
    
    var callTopicAndproductChartData = {
        
        topics : topics,
        topicsCount : callsPerTopic,
        products : products,
        productsCount : callPerproduct
        
    };
    var callTopicAndCitiesChartData = {
        topics : topics,
        topicsCount : callsPerTopic,
        cities : cities,
        citiesCount : callsPerCity
    };
   // console.log(callTopicAndproductChartData);
   // console.log(productsData);
    var totalWaitingListForAggregation = redisForclient.getTotalWaitingForAggregation();
    var averageWaitTimeListForAggregation = redisForclient.getAverageWaitForAggregation();
    var timeListForAggregation = redisForclient.getTimeForAggregation();
    var dataForAggregationTabe = {
        totalWaitList: totalWaitingListForAggregation,
        averageWaitList: averageWaitTimeListForAggregation,
        timeList: timeListForAggregation
    }
    ioClient.emit("totalWaitingCallsForAggregation", dataForAggregationTabe);
    ioClient.emit("topicproduct",callTopicAndproductChartData);
    ioClient.emit("cityTopic",callTopicAndCitiesChartData);
    ioClient.emit("totalWaiting",totalWaitingCalls);
    ioClient.emit("avgWaitTime", avgWaitTime);
}