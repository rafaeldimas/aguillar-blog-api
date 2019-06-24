const express = require('express')
const { Post } = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
  const postsPaginated = await Post.paginate({}, req.optionsPaginate)
  return res.json(postsPaginated)
})

router.get('/:slug', async (req, res) => { })

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

router.put('/:slug', async (req, res) => { })

router.delete('/:slug', async (req, res) => { })

module.exports = {
  path: '/post',
  middleware: ['auth', 'paginate'],
  router
}
