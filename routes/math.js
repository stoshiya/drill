var result = require('./../lib/result')
  , label = require('./../lib/label.json');

var num = 10;

exports.subtraction = function(req, res){
  var questions = [];
  for (var i = 0; i < num; i++) {
    questions.push({
      term0: createRandom(10, 20),
      operator: 'minus',
      term1: createRandom(5, 9)
    });
  }
  render(res, questions, Date.now(), 0, false, req.url);
};

exports.addition = function(req, res){
  var questions = [];
  for (var i = 0; i < num; i++) {
    questions.push({
      term0: createRandom(1, 9),
      operator: 'plus',
      term1: createRandom(1, 9)
    });
  }
  render(res, questions, Date.now(), 0, false, req.url);
};

exports.verify = function(req, res) {
  var questions = [];
  var start = parseInt(req.body.start, 10);
  for(var i = 0; i < num; i++) {
    var term0 = parseInt(req.body['term0-' + i], 10);
    var term1 = parseInt(req.body['term1-' + i], 10);
    var box = req.body['box-' + i].length > 0 ? parseInt(req.body['box-' + i], 10) : undefined;
    var operator = req.body['operator-' + i];
    var result;
    if (operator === 'plus') {
      result = term0 + term1 === box;
    }
    if (operator === 'minus') {
      result = term0 - term1 === box;
    }
    questions.push({
      term0: term0,
      term1: term1,
      operator: operator,
      box: box,
      result: result
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

  var elasped = Math.floor((Date.now() - req.body.start) / 1000);
  var corrected = questions.filter(function(x) { return x.result; }).length === num;

  render(res, questions, start, elasped, corrected, req.body.path);
};

function createRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function render(res, questions, start, elasped, corrected, path) {
  res.render('math', {
    label: label,
    title: label.question,
    questions: questions,
    num: num,
    start: start,
    elapsed: elasped,
    corrected: corrected,
    path: path
  });
}