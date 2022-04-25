/*
We're creating a const of mongoDB info
*/
const mongo_obj = require("mongocon");

// Insert the MongoDB URL here
mongo_obj.connect('MongoDB URL Insert HERE!!'/*process.env.MONGO_DB_URL*/);

const Schema = mongo_obj.Schema;

const ObjectId = Schema.ObjectId;

/**
 * creating a const of call as we want to get it from the DB
 */
const PhoneCallPredictSchema = new Schema({
  start_time: String,
  end_time: String,
  duration: Number,
  name: String,
  phone: Number,
  age: Number,
  gender: String,
  city: String,
  lang: String,
  product: String,
  topic: String,
});

/**
 * creating a model from the data we get from the DB
 */
//Change 'PhoneCall' to the Kafka destination compenant from the bml.controller as well
const PhoneCallModel = mongo_obj.model('PhoneCall', PhoneCallPredictSchema);

const db = mongo_obj.connection;

db.on("error", console.error.bind(console, "connection error:"));
/**
 * once a connection is being estableshed with the DB - write to log
 */
db.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = PhoneCallModel;