const sql = require('../config/database').con;

exports.settingIndex = (req, res, next) => {
	sql.query('SELECT * FROM global_settings WHERE module = "payroll" AND global_settings.key = "sending_method" LIMIT 1', (err, sending_method) => {
		sql.query('SELECT * FROM global_settings WHERE module = "payroll" AND global_settings.key = "delivery_date" LIMIT 1', (err, delivery_date) => {
			sql.query('SELECT * FROM global_settings WHERE module = "payroll" AND global_settings.key = "payment_date" LIMIT 1', (err, payment_date) => {

				let condition = '';

				if (req.params.company === '0') {
					condition = `SELECT * FROM linehaul_drivers`;
				} else {
					condition = `SELECT * FROM linehaul_drivers WHERE company_id = '${req.params.company}'`;
				}

				sql.query(condition, (err, result) => {
					res.json({result, sending_method, delivery_date, payment_date});
				});
			});
		});
	});
}

exports.rateSettingSave = async (req, res, next) => {
	await sql.query(`UPDATE linehaul_drivers SET driver_id = '${req.body.id}', driver_name = '${req.body.name}', price_per_mile = '${req.body.price}' WHERE id = ${req.body.dId}`, (err, result) => {
		if(err) next(err);

		res.json({success: true});
	});
}

exports.fixedSettingSave = (req, res, next) => {
	sql.query('TRUNCATE TABLE fixed_rate_setting', async (err, result) => {
		if(err) next(err);
		
		await req.body.forEach(p => {
			sql.query(`INSERT INTO fixed_rate_setting(from_miles, to_miles, fixed_rate, created_at, updated_at, company_id) VALUES('${p.from_miles}', '${p.to_miles}', '${p.fixed_rate}', NOW(), NOW(), '1')`);
		});

		res.json({success: true});
	});
}

exports.payrollSettingSave = async (req, res, next) => {
	await sql.query('SELECT * FROM global_settings WHERE module = "payroll" AND global_settings.key = "sending_method" LIMIT 1', (err, result) => {
		if(err) next(err);
		
		if(result) {
			sql.query(`UPDATE global_settings SET value = '${req.body.sending}' WHERE id = ${result[0].id}`);
		} else {
			sql.query(`INSERT INTO global_settings(company_id, module, key, value) VALUES('1', 'payroll', 'sending_method', '${req.body.sending}')`);
		}
	});
	await sql.query('SELECT * FROM global_settings WHERE module = "payroll" AND global_settings.key = "delivery_date" LIMIT 1', (err, result) => {
		if(err) next(err);
		
		if(result) {
			sql.query(`UPDATE global_settings SET value = '${req.body.delivery}' WHERE id = ${result[0].id}`);
		} else {
			sql.query(`INSERT INTO global_settings(company_id, module, key, value) VALUES('1', 'payroll', 'delivery_date', '${req.body.delivery}')`);
		}
	});
	await sql.query('SELECT * FROM global_settings WHERE module = "payroll" AND global_settings.key = "payment_date" LIMIT 1', (err, result) => {
		if(err) next(err);
		
		if(result) {
			sql.query(`UPDATE global_settings SET value = '${req.body.payment}' WHERE id = ${result[0].id}`);
		} else {
			sql.query(`INSERT INTO global_settings(company_id, module, key, value) VALUES('1', 'payroll', 'payment_date', '${req.body.payment}')`);
		}
	});

	res.json({success: true});
}

exports.settingEdit = (req, res, next) => {
	sql.query(`SELECT driver_id, driver_name, price_per_mile FROM linehaul_drivers WHERE id = ${req.params.id}`, (err, result) => {
		if(err) next(err);

		res.json(result);
	})
}

exports.settingChange = (req, res, next) => {
	sql.query(`UPDATE linehaul_drivers SET work_status = '${req.params.status == 1 ? 0 : 1}' WHERE id = ${req.params.id}`, (err, result) => {
		if(err) next(err);
		
		res.json({success: true});
	})
}

exports.settingRemove = (req, res, next) => {
	sql.query(`DELETE FROM linehaul_drivers WHERE id = ${req.params.id}`, (err, result) => {
		if(result) {
			res.json({success: true});
		}
	})
}

exports.earningIndex = (req, res, next) => {
	sql.query(`SELECT * FROM linehaul_drivers WHERE company_id = '${req.params.company}'`, (err, drivers) => {
		if(err) next(err);

		res.json(drivers);
	})
}

