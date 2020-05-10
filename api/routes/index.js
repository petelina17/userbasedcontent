var Post = require('../models/post')

var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/posts', async (req, res, next) => {
  // read req ...

  // go to mongodb ...
  const example = {
    title: 'Fairy tale',
    author: 'Astrid Lindgren',
    date: '2020-05-10',
    content: 'bla-bla'
  }
  const post = await new Post(example)

  const saved = post.save()

  // write res to browser ...
  res.end(JSON.stringify(saved))

})

module.exports = router;
