var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var helpers = require("./helpers");
var Content = require("../models/content");

router.put("/content", async (req, res, next) => {
  // read req ..
  const data = req.body;
  // console.log('new content: ' , newContent)

  // go to mongodb ...
  const content = await new Content(data);
  const saved = content.save(helpers.handleError(res, "OK"));
});

router.get("/content", (req, res) => {
  console.log(req.body);
  console.log(res);
  Content.find({}, (err, contents) => {
    const handler = helpers.handleError(
      res,
      JSON.stringify(contents, null, "  ")
    );
    handler(err);
  });
});

router.post("/content/:id", (req, res) => {
  const forumpost = req.params.id;
  console.log(forumpost);
  // const userPost = await new Content(post);
  // userPost.save();

  // res.end(JSON.stringify({ createPost: true }));
});

module.exports = router;
