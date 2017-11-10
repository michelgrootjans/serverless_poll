'use strict';
module.exports.get_votes_2 = (event, context, callback) => {

  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({region: 'eu-west-1'});

  // Create DynamoDB document client
  var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  var params = {
    TableName: "poll-dev-votes",
    ProjectionExpression: "vote"
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        callback(null, {statusCode: 500, body: JSON.stringify(err, null, 2)});          
      } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(vote) {
           console.log(vote.vote)
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        } else {
          callback(null, {statusCode: 200, body: JSON.stringify(data, null, 2)});          
        }
        
    }
}


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};


module.exports.get_votes = (event, context, callback) => {
  console.log('get_votes was called')
  const response = {
    statusCode: 200,
    body: JSON.stringify({votes: {yes: 3, no: 2}}),
  };
  callback(null, response);
};

module.exports.post_votes = (event, context, callback) => {
  console.log('get_votes was called')
  const response = { statusCode: 201 };
  callback(null, response);
};
