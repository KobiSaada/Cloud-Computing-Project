
var redis = require('redis');
var redisClient = redis.createClient();
var data = require('./data');



async function getAverageWaitForAggregation(){
    let keys = await redisClient.keysAsync('waitTimeForAggregation-*');
    keys.sort();
    let averageWaitTimeList = [];
    for(var i=0;i< keys.length;i++){
        let response = await redisClient.getAsync(keys[i]);
        averageWaitTimeList.push(response);
    }
    return averageWaitTimeList;
}

async function getTotalWaitingForAggregation(){
    let keys = await redisClient.keysAsync('totalWaitingAgg-*');
    keys.sort();
    let totalWaitingList = [];
    for(var i=0;i< keys.length;i++){
        let response = await redisClient.getAsync(keys[i]);
        totalWaitingList.push(response);
    }
    return totalWaitingList;
}

async function getTimeForAggregation(){
    let keys = await redisClient.keysAsync('timeAgg-*');
    keys.sort();
    let timeList = [];
    for(var i=0;i< keys.length;i++){
        let response = await redisClient.getAsync(keys[i]);
        timeList.push(response);
    }
    return timeList;
}

async function getTotalWaitingCalls(){
    var totalWaitingCalls = -1;
    let response = await redisClient.getAsync("totalWaiting");
    if (response == null){
        totalWaitingCalls = 0;
    }
    else{
        totalWaitingCalls = response;
    }
    return totalWaitingCalls;
}

async function getAverageWaitTime(){
    var averageWaitTime = -1;
    let keys = await redisClient.keysAsync('wait*');
    var sum = 0;
    for(var i=0;i< keys.length;i++){
        let response = await redisClient.getAsync(keys[i]);
        sum += parseFloat(response);
    }
    averageWaitTime = sum/keys.length;
    if (Number.isNaN(averageWaitTime)) averageWaitTime = 0;
    return averageWaitTime;
}

async function getNumberOfCallsPerproduct(){
    
    var prodArray = []
    for(prod in data.products)
        prodArray.push(data.products[prod].prodEng);
       
    var countsprodArray = []
    for(prod in prodArray){
        let response = await redisClient.getAsync('prod-'+prodArray[prod]);
        if(response == null) countsprodArray.push(0);
        else countsprodArray.push(parseInt(response));
    
    }
    return [prodArray, countsprodArray];
}

async function getNumberOfCallsPerTopic(){
    var topicArray = []
    for(topic in data.topics)
        topicArray.push(data.topics[topic].topicEng);
    var countsTopicArray = []
    for(topic in topicArray){
        let response = await redisClient.getAsync('topic-'+topicArray[topic]);
        if(response == null) countsTopicArray.push(0);
        else countsTopicArray.push(parseInt(response));
    }
    return [topicArray, countsTopicArray];
}

async function getNumberOfCallsPerCity(){
    var citiesArray = []
    for(city in data.cities)
        citiesArray.push(data.cities[city].cityEng);
    var countsCityArray = []
    for(city in citiesArray){
        let response = await redisClient.getAsync('city-'+citiesArray[city]);
        if(response == null) countsCityArray.push(0);
        else countsCityArray.push(parseInt(response));
       // console.log(citiesArray)
       // console.log(countsCityArray)
    }
    return [citiesArray, countsCityArray];
}

module.exports = {getTotalWaitingCalls, getAverageWaitTime, getNumberOfCallsPerCity, 
    getNumberOfCallsPerTopic, getNumberOfCallsPerproduct, getTotalWaitingForAggregation, getAverageWaitForAggregation,getTimeForAggregation};
