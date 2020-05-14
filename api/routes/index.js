var Content = require("../models/content");
var User = require("../models/user");
var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var helpers = require("./helpers");

// CREATE NEW BLOGPOST
router.post("/content", async (req, res, next) => {
  // read req ..
  const forumpost = req.body;
  let post = {
    title: forumpost.title,
    username: forumpost.username,
    text: forumpost.text,
    date: forumpost.date,
  };
  // console.log('new content: ' , newContent)

  // go to mongodb ...
  const content = await new Content(post);
  const saved = content.save(helpers.handleError(res, JSON.stringify({ createPost: true })));
});

// READ ALL BLOGPOSTS FROM DATABASE
router.get("/contents", (req, res) => {
  Content.find({}, (err, contents) => {
    const handler = helpers.handleError(
      res,
      JSON.stringify(contents, null, "  ")
    );
    handler(err);
  });
});

// TRY TO LOGIN
router.post("/login", async (req, res) => {
  const login = req.body;

  if (login.username == null || login.password == null) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "invalid username or password" }));
    return;
  }

  // check if username exists in database
  const user = await User.findOne({ username: login.username });

  if (user == null) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "invalid username or password" }));
    return;
  }

  // compare hash from database and hash of recieved password
  const match = bcrypt.compareSync(login.password, user.passwordHash);
  console.log("match ", match);
  if (!match) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "invalid username or password" }));
    return;
  }

  res.end(JSON.stringify({ login: true }));
});

// REGISTER NEW USER
router.post("/register", async (req, res) => {
  const registration = req.body;
  console.log('registration:', registration)

  // ***************************************************************
  // it should be '==' here instead of '===' !
  //     to check both 'null' and 'undefined' values
  // ***************************************************************
  if (
    registration.email == null ||
    registration.username == null ||
    registration.password == null ||
    registration.fullname == null ||
    registration.phoneNumber == null
  ) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "incorrect input" }));
    return;
  }

  // check if username exists in database
  let user = await User.findOne({ email: registration.username });
  if (user != null) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "user already exist" }));
    return;
  }

  user = {
    email: registration.email,
    fullname: registration.fullname,
    username: registration.username,
    phoneNumber: registration.phoneNumber,
    passwordHash: bcrypt.hashSync(registration.password, 10),
  };
  const userData = await new User(user);
  userData.save();
  res.json({ success: true });
});

// EDIT BLOGPOST BY ID
router.put("/content/:id", async (req, res) => {
  console.log('query id:', req.params.id)
  const found = await Content.findById(req.params.id)
  if (found == null) {
    res.statusCode = 401
    res.end(JSON.stringify({ error: "invalid blog-post id: " + req.params.id }))
    return
  }

  const data = req.body
  found.title = data.title
  found.username = data.username
  found.text = data.text
  found.date = data.date

  const saved = found.save(helpers.handleError(res, JSON.stringify({ editPost: true })));
});

// DELETE BLOGPOST BY ID
router.delete("/content/:id", async (req, res) => {
  // req.params.id
  const found = await Content.findById(req.params.id)
  if (found == null) {
    res.statusCode = 401
    res.end(JSON.stringify({ error: "invalid blog-post id: " + req.params.id }))
    return
  }

  Content.deleteOne(
      {_id: req.params.id},
      helpers.handleError(res, JSON.stringify({ deletePost: true }))
  )
})

module.exports = router;
