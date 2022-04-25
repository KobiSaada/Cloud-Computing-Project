const mongoose = require('mongoose'); 
io = require("socket.io-client");
client = io.connect("http://localhost:6663");
// const bml = require('../bigML/bml.controller');

const URL = "mongodb+srv://kobi:Kobian054@cluster0.ze2y4.mongodb.net/Cluster0?retryWrites=true&w=majority"
const connectDB = async () => {
    await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
    console.log("connected to mongo...!")
}
connectDB();

// save without schema
var callRepoSchema = mongoose.Schema({}, { strict: false });
// bml.buildModel(null,null)
var callR = mongoose.model('CallReport', callRepoSchema);
//console.log(client);




client.on("endCallReport", (msg) => {
    callDetailsJson = JSON.parse(msg)
    console.log("end call report in mongo: ", msg);
    var newCall = new callR(callDetailsJson);
    newCall.save(function(err) {
        if (err) throw err;
        console.log('new call report successfully saved.');
    });
});
