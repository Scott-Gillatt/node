var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var accountRouter = require('./routes/account');
var todoRouter = require('./routes/todos');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   res.render('index', {name: req.query.name });
// });

app.get('/:name?', function (req, res) {
  res.render('index', {name: req.params.name });
});

app.post('/', function (req, res) {
  console.log(req.body);
  res.send('Got a POST request');
});

app.use('/account', accountRouter.router)
app.use('/todos', todoRouter.router)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});