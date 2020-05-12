var mongoose = require('mongoose')
var User = require('./models/user')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,  useUnifiedTopology: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected')
})

const createDefaultUser = async () => {
  let user = await User.find({username: 'bob'})
  if (user == null) {
    user = await new User({username: 'bob', passwordHash: '$2b$10$OY.DBPQ6BccUEHj3PWh01OsPxKf3XjxCRgc3Fy.DfhkCwU9DB3AWa'})
    user.save()
  }
}

createDefaultUser()


module.exports = db