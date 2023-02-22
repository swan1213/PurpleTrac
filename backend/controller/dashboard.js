const db = require('../config/database').con;

exports.getSatistics = (req, res, next) => {
	db.query(`SELECT year_num, week_num, SUM(daily_gross_amt) AS totalRevenue FROM linehaul_trips WHERE (( year_num - 2000 )*59 + week_num) >= (( YEAR(NOW()) - 2000 )*59 + WEEK(NOW()) - 9) GROUP BY year_num, week_num`, (err, result) => {
		
		return res.json(result);
	});
}

exports.getMiles = (req, res, next) => {
	db.query(`SELECT year_num, week_num, SUM(daily_gross_amt) AS totalRevenue, SUM(miles_qty) AS totalMiles, SUM(fuel) AS totalFuel, AVG(vehicle) AS averageVehicle FROM linehaul_trips WHERE (( year_num - 2000 )*59 + week_num) >= (( YEAR(NOW()) - 2000 )*59 + WEEK(NOW()) - 5) GROUP BY year_num, week_num`, (err, result) => {
		
		return res.json(result);
	});
}

exports.getPayroll = (req, res, next) => {

	db.query(`SELECT * FROM fixed_rate_setting`, (err, result1) => {
		db.query(`SELECT * FROM linehaul_trips LEFT JOIN linehaul_drivers ON linehaul_trips.driver_1 = linehaul_drivers.driver_id WHERE (( year_num - 2000 )*59 + week_num) >= (( YEAR(NOW()) - 2000 )*59 + WEEK(NOW()) - 9) ORDER BY date`, (err, result2) => {
			return res.json({ fr: result1, payroll: result2 });
		})
	})
}

exports.getReceipt = async (req, res, next) => {
	let total = { receipt: [], fuel_purchase: [], count: 0 };

	await db.query(`SELECT *, SUM(pur_amt) AS totalFuel, SUM(qty) AS totalQTY FROM fuel_purchases WHERE (( year_num - 2000 )*59 + week_num) >= (( YEAR(NOW()) - 2000 )*59 + WEEK(NOW()) - 6) GROUP BY year_num, week_num`, (err, result1) => {
		total.fuel_purchase = result1;

		db.query(`SELECT *, SUM(fuel_supp_amt) AS totalReceipt, COUNT(year_num) AS totalNum FROM receipts WHERE year_num = YEAR(NOW()) AND week_num = WEEK(NOW()) + 1 GROUP BY year_num, week_num`, (err, result2) => {
			if (result2.length) {

				db.query(`SELECT COUNT(year_num) AS totalNum FROM receipts WHERE year_num = YEAR(NOW()) AND week_num = WEEK(NOW()) + 1 AND truck_stop LIKE 'FEDEXGR%' GROUP BY year_num, week_num`, (err, result3) => {
					
					return res.json({ receipt: result2, fuel_purchase: result1, count: result3[0].totalNum });
				})
			} else {
				return res.json({ receipt: [{ totalReceipt: 0, totalNum: 0 }], fuel_purchase: result1, count: 0 });
			}
		})
		
	});

	
}