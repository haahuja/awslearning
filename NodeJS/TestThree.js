var aws = require('aws-sdk');
var fs = require('fs');
var mime = require('mime');

aws.config.loadFromPath('./AwsConfig.json');

var BUCKET_NAME = 's3deployexample';
var fileName = "TestOne.js";

var s3 = new aws.S3();

function createBucket(bucketName) {
	s3.createBucket({Bucket: bucketName}, function() {
		console.log('created the bucket[' + bucketName + ']');
		console.log(arguments);
		uploadSingleFileToBucket("testFile");
	});
}

function uploadSingleFileToBucket(remoteFileName)
{
	var remoteFilename = "testFile";
	if(remoteFileName)
	{
		remoteFilename = remoteFileName;
	}
	var fileBuffer = fs.readFileSync(fileName);
	var metaData = mime.lookup(fileName);

	s3.putObject({
		ACL: 'public-read',
	    Bucket: BUCKET_NAME,
	    Key: remoteFilename,
	    Body: fileBuffer,
	    ContentType: metaData
	  	}, 
	  	function(error, response) {
	    console.log('uploaded file[' + fileName + '] to [' + remoteFilename + '] as [' + metaData + ']');
	    console.log(arguments);
	});
	
} 

function uploadMultipleFileToBucket() {
	var fileList = getFileList('./');

	fileList.forEach(function(entry) {
	uploadSingleFileToBucket("newFolder/" + entry, 
	  './' + entry);
	});
}

function getFileList(path) {
	var i, fileInfo, filesFound;
	var fileList = [];

	filesFound = fs.readdirSync(path);
	for (i = 0; i < filesFound.length; i++) {
	fileInfo = fs.lstatSync(path + filesFound[i]);
	if (fileInfo.isFile()) fileList.push(filesFound[i]);
	}
	return fileList;
}

function deleteBucket() {
    s3.deleteBucket({Bucket: BUCKET_NAME}, callback);
}

function deleteObject(deleteParams) {
    s3.deleteObject(deleteParams, callback);
}

function emptyBucket()
{
	s3.listObjects({Bucket: BUCKET_NAME}, function (err, data) {
        if (err) {
            console.log("error listing bucket objects "+err);
            return;
        }
        var items = data.Contents;
        for (var i = 0; i < items.length; i += 1) {
            var deleteParams = {Bucket: BUCKET_NAME, Key: items[i].Key};
            deleteObject(deleteParams);
        }
        deleteBucket();
	});

}

function callback(err, data)
{
	if (err) {
        console.log("err " + err);
        return;
    } else {
        console.log("done " + data);
    }
}

createBucket(BUCKET_NAME);
setTimeout(uploadMultipleFileToBucket, 3000);
setTimeout(emptyBucket, 6000);