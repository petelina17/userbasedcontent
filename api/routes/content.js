var Content = require("../models/content");
var express = require("express");
var router = express.Router();
var helpers = require("./helpers");

router.put("/content", async (req, res, next) => {
  // read req ..
  const data = req.body;
  // console.log('new content: ' , newContent)

  // go to mongodb ...
  const content = await new Content(data);
  const saved = content.save(helpers.handleError(res, "OK"));
});

router.get("/contents", (req, res, next) => {
  Content.find({}, (err, contents) => {
    const handler = helpers.handleError(
      res,
      JSON.stringify(contents, null, "  ")
    );
    handler(err);
  });
});

router.post("/register", (req, res) => {
  console.log(req.body);
});

module.exports = router;
