const db = require('../config/database').con;

exports.getFleet = (req, res, next) => {
	const company = req.body.company;

	db.query(`SELECT * FROM fleets WHERE company_id = '${company}'`, (err, result) => {
		return res.json(result)
	})
}

exports.removeFleet = (req, res, next) => {
	const id = req.params.id;

	db.query(`DELETE FROM fleets WHERE id = '${id}'`, (err, result) => {
		return res.json(result)
	})
}

exports.saveFleet = (req, res, next) => {
	db.query(`INSERT INTO fleets (
			tractor_id, 
			model, 
			vin,
			year, 
			license_plate, 
			t_check, 
			pre_pass, 
			stl, 
			qiv, 
			bit, 
			domicile, 
			domicile_email, 
			vedr, 
			eld, 
			company_id, 
			book_value
		) VALUES (
			'${req.body.tractor_id}', 
			'${req.body.model}', 
			'${req.body.vin}', 
			'${req.body.year}', 
			'${req.body.license_plate}', 
			'${req.body.t_check}', 
			'${req.body.pre_pass}', 
			'${req.body.stl}', 
			'${req.body.qiv}', 
			'${req.body.bit}', 
			'${req.body.domicile}', 
			'${req.body.domicile_email}', 
			'${req.body.vedr}', 
			'${req.body.eld}', 
			'${req.body.company}', 
			'${req.body.book_value}')`, 
	(err, resultadd) => {

		db.query(`SELECT * FROM fleets WHERE company_id = '${req.body.company}'`, (err, result) => {
			return res.json(result)
		})
	})
}

exports.updateFleet = (req, res, next) => {
	db.query(`UPDATE fleets SET 
				tractor_id = '${req.body.tractor_id}', 
				model = '${req.body.model}', 
				vin = '${req.body.vin}',
				year = '${req.body.year}', 
				license_plate = '${req.body.license_plate}', 
				t_check = '${req.body.t_check}', 
				pre_pass = '${req.body.pre_pass}', 
				stl = '${req.body.stl}', 
				qiv = '${req.body.qiv}', 
				bit = '${req.body.bit}', 
				domicile = '${req.body.domicile}', 
				domicile_email = '${req.body.domicile_email}', 
				vedr = '${req.body.vedr}', 
				eld = '${req.body.eld}', 
				book_value = '${req.body.book_value}' 
			WHERE id = '${req.body.id}'`, (err, result) => {
		return res.json(result);
	})
}

exports.uploadFleet = (req, res, next) => {

	req.body.data.map(item => {

		db.query(`INSERT INTO fleets (tractor_id, model, vin, year, license_plate, book_value, t_check, pre_pass, vedr, eld, qiv, bit, domicile, domicile_email, service_provider, company_id) VALUES ('${item["Tractor #"]}', '${item["Model"]}', '${item["VIN"]}', '${item["Year"]}', '${item["license Plate"]}', '${item["Book Value"]}', '${item["T Check"]}', '${item["PrePass"]}', '${item["VEDR"]}', '${item["ELD"]}', '${item["QIV"]}', '${item["BIT"]}', '${item["Domicile"]}', '${item["Domicile Email"]}', '${item["Service Provider"]}', '${req.body.company}')`, (err, result) => {
			if (err) throw err;
		});
	})

	db.query(`SELECT * FROM fleets WHERE company_id = '${req.body.company}'`, (err, result) => {
		return res.json(result)
	})
}

exports.getMaintenance = (req, res, next) => {
	db.query(`SELECT * FROM fleet_maintenance_form WHERE company_id = '${req.body.company}'`, (err, result) => {

		return res.json(result)
	})
}

exports.getTractor = (req, res, next) => {
	db.query(`SELECT * FROM fleets WHERE company_id = '${req.body.company}'`, (err, result) => {
		return res.json(result)
	})
}

exports.saveMaintenance = (req, res, next) => {
	db.query(`INSERT INTO fleet_maintenance_form (domicile_id, tractor_id, person_completing_work, date, odometer, costs, mmr_task, out_of_service, scheduled, domfp, photo, company_id) VALUES ('${req.body.domicile_id.domicile}', '${req.body.tractor_id.tractor_id}', '${req.body.person_completing_work}', '${req.body.date}', '${req.body.odometer}', '${req.body.costs}', '${req.body.mmr_tasks}', '${req.body.out_of_service}', '${req.body.scheduled}', '${req.body.domfp}', '${req.body.photo}', '${req.body.company}')`, (err, result) => {
		if (err) throw err;

		db.query(`SELECT * FROM fleet_maintenance_form WHERE company_id = '${req.body.company}'`, (err, result2) => {

			return res.json(result2)
		})
	})
}

exports.updateMaintenance = (req, res, next) => {
	db.query(`UPDATE fleet_maintenance_form SET domicile_id = '${req.body.domicile_id.domicile}', tractor_id = '${req.body.tractor_id.tractor_id}', person_completing_work = '${req.body.person_completing_work}', date = '${req.body.date}', odometer = '${req.body.odometer}', costs = '${req.body.costs}', mmr_tasks = '${req.body.mmr_tasks}', out_of_service = '${req.body.out_of_service}', scheduled = '${req.body.scheduled}', domfp = '${req.body.domfp}', photo = '${req.body.photo}', company_id = '${req.body.company}' WHERE id = '${req.body.id}'`, (err, result) => {
		return res.json(result)
	});
}

exports.deleteMaintenance = (req, res, next) => {
	db.query(`DELETE FROM fleet_maintenance_form WHERE id = '${req.params.id}'`, (err, result) => {
		return res.json(result)
	})
}

exports.getSign = (req, res, next) => {
	db.query(`SELECT * FROM sign_images WHERE company_id = '${req.params.company}'`, (err, result) => {
		return res.json(result)
	})
}

exports.saveSign = (req, res, next) => {
	db.query(`INSERT INTO sign_images (name, extension, path, created_at, company_id) VALUES ('${req.file.originalname.split('.')[0]}', '${req.file.originalname.split('.')[1]}', 'upload/${req.file.filename}', NOW(), '${req.body.company}')`, (err, result) => {
		if (err) throw err;
	})
}