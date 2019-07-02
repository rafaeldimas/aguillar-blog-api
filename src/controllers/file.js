const express = require('express')
const router = express.Router()

const { upload: uploadConfig } = require('../configs')
const { upload } = require('../middleware')

const { File } = require('../models')

router.post('/', upload.single('file'), async (req, res) => {
  const { filename: name } = req.file
  const { description } = req.body
  const { storage } = uploadConfig

  if (!name || !description || !storage) {
    res.status(410).json({ message: 'File and Description required.' })
  }

  try {
    const file = await File.create({ name, description, storage })

    return res.json({ file, uri: file.uri() })
  } catch (error) {
    res.status(500).json({ message: 'Server error. Try later.' })
    console.log(error)
  }
})

router.delete('/:name', async (req, res) => {
  //
})

module.exports = {
  path: '/file',
  middleware: ['auth'],
  router
}
