const db = require('../config/database').con;

exports.getData = (req, res, next) => {
	const tablename = req.body.table.title;
	const startDate = req.body.start;
	const endDate = req.body.end;

	let sql;

	if (tablename == 'linehaul_drivers') {
		sql = `SELECT * FROM ${tablename}`;
	} else {
		if (endDate) {

			sql = `SELECT * FROM ${tablename} WHERE date >= '${startDate}' AND date <= '${endDate}'`;
		} else {

			sql = `SELECT * FROM ${tablename} WHERE date = '${startDate}'`;
		}
	}

	db.query(sql, function (err, result) {
        if (err) throw err;

        return res.json(result);
    });
}

exports.uploadData = async (req, res, next) => {

	const table = req.body.table;
	const year = req.body.year;
	const week = req.body.week;

	await db.query(`delete from linehaul_trips where year_num = '${year}' AND week_num = '${week}'`, (err, result) => {});
	await db.query(`delete from fuel_purchase where year_num = '${year}' AND week_num = '${week}'`, (err, result) => {});
	await db.query(`delete from other_settlement_adjustments where year_num = '${year}' AND week_num = '${week}'`, (err, result) => {});
	await db.query(`delete from tractor_repairs_misc where year_num = '${year}' AND week_num = '${week}'`, (err, result) => {});
	await db.query(`delete from receipts where year_num = '${year}' AND week_num = '${week}'`, (err, result) => {});

	table.map((tables, index1) => {

		if (tables.data.length) {
			const fields = Object.keys(tables.data[0]);

			const tablename = tables.table;
			let addition_header = ', year_num, week_num';
			let addition_body = ',"' + year + '", "' + week + '"';

			if (tablename === 'linehaul_drivers') {
				addition_header = '';
				addition_body = '';

				tables.data.map(item => {
					db.query(`DELETE FROM linehaul_drivers WHERE driver_id = '${item.driver_id}'`, (err, result) => {
						if (err) throw err;
					})
				})
			}

			let sql = `INSERT INTO ${tablename} (`;

			fields.map((item, index) => {
				if (fields.length - 1 === index)
					sql += item + addition_header + ')';
				else 
					sql += item + ','
			})

			tables.data.map((item, index2) => {
				let sqlquery;
				let values = 'VALUES (';

				fields.map((item_name, index) => {
					if (fields.length - 1 === index)
						values += '"' + item[item_name] + '"' + addition_body + ')';
					else 
						values += '"' + item[item_name] + '",';
				})

				sqlquery = sql + values;
				db.query(sqlquery, function (err, result) {
			        if (err) throw err;

				    if (index1 === table.length - 1 && index2 === tables.data.length - 1) {
				    	return res.json({ msg: 'success' })
				    }
			    });


			})
		}
	})
}