exports.searchDriver = (req, res, next) => {
	if (req.params.name !== 'all') {
		sql.query(`SELECT * FROM linehaul_drivers WHERE driver_name = '${req.params.name}'`, (err, drivers) => {
			if(err) next(err);

			res.json(drivers);
		})
	} else {
		sql.query(`SELECT * FROM linehaul_drivers`, (err, drivers) => {
			if(err) next(err);

			res.json(drivers);
		})
	}
}

exports.driverInfo = (req, res, next) => {
	sql.query(`SELECT * FROM linehaul_drivers WHERE id = '${req.params.id}'`, (err, drivers) => {
		if(err) next(err);

		res.json(drivers);
	})
}

exports.getPayroll = (req, res, next) => {
	const start = req.body.startDate;
	const end = req.body.endDate;
	const company = req.body.company;

	let fr_rate_setting;

	sql.query(`SELECT * FROM fixed_rate_setting WHERE company_id = '${company}'`, (err, result) => {
		if(err) next(err);

		fr_rate_setting = result;
	})

	let condition = '';

	if (condition === '0') {
		condition = `SELECT * FROM linehaul_drivers LEFT JOIN linehaul_trips ON driver_1 = driver_id WHERE linehaul_drivers.id = '${req.params.id}' AND linehaul_trips.date >= '${start}' AND linehaul_trips.date <= '${end}'`;
	} else {
		condition = `SELECT * FROM linehaul_drivers LEFT JOIN linehaul_trips ON driver_1 = driver_id WHERE linehaul_drivers.company_id = '${company}' AND linehaul_drivers.id = '${req.params.id}' AND linehaul_trips.date >= '${start}' AND linehaul_trips.date <= '${end}'`;
	}

	sql.query(condition, (err, result) => {
		if(err) next(err);

		return res.json({ rateSetting: fr_rate_setting, driverData: result });
	})
}

exports.allPayroll = (req, res, next) => {
	let fr_rate_setting;

	sql.query(`SELECT * FROM fixed_rate_setting WHERE company_id = '${req.params.company}'`, (err, result) => {
		if(err) next(err);

		fr_rate_setting = result;
	})

	let condition = '';

	if (condition === '0') {
		condition = `SELECT *, linehaul_drivers.id AS driverID FROM linehaul_drivers LEFT JOIN linehaul_trips ON driver_1 = driver_id WHERE year_num = '${req.body.year}' AND week_num = '${req.body.week}' ORDER BY linehaul_drivers.id`;
	} else {
		condition = `SELECT *, linehaul_drivers.id AS driverID FROM linehaul_drivers LEFT JOIN linehaul_trips ON driver_1 = driver_id WHERE year_num = '${req.body.year}' AND week_num = '${req.body.week}' AND linehaul_drivers.company_id = '${req.params.company}' ORDER BY linehaul_drivers.id`;
	}

	sql.query(condition, (err, result) => {
		if(err) next(err);

		return res.json({ rateSetting: fr_rate_setting, driverData: result });
	})
}

exports.updateFR = (req, res, next) => {
	sql.query(`UPDATE linehaul_drivers SET price_per_mile = '${req.body.price_per_mile}' WHERE driver_id = '${req.body.driver_id}'`, (err, result) => {
		if(err) next(err);

		return res.json(result)
	})
}

exports.updateSetting = (req, res, next) => {
	req.body.map(item => {
		sql.query(`UPDATE fixed_rate_setting SET from_miles = '${item.from_miles}', to_miles = '${item.to_miles}', fixed_rate = '${item.fixed_rate}', updated_at = NOW() WHERE id = '${item.id}'`, (err, result) => {
			if(err) next(err);

			if (!result.affectedRows) {
				sql.query(`INSERT INTO fixed_rate_setting (id, from_miles, to_miles, fixed_rate, created_at, company_id) VALUES ('${item.id}', '${item.from_miles}', '${item.to_miles}', '${item.fixed_rate}', NOW(), '${req.params.company}')`, (err, insertresult) => {
					if(err) next(err);

					return res.json(insertresult)
				})
			}
		})
	})

	return res.json({msg: 'success'})
}

exports.deleteFR = (req, res, next) => {
	sql.query(`DELETE FROM fixed_rate_setting WHERE id = '${req.params.id}'`, (err, result) => {
		if(err) next(err);

		return res.json(result)
	})
}

exports.getFR = (req, res, next) => {
	sql.query(`SELECT * FROM fixed_rate_setting WHERE company_id = '${req.params.company}'`, (err, result) => {
		if(err) next(err);

		return res.json(result)
	})
}