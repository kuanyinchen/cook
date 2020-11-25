require('dotenv').config();
const{S3_access_key_id,S3_secret_access_key,S3_aws_region} = process.env
const multer = require('multer');
const AWS = require('aws-sdk');
var multerS3 = require('multer-s3');

const s3 = new AWS.S3({
   accessKeyId: S3_access_key_id,
   secretAccessKey: S3_secret_access_key,
   region:S3_aws_region
});

const uploadS3 = multer({
   storage: multerS3({
     s3: s3,
     acl: 'public-read',
     bucket: 'justmake',
     contentType: multerS3.AUTO_CONTENT_TYPE,
     metadata: (req, file, cb) => {
       cb(null, {fieldName: file.fieldname})
     },
     key: (req, file, cb) => {
       cb(null, Date.now() + '-' + file.originalname)
     }
   })
 });

module.exports = uploadS3;