const azure = require('azure-storage');

// Initialize Azure Blob Service
function createBlobService(credentials) {
    return azure.createBlobService({
        connectionString: credentials.connectionString,
    });
}

function uploadToAzure(blobService, containerName, blobName, filePath) {
    return new Promise((resolve, reject) => {
        const options = {
            contentSettings: {
                contentType: 'application/octet-stream', // Set the content type as needed
            },
        };

        blobService.createBlockBlobFromLocalFile(
            containerName,
            blobName,
            filePath,
            options,
            (error, result, response) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
    });
}

function downloadFromAzure(blobService, containerName, blobName, localFilePath) {
    return new Promise((resolve, reject) => {
        blobService.getBlobToLocalFile(
            containerName,
            blobName,
            localFilePath,
            (error, result, response) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
    });
}

module.exports = {
    createBlobService,
    uploadToAzure,
    downloadFromAzure,
};
