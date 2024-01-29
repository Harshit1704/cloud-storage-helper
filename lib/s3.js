const AWS = require('aws-sdk');

// Initialize AWS S3 Client
function createS3Client(credentials) {
    return new AWS.S3({
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        region: credentials.region,
    });
}

function uploadToS3(s3, bucketName, objectKey, filePath) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: objectKey,
            Body: require('fs').createReadStream(filePath),
            ContentType: 'application/octet-stream', // Set the content type as needed
        };

        s3.upload(params, (error, data) => {
            if (!error) {
                resolve(data);
            } else {
                reject(error);
            }
        });
    });
}

function downloadFromS3(s3, bucketName, objectKey, localFilePath) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: objectKey,
        };

        const fileStream = require('fs').createWriteStream(localFilePath);

        s3.getObject(params)
            .createReadStream()
            .on('end', () => resolve(localFilePath))
            .on('error', error => reject(error))
            .pipe(fileStream);
    });
}

module.exports = {
    createS3Client,
    uploadToS3,
    downloadFromS3,
};
