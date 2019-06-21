const mongoose = require('mongoose')
const slug = require('slug')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
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

PostSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next()
  }

  this.slug = slug(this.slug, { lower: true })
})

module.exports = mongoose.model('Post', PostSchema)
