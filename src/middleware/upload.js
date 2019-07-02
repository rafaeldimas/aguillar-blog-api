const multer = require('multer')
const { upload } = require('../configs')
const storages = require('../storages')

const multerConfig = {
  storage: storages[upload.storage],
  limits: {
    fileSize: upload.limitSize * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (upload.allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}

module.exports = multer(multerConfig)
