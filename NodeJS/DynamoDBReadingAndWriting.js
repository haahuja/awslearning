var aws = require('aws-sdk');
aws.config.update({region: 'eu-west-1'});

function listDynamoDBTables()
{
	var db = new aws.DynamoDB({apiVersion: '2012-08-10'});
	db.listTables(function(err, data){
		for(item in data.TableNames) 
	   	{
	   		console.log(item , ' : ' , data.TableNames[item]);
	   		readAndWriteToDynamoDB(data.TableNames[item]);
	   	}
	});
}

function readAndWriteToDynamoDB(tableName)
{
	var table = new aws.DynamoDB({apiVersion: '2012-08-10', params: {TableName: tableName}});
	var key = 'UNIQUE_KEY_ID';

	// Write the item to the table
	var itemParams = {
	   Item: {
	     id: {S: key}, 
	     data: {S: 'data'}
	   }
	};
	table.putItem(itemParams, function() {
	    // Read the item from the table
	    table.getItem({Key: {id: '205'}}, function(err, data) {
	    	for(item in data)
	    	{
	    		console.log(item);
	    	}
		});
	});
}

listDynamoDBTables();