const multer = require('multer')
const path = require('path')
const { unlink } = require('fs')
const { promisify } = require('util')

const { upload } = require('../configs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload.publicStorage)
  }
})

const destroy = async (fileName) => {
  const pathFileName = path.resolve(upload.publicStorage, fileName)

  await promisify(unlink)(pathFileName)
}

const makeUri = (fileName) => {
  return `${upload.publicStaticFiles}/${fileName}`
}

module.exports = { storage, destroy, makeUri }
