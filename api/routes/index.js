var Content = require("../models/content");
var User = require("../models/user");
var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var helpers = require("./helpers");

router.put("/content", async (req, res, next) => {
  // read req ..
  const data = req.body;
  // console.log('new content: ' , newContent)

  // go to mongodb ...
  const content = await new Content(data);
  const saved = content.save(helpers.handleError(res, "OK"));
});

router.get("/contents", (req, res) => {
  Content.find({}, (err, contents) => {
    const handler = helpers.handleError(
      res,
      JSON.stringify(contents, null, "  ")
    );
    handler(err);
  });
});

router.put("/login", async (req, res) => {
  const login = req.body;
  console.log(login);
  if (login.email == null || login.password == null) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: "invalid username or password" }));
    return;
  }

  // check if username exists in database
  const user = await User.findOne({ email: login.email });
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

router.put("/register", async (req, res) => {
  const registration = req.body;
  console.log(registration);

  if (
    registration.email === null ||
    registration.password === null ||
    registration.fullname === null ||
    registration.phoneNumber === null
  ) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "incorrect input" }));
    return;
  }

  // check if username exists in database
  let user = await User.findOne({ email: registration.email });
  if (user != null) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "user already exist" }));
    return;
  }

  user = {
    email: registration.email,
    fullname: registration.fullname,
    phoneNumber: registration.phoneNumber,
    passwordHash: bcrypt.hashSync(registration.password, 10),
  };
  const userData = await new User(user);
  userData.save();

  res.end(JSON.stringify({ success: true }));
});

module.exports = router;
