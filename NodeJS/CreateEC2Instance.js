var aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});

var ec2 = new aws.EC2({apiVersion: '2016-09-15'});

var params = {
   ImageId: 'ami-b73b63a0', // Amazon Linux AMI x86_64 EBS
   InstanceType: 't2.micro',
   MinCount: 1, 
   MaxCount: 1
};

ec2.runInstances(params, function(err, data) {
   if (err) { 
      console.log("Could not create instance", err); 
      return; 
   }
   var instanceId = data.Instances[0].InstanceId;
   console.log("Created instance", instanceId);
   for (var item in data.Instances[0]) {console.log(item, " : " , data.Instances[0][item])}
   // console.log("Instances data : ", data.Instances[0].toString());
   // Add tags to the instance
   params = {Resources: [instanceId], Tags: [
      {
         Key: 'Name', 
         Value: 'instanceName'
      }
   ]};
   ec2.createTags(params, function(err) {
      console.log("Tagging instance", err ? "failure" : "success");
   });
});