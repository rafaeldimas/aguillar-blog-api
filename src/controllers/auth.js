const express = require('express')
const router = express.Router()

const { User } = require('../models')

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    if (!(await user.compareHash(password))) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    return res.json({
      token: User.generateToken(user)
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error. Try later.' })
    console.log(error)
  }
})

router.post('/register', async (req, res) => {
  const { email } = req.body

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json({
      token: User.generateToken(user)
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error. Try later.' })
    console.log(error)
  }
})

module.exports = {
  path: '/auth',
  router
}
