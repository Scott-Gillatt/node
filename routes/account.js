var router = require('express').Router();

var user = null;

router.route('/login')
	.post(function (req, res, next) {

		user = {
			username: req.body.username,
			password: req.body.password
		};

		if (user.username && user.password) {
			res.send({
				success: true,
				status: 'Logged in.'
			});
		}
		else {
			throw new Error('Username or password missing!');
		}

	});

router.route('/session')
	.get(function (req, res, next) {

		res.send(user);
	});

router.route('/logout')
	.get(function (req, res, next) {

		user = null;
		
		res.send({
			success: true,
			status: 'Logged out.'
		});
	});

router.use(function (err, req, res, next) {
    console.log('Error: ', err);
	return next(next);
});

router.use(function (err, req, res, next) {
    res.json({ success: false, error: { name: err.name, message: err.message } });
});


exports.router = router;