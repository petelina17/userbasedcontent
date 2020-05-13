// helper-function to handle errors and make responses for ANY endpoint
const handleError = (res, responseObject) => {
  return (err) => {
    if (err) {
      console.log(err)
      res.statusCode = 400
      res.end({error: err})
      return
    }
    // write res to browser ...
    res.end(responseObject)
  }
}

exports.handleError = handleError