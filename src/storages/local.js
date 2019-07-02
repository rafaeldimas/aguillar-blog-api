const multer = require('multer')
const { upload } = require('../configs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload.publicStorage)
  }
})

module.exports = storage
