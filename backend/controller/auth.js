const md5 = require('md5');
const db = require('../config/database').con;

exports.loginUser = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	db.query(`SELECT * FROM users WHERE email = '${email}'`, function (err, result) {
		if (result.length) {

			if (result[0].password === md5(password)) {

				return res.json({ ...result, status: 1 })
			} else {

				return res.json({ msg: 'Password incorrect.', status: 0 })
			}

		} else {
			return res.json({ msg: 'The user is not existed.', status: 0 })
		}
	})
}

exports.registerUser = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	db.query(`SELECT * FROM users WHERE email = '${email}'`, function (err, result) {
		if (result.length) {
			return res.json({ msg: 'The user already exists.', status: 0 })
		} else {
			const encryptPass = md5(password)

			db.query(`INSERT INTO users (name, email, password, status, created_at) VALUES ('${name}','${email}','${encryptPass}','Pending', NOW())`, function (err, result) {
				db.query('SELECT * FROM users ORDER BY id DESC LIMIT 1', function (err, result) {

					return res.json({ msg: result[0], status: 1 })
				})
			})
		}
	})
}

exports.resetPassword = (req, res, next) => {
	const encryptPass = md5(req.body.currentpassword)
	
	db.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${encryptPass}'`, (err, result) => {
		if (result.length) {

			db.query(`UPDATE users SET password = '${md5(req.body.password)}' WHERE email = '${req.body.email}'`, (err, result) => {
				return res.json(result);
			})
		} else {
			return res.json({message: 'wrong'});
		}
	})
}