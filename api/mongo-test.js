var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,  useUnifiedTopology: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected')
})

// Schema
const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  color: String
});

// Model
const Cat = mongoose.model('Cat', catSchema);

let cat = new Cat({
  name: 'Blackie',
  age: 3,
  color: 'grey'
})

cat.save((err)=> {
  if (err) {
    return handleError(err)
  }
})

const handleError = (err) => {
  console.log(err)
}