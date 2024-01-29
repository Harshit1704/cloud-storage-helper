# Cloud Storage Helper

A Node.js library for easy file upload and download operations on cloud storage services like Azure Storage and AWS S3.

## Usage
Use the following code snippets to integrate the `cloud-storage-helper` into your Node.js project:

```javascript
const createStorageClient = require('cloud-storage-helper');

// Initialize Azure client
const azureClient = createStorageClient('azure', { /* Azure credentials */ });

// Upload file to Azure
azureClient.upload('containerName', 'blobName', 'filePath')
    .then(result => console.log('Azure Upload Success:', result))
    .catch(error => console.error('Azure Upload Error:', error));

// Download file from Azure
azureClient.download('containerName', 'blobName', 'localFilePath')
    .then(result => console.log('Azure Download Success:', result))
    .catch(error => console.error('Azure Download Error:', error));

// Initialize S3 client
const s3Client = createStorageClient('s3', { /* S3 credentials */ });

// Upload file to S3
s3Client.upload('bucketName', 'objectKey', 'filePath')
    .then(result => console.log('S3 Upload Success:', result))
    .catch(error => console.error('S3 Upload Error:', error));

// Download file from S3
s3Client.download('bucketName', 'objectKey', 'localFilePath')
    .then(result => console.log('S3 Download Success:', result))
    .catch(error => console.error('S3 Download Error:', error));

```

## API Reference

##### createStorageClient(type, credentials)
Creates a storage client based on the specified type (azure or s3) and provided credentials.

    1. Parameters:
        a. type (String): The type of storage client to create ('azure' or 's3').
        b. credentials (Object): The credentials required for the chosen storage type.
        
    2. Returns:
        An object with upload and download methods.


##### upload(containerName, blobName, filePath)
Uploads a file to the specified container/bucket and blob/object in the cloud storage.

    1. Parameters:
        a. containerName (String): Azure Storage container name or S3 bucket name.
        b. blobName (String): Azure Storage blob name or S3 object key.
        c. filePath (String): Local path to the file to be uploaded.

    2. Returns:
        A Promise that resolves on successful upload.


##### download(containerName, blobName, localFilePath)
Downloads a file from the specified container/bucket and blob/object in the cloud storage.

    1. Parameters:
        a. containerName (String): Azure Storage container name or S3 bucket name.
        b. blobName (String): Azure Storage blob name or S3 object key.
        c. localFilePath (String): Local path to save the downloaded file.

    2. Returns:
        A Promise that resolves with the local file path on successful download.

