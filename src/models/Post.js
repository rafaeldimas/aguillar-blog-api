const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const mongooseSlugUpdater = require('mongoose-slug-updater')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    slug: 'title',
    lowercase: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
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

PostSchema.plugin(mongoosePaginate)
PostSchema.plugin(mongooseSlugUpdater)

module.exports = mongoose.model('Post', PostSchema)
