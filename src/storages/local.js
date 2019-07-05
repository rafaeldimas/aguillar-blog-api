const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const { unlink } = require('fs').promises

const { upload } = require('../configs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, upload.publicStorage)
  },
  filename: (req, file, cb) => {
    const fileName = crypto.randomBytes(18).toString('hex')
    const fileExt = path.extname(file.originalname)
    cb(null, `${fileName}${fileExt}`)
  }
})

const destroy = async (fileName) => {
  const pathFileName = path.resolve(upload.publicStorage, fileName)

  await unlink(pathFileName)
}

const makeUri = (fileName) => {
  return `${upload.publicStaticFiles}/${fileName}`
}

module.exports = { storage, destroy, makeUri }
