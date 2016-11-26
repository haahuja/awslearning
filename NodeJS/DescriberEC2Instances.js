var aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});

var ec2 = new aws.EC2({apiVersion: '2016-09-15'});

function describerEC2Instances() {
	ec2.describeInstances( function(err, data) {
		console.log("\nIn describe instances:\n");
		if (err) console.log(err, err.stack); // an error occurred
		else
		{     
			// for (var item in data) {console.log(item , " : " , data[item])} // successful response
			for (var i = 0; i < data.Reservations.length; i++) {
				console.log('\n****** Starting Printing information for instanceId : ', data.Reservations[i]['Instances'][0]['InstanceId'] , '*********** \n');
				for (var item in data.Reservations[i]['Instances'][0]) {console.log(item, " : " , data.Reservations[i]['Instances'][0][item] )}
				console.log('\n****** End Printing information for instanceId : ', data.Reservations[i]['Instances'][0]['InstanceId'] , '*********** \n');
			}
		}
	});
}

describerEC2Instances();