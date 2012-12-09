var result = require('./../lib/result')
  , label = require('./../lib/label.json');

var num = 10;

exports.create = function(req, res, hoge){
  console.log(hoge);
  var questions = [];
  for (var i = 0; i < num; i++) {
    questions.push({
      term0: createRandom(10, 20),
      term1: createRandom(5, 9)
    });
  }

  res.render('math', {
    label:label,
    title:label.question,
    questions: questions,
    num: num,
    start: Date.now(),
    elapsed: 0,
    corrected: false
  });
};

exports.verify = function(req, res) {
  var questions = [];
  var start = parseInt(req.body.start, 10);
  for(var i = 0; i < num; i++) {
    var term0 = parseInt(req.body['term0-' + i], 10);
    var term1 = parseInt(req.body['term1-' + i], 10);
    var box = req.body['box-' + i].length > 0 ? parseInt(req.body['box-' + i], 10) : undefined;
    questions.push({
      term0: term0,
      term1: term1,
      box: box,
      result: term0 - term1 === box
    });
  }

/*
  result.math({ start: new Date(start), questions:questions }).save(function(err) {
    if (err) {
      console.error(err);
    }
    console.log('save...');
  });
 */

  res.render('math', {
    label: label,
    title: label.question,
    questions: questions,
    num: num,
    start: start,
    elapsed: Math.floor((Date.now() - req.body.start) / 1000),
    corrected: questions.filter(function(x) { return x.result; }).length === num
  });
};

function createRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}