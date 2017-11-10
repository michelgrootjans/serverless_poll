'use strict';
module.exports.get_votes_2 = (event, context, callback) => {

  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({region: 'eu-west-1'});

  // Create DynamoDB document client
  var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  var params = {
    TableName: 'poll-dev'
  };

  var response = {};

  docClient.get(params, function(err, data) {
    if (err) {
      response = {
        statusCode: 500
      };
      console.log("Error", err);
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({votes: {yes: 3, no: 2}}),
      };
      console.log("Success", data.Item);
    }
  });


  callback(null, response);

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
