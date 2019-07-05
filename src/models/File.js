const mongoose = require('mongoose')

const { upload } = require('../configs')
const storages = require('../storages')

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  storage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

FileSchema.post('findOneAndDelete', async function (doc, next) {
  const { destroy } = storages[doc.storage] || storages[upload.storage]
  await destroy(doc.name)
})

FileSchema.methods = {
  uri () {
    const { makeUri } = storages[this.storage] || storages[upload.storage]
    return makeUri(this.name)
  }
}

module.exports = mongoose.model('File', FileSchema)
