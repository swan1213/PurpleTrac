const db = require('../config/database').con;

exports.allSites = (req, res, next) => {
	db.query("SELECT * FROM external_links", function(err, result) {
		if (err) throw err;

		return res.json(result);
	});
}

exports.insertSites = (req, res, next) => {
	const name = req.body.name;
	const url = req.body.url;
	const description = req.body.description;
	const rank = req.body.rank;

	db.query(`INSERT INTO external_links (name, url, description, rank) VALUES ('${name}', '${url}', '${description}', '${rank}')`, function(err, result) {
		db.query("SELECT * FROM external_links ORDER BY id DESC LIMIT 1", function(err, result) {
			if (err) throw err;

			return res.json(result);
		});
	});
}

exports.updateSites = (req, res, next) => {
	const id = req.body.id;
	const name = req.body.name;
	const url = req.body.url;
	const description = req.body.description;
	const rank = req.body.rank;

	db.query(`UPDATE external_links SET name = '${name}', url = '${url}', description = '${description}', rank = '${rank}' WHERE id = '${id}'`, function(err, result) {
		if (err) throw err;

		return res.json(result);
	});
}

exports.deleteSites = (req, res, next) => {
	db.query(`DELETE FROM external_links WHERE id = '${req.params.id}'`, function(err, result) {
		if (err) throw err;

		return res.json(result);
	});
}