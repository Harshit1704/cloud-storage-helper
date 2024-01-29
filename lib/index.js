const azure = require('./azure');
const s3 = require('./s3');

function createStorageClient(type, credentials) {
    if (type === 'azure') {
        // Initialize Azure Storage client with credentials
        const blobService = azure.createBlobService(credentials);
        return {
            upload: azure.uploadToAzure.bind(null, blobService),
            download: azure.downloadFromAzure.bind(null, blobService),
        };
    } else if (type === 's3') {
        // Initialize AWS S3 client with credentials
        const s3Client = s3.createS3Client(credentials);
        return {
            upload: s3.uploadToS3.bind(null, s3Client),
            download: s3.downloadFromS3.bind(null, s3Client),
        };
    } else {
        throw new Error('Invalid storage type');
    }
}

module.exports = createStorageClient;
