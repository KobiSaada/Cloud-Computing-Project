const bigml = require("bigml");
const axios = require("axios");
const bigMLdfkjvhkdfv = require('./bigml');
const jsonfile = require("jsonfile");
const MongoClient = require("mongodb").MongoClient;
//require("dotenv").config();
//const mongoSender = require("./MongoManager/mongo");
const callreports = require("../MongoManager/callreports ");
////const mongoConnector2 = require("/phoneCallPredictModel");
const BIGML_USERNAME='shahaknir'
const BIGML_API_KEY='3c9839d145c535388f8e2f9831a0e3b21e2810ce'
const BIGML_AUTH=`username=${BIGML_USERNAME};api_key=${BIGML_API_KEY}`

const client = new MongoClient("mongodb+srv://kobi:Kobian054@cluster0.ze2y4.mongodb.net/Cluster0?retryWrites=true&w=majority");
/*
Insert corrected dbName 
*/
const dbName = "Cluster0", collectionName = "callreports";

const connection = new bigml.BigML();
const source = new bigml.Source();
let modelId = "";



/**
 * 
 * @param {Kafka destination compenant} req 
 * @param {schema} res 
 */
/**
 * @description Builds a model from the data in the database
 */




const buildModel = async (req, res) => {
    const sourceInfo = await callreports.get();
    
    console.log('sourceInfo',JSON.stringify(sourceInfo))
    
    
    
    
    // .map((call) => {

    //     return {
    //         city: call.city,
    //         gender: call.gender,
    //         age: call.age,
    //         product: call.product,
    //         topic: call.topic,
    //         totalTime: call.totalTime,
    //         mood: call.mood,
            
    //     };
    // });
    // var connection = new bigml.BigML('shahaknir','3c9839d145c535388f8e2f9831a0e3b21e2810ce')
    //const BIGML_AUTH = `BIGML_USERNAME=shahaknir,BIGML_API_KEY=3c9839d145c535388f8e2f9831a0e3b21e2810ce`;
    
// replace the username and the API KEY of your own
var connection = new bigml.BigML('shahaknir','3c9839d145c535388f8e2f9831a0e3b21e2810ce')

var source = new bigml.Source(connection);
source.create('./callsBMLdata.csv', function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset(connection);
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model(connection);
        model.create(datasetInfo, function (error, modelInfo) {
          if (!error && modelInfo) {
            var prediction = new bigml.Prediction(connection);
            prediction.create(modelInfo, {'petal length': 1},function(error, prediction) { console.log(JSON.stringify(prediction));console.log(prediction.code)}); 
          }
        });
      }
    });
  }
});

    try {                
        const source = await axios.post(`https://bigml.io/andromeda/source?${BIGML_AUTH}`, {
            data: sourceInfo
        });



        
        await new Promise(resolve => setTimeout(resolve, 2000));
        const dataset = await axios.post(`https://bigml.io/andromeda/dataset?${BIGML_AUTH}`, {
            source: source.data.resource
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        const model = await axios.post(`https://bigml.io/andromeda/model?${BIGML_AUTH}`, {
            dataset: dataset.data.resource
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('model', model)
        // res.status(200).send(model.data.resource);
    } catch (error) {
        // res.status(400).send(error);
        console.log('error',error)
    }
   // await makeJsonFile();
    // Change File name to the Json extracted from MongoDB
    // source.create("./callsData.json", function (error) {
    //     if (!error && sourceInfo) {
    //         var dataset = new bigml.Dataset();
    //         dataset.create(sourceInfo, function (error, datasetInfo) {
    //             if (!error && datasetInfo) {
    //                 var model = new bigml.Model();
    //                 model.create(datasetInfo, function (error, modelInfo) {
    //                     if (!error && modelInfo) {
    //                       console.log(modelInfo);
    //                       console.log(modelInfo.resource);
    //                         res.status(200).json({
    //                             message: "Model built",
    //                             modelInfo: modelInfo.resource,
    //                         });
    //                         modelId = modelInfo.resource;
    //                     }
    //                     else {
    //                         res.status(500).send("Error creating model");
    //                     }
    //                 });
    //             }
    //             else {
    //                 res.status(400).send("Error creating dataset");
    //             }
    //         });
    //     }
    //     else {
    //         res.status(400).send("Error creating source");
    //     }
    // });
};





/**
 * @description Predicts the call using the model
 */
const predictCall = (req, res) => {
    const callToPredict = req.body;
    const localModel = new bigml.LocalModel(modelId);
    localModel.predict(callToPredict, function (error, prediction) {
        res.status(200).send(prediction);
    });
};


module.exports = {
    buildModel,
    predictCall
};