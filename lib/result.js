var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

mongoose.connect('mongdb://localhost/results', function(err) {
  if (err) {
    console.error(err);
  }
});

var Math = mongoose.model('math', new Schema({
  start: Date,
  questions: [],
  created: { type: Date, default: Date.now() }
}));

exports.math = Math;