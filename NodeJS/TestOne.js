var AWS = require('aws-sdk'); 

var s3 = new AWS.S3(); 

 s3.createBucket({Bucket: 'hiteshtestbucketone'}, function() {

  var params = {Bucket: 'hiteshtestbucketone', Key: 'myTestKey', Body: 'Hello!'};

  s3.putObject(params, function(err, data) {

      if (err)       

          console.log(err)     

      else       console.log("Successfully uploaded data to myTestBucket/myTestKey");   

   });

});
