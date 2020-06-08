var Content = require("../models/content");
var User = require("../models/user");
var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var helpers = require("./helpers");

// CREATE NEW BLOGPOST
router.post("/content", async (req, res, next) => {
  console.log('new post, session: ', req.session.username)
  if (req.session.username == null) {
    res.statusCode = 401
    res.json({ error: "you are not authorised" })
    return
  }
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
  const responseData = { createPost: true, blogPost: content }
  const saved = content.save(helpers.handleError(res, responseData));
});

// READ ALL BLOGPOSTS FROM DATABASE
router.get("/contents", async (req, res) => {
  console.log('get all posts, session: ', req.session.username)

  const contents = await Content.find({})
  if (contents == null) {
    helpers.handleError(res, { error: 'content not found'})
  }
  res.status(200).json(contents)
});

// TRY TO LOGIN
router.post("/login", async (req, res) => {
  // Check if user already is logged in
  if (req.session.username) {
    const message = 'You are already logged in'
    console.log(message)
    return res.json(message)
  }

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

  // Create session
  console.log('put username into session:', user.username)
  req.session.username = user.username
  res.status(200).json({ login: true });
});

//LOGOUT USER
router.post("/logout", async (req, res) => {
  console.log('logout: ', req.session.username)
  req.session = null;
  // req.secret = baseCookieOptions.secret
  // res.clearCookie('app.session', baseCookieOptions)
  // res.clearCookie('app.session.sig', baseCookieOptions)
  // res.clearCookie('ubc.session')
  // res.clearCookie('ubc.session.sig')
  res.status(200).send('Logged out');
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
  console.log('session: ', req.session.username)
  if (req.session.username == null) {
    res.statusCode = 401
    res.json({ error: "you are not authorised" })
    return
  }

  console.log('query id:', req.params.id)
  const found = await Content.findById(req.params.id)
  if (found == null) {
    res.statusCode = 400
    res.end(JSON.stringify({ error: "invalid blog-post id: " + req.params.id }))
    return
  }

  if (found.username !== req.session.username) {
    res.statusCode = 401
    res.json({ error: "only the author can edit" })
    return
  }

  const data = req.body
  found.title = data.title
  found.username = data.username
  found.text = data.text
  found.date = data.date

  const saved = found.save(helpers.handleError(res, { editPost: true }));
});

// DELETE BLOGPOST BY ID
router.delete("/content/:id", async (req, res) => {
  if (req.session.username == null) {
    res.statusCode = 401
    res.json({ error: "you are not authorised" })
    return
  }
  console.log('delete req.params.id:', req.params.id)
  const found = await Content.findById(req.params.id)
  if (found == null) {
    res.statusCode = 401
    res.end(JSON.stringify({ error: "invalid blog-post id: " + req.params.id }))
    return
  }

  console.log('delete id:', found._id)
  if (found.username !== req.session.username) {
    res.statusCode = 401
    res.json({ error: "only the author can delete" })
    return
  }
  Content.deleteOne(
      {_id: found._id},
      helpers.handleError(res, { deletePost: true })
  )
})

module.exports = router;
