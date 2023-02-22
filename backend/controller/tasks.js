const db = require('../config/database').con;

exports.allTask = (req, res, next) => {
	db.query(`SELECT * FROM user_task LEFT JOIN users ON user_task.user_id = users.id LEFT JOIN tasks ON user_task.task_id = tasks.id WHERE users.id = '${req.params.id}'`, function(err, result) {
		if (err) throw err;

		return res.json(result);
	});
}

exports.addTask = (req, res, next) => {
	const id = req.body.id;
	const name = req.body.title;
	const owner = req.body.assignee.key;
	const recurring = req.body.recurring.option;
	const status = req.body.status;
	const dueDate = req.body.dueDate;
	const interval = req.body.interval;
	const fromDate = req.body.fromDate;
	const toDate = req.body.toDate;
	let stringTag = '';

	for(var i = 0; i < req.body.tags.length; i++) {
		stringTag += req.body.tags[i] + ',';
	}
	
	const tag = stringTag;
	const description = req.body.description;

	const sql = `INSERT INTO tasks (id, name, due_date, from_date, to_date, intervalnum, status, tags, description, recurring, owner_id, user_id) VALUES (${id}, '${name}', '${dueDate}', '${fromDate}', '${toDate}', ${interval}, '${status}', '${tag.slice(0, tag.length - 1)}', '${description}', '${recurring}', '${owner}', '${req.params.id}')`;

	db.query(sql, function(err, result) {
		if (err) throw err;
	});

	db.query('SELECT * FROM tasks ORDER BY id DESC LIMIT 1', (err, result) => {
		if (err) throw err;

		db.query(`INSERT INTO user_task (user_id, task_id) VALUES ('${req.params.id}', '${result[0].id}')`);

		db.query(`SELECT * FROM tasks ORDER BY id DESC LIMIT 1`, function(err, result2) {

			return res.json(result2);
		});
	})

}

exports.updateTask = (req, res, next) => {
	const id = req.body.id;
	const name = req.body.title;
	const owner = req.body.assignee.key;
	const recurring = req.body.recurring.option;
	const status = req.body.status.element;
	const dueDate = req.body.dueDate;
	let stringTag = '';

	for(var i = 0; i < req.body.tags.length; i++) {
		stringTag += req.body.tags[i] + ',';
	}
	
	const tag = stringTag;
	const description = req.body.description;

	const sql = `UPDATE tasks SET name = '${name}', due_date = '${dueDate}', status = '${status}', tags = '${tag.slice(0, tag.length - 1)}', description = '${description}', recurring = '${recurring}', owner_id = '${owner}' WHERE id = '${id}'`;

	db.query(sql, function(err, result) {
		db.query("SELECT tasks.*, users.`name` AS assignee FROM tasks INNER JOIN users ON tasks.`user_id` = users.`id`", function(err, result) {
			if (err) throw err;

			return res.json(result);
		});
	});
}

exports.getOwner = (req, res, next) => {
	
}

exports.deleteTask = (req, res, next) => {
	const sql = `DELETE FROM tasks WHERE id = '${req.params.id}'`;

	db.query(sql, function(err, result) {
		if (err) throw err;

		return res.json(result);
	});

	db.query(`DELETE FROM user_task WHERE user_id = '${req.params.userid}' AND task_id = '${req.params.id}'`)
}