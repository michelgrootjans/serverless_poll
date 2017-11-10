'use strict';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-1'});

module.exports.get_votes = (event, context, callback) => {

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

        const votes = data.Items.reduce(function(accumulator, item){
          const vote = item.vote;
          if(!accumulator[vote]) {
            accumulator[vote] = 0;
          }
          accumulator[vote]++;
          return accumulator;
        }, {});

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        } else {
          callback(null, {
            statusCode: 200, 
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({votes: votes}, null, 2)});          
        }
        
    }
}
};


module.exports.post_votes = (event, context, callback) => {  
  const body = JSON.parse(event.body)
  var params = {
    TableName : 'poll-dev-votes',
    Item: {
       id: Math.random().toString(36).replace(/[^a-z]+/g, ''),
       vote: body.vote,
       name: body.name
    }
  };
  
  var documentClient = new AWS.DynamoDB.DocumentClient();
  
  documentClient.put(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });


  console.log('post_votes was called')
  console.log(event)
  console.log(context)
  console.log(params)
  const response = { 
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    }
};
  callback(null, response);
};
