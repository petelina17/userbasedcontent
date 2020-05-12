var Content = require('../models/content')
var express = require('express')
var router = express.Router()
var helpers = require('./helpers')

router.put('/content', async (req, res, next) => {
  // read req ..
  const data = req.body
  // console.log('new content: ' , newContent)

  // go to mongodb ...
  const content = await new Content(data)
  const saved = content.save(helpers.handleError(res, "OK"))
})

router.get('/contents', (req, res) => {
  Content.find({}, (err, contents) => {
    const handler = helpers.handleError(res, JSON.stringify(contents, null, '  '))
    handler(err)
  })
})

router.put('/login', (req, res) => {
  const login = req.body
  if (login.username == null || login.password == null) {
    res.statusCode = 401
    res.end('invalid username or password')
    return
  }

  // check if username exists in database

  // TODO...

  if (false) {
    res.statusCode = 401
    res.end('invalid username or password')
    return
  }

  // compare hash from database and hash of recieved password

  // TODO...

  if (false) {
    res.statusCode = 401
    res.end('invalid username or password')
    return
  }

  res.end(JSON.stringify({login: true}))
})

module.exports = router

