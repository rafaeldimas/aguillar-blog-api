const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => { })

router.get('/:slug', async (req, res) => { })

router.post('/', async (req, res) => { })

router.put('/:slug', async (req, res) => { })

router.delete('/:slug', async (req, res) => { })

module.exports = {
  path: '/post',
  router
}
