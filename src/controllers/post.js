const express = require('express')
const { Post } = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
  const postsPaginated = await Post.paginate({}, req.optionsPaginate)

  return res.json(postsPaginated)
})

router.get('/:slug', async (req, res) => {
  const { slug } = req.params

  if (!slug) {
    res.status(410).json({ message: 'Slug required.' })
  }

  try {
    const post = await Post.findOne({ slug })

    return res.json({ post })
  } catch (error) {
    res.status(500).json({ message: 'Server error. Try later.' })
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  const { title, description, body } = req.body

  if (!title || !description || !body) {
    res.status(410).json({ message: 'Title, Description and Body required.' })
  }

  try {
    const post = await Post.create({ title, description, body })

    return res.json({ post })
  } catch (error) {
    res.status(500).json({ message: 'Server error. Try later.' })
    console.log(error)
  }
})

router.put('/:slug', async (req, res) => {
  const { slug } = req.params
  const { title, description, body } = req.body

  if (!slug) {
    res.status(410).json({ message: 'Slug required.' })
  }

  if (!title || !description || !body) {
    res.status(410).json({ message: 'Title, Description and Body required.' })
  }

  try {
    const post = await Post.findOneAndUpdate({ slug }, { title, description, body }, {
      new: true
    })

    return res.json({ post })
  } catch (error) {
    res.status(500).json({ message: 'Server error. Try later.' })
    console.log(error)
  }
})

router.delete('/:slug', async (req, res) => { })

module.exports = {
  path: '/post',
  middleware: ['auth', 'paginate'],
  router
}
