var router = require('express').Router();

var todos = [];

router.route('/add')
    .post(function (req, res, next) {

        todo = {
            task: req.body.task,
        };

        if (req.body.task) {
            todos.push(req.body.task)
            res.send(todos);
        } else {
            throw new Error('A task is required');
        }

    });

router.route('/:index')
    .put(function (req, res, next) {
        var index = req.params.index;

        if (index < todos.length || index < 0) {
            if (req.body.task) {
                todos[index] = req.body.task;

                res.send(todos);
            }
        } else {
            throw new Error('A task is required!')
        }
    })

router.route('/:index?')
    .get(function (req, res, next) {

        if (req.params.index) {
            var index = req.params.index;

            if (index < todos.length || index < 0) {
                res.send(todos[index]);
            } else {
                throw new Error('That index does not exist!')
            }
        } else {
            res.send(todos);
        }

    })
    .delete(function (req, res, netxt) {
        if (req.params.index) {
            var index = req.params.index;

            if (index < todos.length || index < 0) {
                todos.splice(index, 1);

                res.send(todos);
            }
            else {
                throw new Error('That index does not exist!');
            }
        }
        else {
            throw new Error('An index is required!');
        }
    });

router.use(function (err, req, res, next) {
    console.log("Error: ", err);
    return next(err);
});

router.use(function (err, req, res, next) {
    res.json({ success: false, error: { name: err.name, message: err.message } });
});

exports.router = router;
