const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    accessKeyId: process.env.AWS_KEY_ID,
    region: process.env.REGION
})
 
var s3 = new aws.S3();
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    // acl: 'public-read',
    bucket: 'tlr-tab-images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;