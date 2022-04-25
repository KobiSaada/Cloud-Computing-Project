// https://github.com/bigmlcom/bigml-node/blob/master/docs/index.md
// https://www.dataem.com/bigml
// Don't run the all code all the time - produce a model ONCE and use for predictions from now on
// Look for an asyc version.

var bigml = require('bigml');
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