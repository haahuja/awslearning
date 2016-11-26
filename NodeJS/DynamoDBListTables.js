var aws = require('aws-sdk');
// aws.config.update({region: 'us-east-1'});
aws.config.update({region: 'eu-west-1'});

var db = new aws.DynamoDB({apiVersion: '2012-08-10'});
   	db.listTables(function(err, data) {
  	console.log(data.TableNames);
   	for(item in data.TableNames) 
   	{
   		console.log(item , ' : ' , data.TableNames[item]);
   	}
});