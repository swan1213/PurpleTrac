const db = require('../config/database').con;
const fs = require('fs');

exports.allDrivers = (req, res) => {
	let condition = '';

	if (req.params.company !== '0') {
		condition = `SELECT * FROM linehaul_drivers WHERE company_id = '${req.params.company}'`;
	} else {
		condition = `SELECT * FROM linehaul_drivers`;
	}

	db.query(condition, function (err, result) {
        if (err) throw err;

        return res.json(result);
    });
}

exports.saveDriver = (req, res, next) => {
	const driver_id = req.body.driver_id;
	const driver_name = req.body.driver_name;
	const email = req.body.email;

	const phone = req.body.phone;
	const license = req.body.license;
	const address = req.body.address;
	const domicile = req.body.domicile;

	const photo = req.body.photo;
	const price_per_mile = req.body.price_per_mile;
	const work_status = req.body.work_status.value;
	const company_id = req.body.company_id;

	db.query(`INSERT INTO linehaul_drivers (driver_id, driver_name, email, phone, license, address, photo, price_per_mile, work_status, domicile, company_id) VALUES ('${driver_id}', '${driver_name}', '${email}', '${phone}', '${license}', '${address}', '${photo}', '${price_per_mile}', '${work_status}', '${domicile}', '${company_id}')`, function (err, result) {
        db.query("SELECT * FROM linehaul_drivers", function (err, result) {
	        if (err) throw err;

	        return res.json(result);
	    });
    });
}

exports.updateDriver = (req, res, next) => {
	const driver_id = req.body.driver_id;
	const driver_name = req.body.driver_name;
	const email = req.body.email;

	const phone = req.body.phone;
	const license = req.body.license;
	const address = req.body.address;
	const domicile = req.body.domicile;

	const photo = req.body.photo;
	const price_per_mile = req.body.price_per_mile;
	const work_status = req.body.work_status.value;

	db.query(`UPDATE linehaul_drivers SET driver_id = '${driver_id}', driver_name = '${driver_name}', email = '${email}', phone = '${phone}', license = '${license}', address = '${address}', photo = '${photo}', price_per_mile = '${price_per_mile}', work_status = '${work_status}', domicile = '${domicile}' WHERE id = '${req.params.id}'`, function (err, result) {
		if (err) throw err;

		return res.json(result);
	})
}

exports.deleteDriver = (req, res) => {
	db.query(`DELETE FROM linehaul_drivers WHERE id = '${req.params.id}'`, function (err, result) {
        if (err) throw err;

        return res.json(result);
    });
}

exports.removeDriver = (req, res) => {
	const id = req.body;
	let sql = 'DELETE FROM linehaul_drivers WHERE ';

	id.map((item, index) => {
		if (index === id.length - 1)
			sql += `id = '${item}'`;
		else 
			sql += `id = '${item}' OR `;

	})

	db.query(sql, function(err, result) {
		db.query("SELECT * FROM linehaul_drivers", function (err, result) {
	        if (err) throw err;

	        return res.json(result);
	    });
	});
}

exports.uploadDriver = (req, res) => {
	req.body.data.map(item => {
		db.query(`SELECT * FROM linehaul_drivers WHERE email = '${item['Email']}'`, function (err, result) {

			if (result.length) {
				
				db.query(`UPDATE linehaul_drivers SET driver_id = '${item['Driver ID']}', driver_name = '${item['Driver Name']}', phone = '${item['Phone #']}', license = '${item['License #']}', address = '${item['Address']}', price_per_mile = '${item['Price Per Mile']}', work_status = '${item['Work Status']}', company_id = '${req.body.company}' WHERE email = '${item['Email']}'`, (err, result) => {
			        if (err) throw err;
			    });
			} else {

				db.query(`INSERT INTO linehaul_drivers (driver_id, driver_name, email, phone, license, address, price_per_mile, work_status, company_id) VALUES ('${item['Driver ID']}', '${item['Driver Name']}', '${item['Email']}', '${item['Phone #']}', '${item['License #']}', '${item['Address']}', '${item['Price Per Mile']}','${item['Work Status']}', '${req.body.company}')`, (err, result) => {
			        if (err) throw err;
			    });
			}
		});
	})

	db.query("SELECT * FROM linehaul_drivers", function (err, result) {
        if (err) throw err;

        return res.json(result);
    });
}