var router = require('express').Router();

loki = require('lokijs');
var db = new loki('todos.json');

var todos = db.addCollection('todos');

router.route('/')
    .post(function (req, res, next) {

        if (req.body.task) {

            todos.insert({
                task: req.body.task,
                done: false
            })

            res.send(db.getCollection('todos'));
        }
        else {
            throw new Error('A task is required!');
        }

    });

router.route('/:index')
    .put(function (req, res, next) {

        var index = req.params.index;


        if (req.body.task) {

            var todo = todos.get(req.params.index)

            todo.done = req.body.done;

            todos.update(todo);
            // todos.update({
            //     $loki: req.params.index,
            //     task: req.body.task,
            //     done: req.body.done
            // })

            res.send(db.getCollection('todos'));
        }
        else {
            throw new Error('A task is required!');
        }
    });

router.route('/:index?')
    .get(function (req, res, next) {

        if (req.params.index) {
            var index = req.params.index;

            if (index < todos.length || index < 0) {
                res.send(todos[index]);
            }
            else {
                throw new Error('That index does not exist!');
            }
        }
        else {
            res.send(todos);
        }

    })
    .delete(function (req, res, next) {

        if (req.params.index) {
            var todo = todos.get(req.params.index);

            todos.remove(todo);

            res.send(db.getCollection('todos'));
        }
        else {
            throw new Error('An index is required!');
        }

    });

// router.use(function (err, req, res, next) {
//     console.log('Error: ', err);
// 	return next(next);
// });

router.use(function (err, req, res, next) {
    res.json({ success: false, error: { name: err.name, message: err.message } });
});


exports.router = router;