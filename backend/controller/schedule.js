const db = require('../config/database').con;

exports.getSchedule = (req, res, next) => {
	const year = req.body.year;
	const week = req.body.week;
	const company = req.body.company;
	const domicile = req.body.domicile;


	let sql = '';

	if (domicile === 'all' || !domicile) {
		sql = `SELECT *, weekly_schedule.driver_id AS driverID, weekly_schedule.id AS scheduleID FROM weekly_schedule WHERE year_num = '${year}' AND week_num = '${week}' AND weekly_schedule.company_id = '${company}'`;
	}
	else {
		sql = `SELECT *, weekly_schedule.driver_id AS driverID, weekly_schedule.id AS scheduleID FROM weekly_schedule LEFT JOIN linehaul_drivers ON weekly_schedule.driver_id = linehaul_drivers.driver_id WHERE year_num = '${year}' AND week_num = '${week}' AND weekly_schedule.company_id = '${company}' AND linehaul_drivers.domicile = '${domicile}'`;
	}

	db.query(sql, (err, result) => {
		if (err) throw err;

		return res.json(result);
	});
}

exports.getDomicile = (req, res, next) => {
	const company = req.body.company

	db.query(`SELECT domicile FROM fleets WHERE company_id = '${company}' GROUP BY domicile`, (err, result) => {
		if (err) throw err;

		return res.json(result);
	});
}

exports.getTractor = async (req, res, next) => {
	const year = req.body.year;
	const week = req.body.week;
	const company = req.body.company;
	const domicile = req.body.domicile;

	let sql = '';
	var fleet = { tractor: [], schedule: [] }

	if (domicile) {
		sql = `SELECT * FROM fleets WHERE company_id = '${company}' AND domicile = '${domicile}'`;
	} else {
		sql = `SELECT * FROM fleets WHERE company_id = '${company}'`
	}

	await db.query(sql, (err, result1) => {
		fleet.tractor = result1
		
		db.query(`SELECT * FROM weekly_schedule WHERE year_num = '${year}' AND week_num = '${week}' AND company_id = '${company}'`, (err, result2) => {
			fleet.schedule = result2
			
			return res.json(fleet);
		})
	})

}

exports.getForm = async (req, res) => {
	const company = req.body.company;

	await db.query(`SELECT * FROM linehaul_drivers WHERE company_id = '${company}'`, (err, result1) => {

		db.query(`SELECT * FROM fleets WHERE company_id = '${company}'`, (err, result2) => {
			return res.json({ drivers: result1, tractors: result2 })
		});
	});
}

exports.saveSchedule = (req, res) => {
	db.query(`INSERT INTO weekly_schedule (year_num, 
			week_num, 
			from_date, 
			to_date, 
			driver_id, 
			driver_name, 
			driver_phone, 
			sat_start_time, 
			sat_tractor_id, 
			sun_start_time, 
			sun_tractor_id, 
			mon_start_time, 
			mon_tractor_id, 
			tue_start_time, 
			tue_tractor_id, 
			wed_start_time, 
			wed_tractor_id, 
			thu_start_time, 
			thu_tractor_id, 
			fri_start_time, 
			fri_tractor_id, 
			company_id) 
		VALUES ('${req.body.year}', 
		'${req.body.week}', 
		'${req.body.from_date}', 
		'${req.body.to_date}', 
		'${req.body.driver.split('-')[0]}', 
		'${req.body.driver.split('-')[1]}', 
		'${req.body.phone}', 
		'${req.body.sat_tractor_id}', 
		'${req.body.sat_value}', 
		'${req.body.sun_tractor_id}', 
		'${req.body.sun_value}', 
		'${req.body.mon_tractor_id}', 
		'${req.body.mon_value}', 
		'${req.body.tue_tractor_id}', 
		'${req.body.tue_value}', 
		'${req.body.wed_tractor_id}', 
		'${req.body.wed_value}', 
		'${req.body.thu_tractor_id}', 
		'${req.body.thu_value}', 
		'${req.body.fri_tractor_id}', 
		'${req.body.fri_value}', 
		'${req.body.company}')`, (err, result) => {

		let sql = '';

		if (req.body.domicile) {
			sql = `SELECT *, weekly_schedule.driver_id AS driverID, weekly_schedule.id AS scheduleID FROM weekly_schedule LEFT JOIN linehaul_drivers ON weekly_schedule.driver_id = linehaul_drivers.driver_id WHERE year_num = '${req.body.selyear}' AND week_num = '${req.body.selweek}' AND linehaul_drivers.company_id = '${req.body.company}' AND linehaul_drivers.domicile = '${req.body.domicile}'`;
		} else {
			sql = `SELECT *, weekly_schedule.driver_id AS driverID, weekly_schedule.id AS scheduleID FROM weekly_schedule LEFT JOIN linehaul_drivers ON weekly_schedule.driver_id = linehaul_drivers.driver_id WHERE year_num = '${req.body.selyear}' AND week_num = '${req.body.selweek}' AND linehaul_drivers.company_id = '${req.body.company}'`;
		}

		db.query(sql, (err, result2) => {
			if (err) throw err;
			console.log(result2)

			return res.json(result2);
		});
	})
}

exports.deleteSchedule = (req, res, next) => {
	let flag = 0;

	req.body.list.map(item => {

		db.query(`DELETE FROM weekly_schedule WHERE id = '${item}'`, (err, result) => {
			if (err) flag += 1;
		})
	})

	const year = req.body.year;
	const week = req.body.week;
	const company = req.body.company;
	const domicile = req.body.domicile;

	let sql = '';

	if (domicile) {
		sql = `SELECT *, weekly_schedule.driver_id AS driverID, weekly_schedule.id AS scheduleID FROM weekly_schedule LEFT JOIN linehaul_drivers ON weekly_schedule.driver_id = linehaul_drivers.driver_id WHERE year_num = '${year}' AND week_num = '${week}' AND linehaul_drivers.company_id = '${company}' AND linehaul_drivers.domicile = '${domicile}'`;
	} else {
		sql = `SELECT *, weekly_schedule.driver_id AS driverID, weekly_schedule.id AS scheduleID FROM weekly_schedule LEFT JOIN linehaul_drivers ON weekly_schedule.driver_id = linehaul_drivers.driver_id WHERE year_num = '${year}' AND week_num = '${week}' AND linehaul_drivers.company_id = '${company}'`;
	}

	db.query(sql, (err, result) => {
		if (err) throw err;

		return res.json(result);
	});
}