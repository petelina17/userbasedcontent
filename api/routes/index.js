var Content = require('../models/content')

var express = require('express')
var router = express.Router()

router.put('/content', async (req, res) => {
  // read req ..
  const data = req.body
  // console.log('new content: ' , newContent)

  // go to mongodb ...
  const content = await new Content(data)
  const saved = content.save(handleError(res, "OK"))
})


// helper-function to handle errors and make responses for ANY endpoint
const handleError = (res, responseObject) => {
  return (err) => {
    if (err) {
      console.log(err)
      res.statusCode = 401
      res.end({error: err})
      return
    }
    // write res to browser ...
    res.end(responseObject)
  }
}

module.exports = router

