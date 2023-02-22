const sql = require('../config/database').con;

exports.save = (req, res, next) => {
	let query = `INSERT INTO companies (brand, name, email, globalcontact, description) VALUES('${req.body.brand}', '${req.body.name}', '${req.body.email}', '${req.body.contact}', '-')`;
	
	sql.query(query, (err, model) => {
		return res.json({success: true});
	});
}