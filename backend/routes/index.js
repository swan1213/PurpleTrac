const users = require('../controller/users');
const tasks = require('../controller/tasks');
const utilities = require('../controller/utilities');
const company = require('../controller/company');
const drivers = require('../controller/drivers');
const settlement = require('../controller/settlement');
const payroll = require('../controller/payroll');
const dashboard = require('../controller/dashboard');
const schedule = require('../controller/schedule')
const fleet = require('../controller/fleet')

const auth = require('../controller/auth');
const upload = require('../middleware/upload').upload;

module.exports = app => {
	app.get('/test', (req, res) => res.json({ message: 'Server works' }));

	// Authorization Manage
	app.post('/login', auth.loginUser);
	app.post('/register', auth.registerUser);
	app.post('/resetpassword', auth.resetPassword);

	// Dashboard Manage
	app.get('/dashboard/satistics', dashboard.getSatistics);
	app.get('/dashboard/payroll', dashboard.getPayroll);
	app.get('/dashboard/miles', dashboard.getMiles);
	app.get('/dashboard/receipt', dashboard.getReceipt);

	// Users Manage
	app.get('/users/alluser/:company', users.allUser);
	app.get('/users/getrole', users.getRole);
	app.get('/users/getcompany', users.getCompany);
	app.get('/users/getpermission', users.getPermission);
	app.get('/users/permission/:id', users.rolePermission);
	app.post('/users/saveuser', users.saveUser);
	app.post('/users/savepermission', users.savePermission);
	app.post('/users/userpermission', users.userPermission);
	app.post('/users/updateuser/:id', users.updateUser);
	app.delete('/users/deleteuser/:id', users.deleteUser);

	// Tasks Manage
	app.get('/todo/tasks/:id', tasks.allTask);
	app.get('/tasks/getowner', tasks.getOwner);
	app.post('/todo/add/:id', tasks.addTask);
	app.post('/todo/update', tasks.updateTask);
	app.delete('/tasks/deleteTask/:id/:userid', tasks.deleteTask);

	// Utilities Manage
	app.get('/utilities/allsites', utilities.allSites);
	app.post('/utilities/insertsites', utilities.insertSites);
	app.post('/utilities/updatesites', utilities.updateSites);
	app.delete('/utilities/deletesites/:id', utilities.deleteSites);

	// Settlement Manage
	app.post('/settlement/getdata', settlement.getData);
	app.post('/settlement/uploaddata', settlement.uploadData);

	// Company Manage
	app.post('/api/company/overviewSave', company.save);

	// Drivers Manage
	app.get('/drivers/alldrivers/:company', drivers.allDrivers);
	app.post('/drivers/savedriver', drivers.saveDriver);
	app.post('/drivers/removedriver', drivers.removeDriver);
	app.post('/drivers/uploaddriver', drivers.uploadDriver);
	app.post('/drivers/updatedriver/:id', drivers.updateDriver);
	app.delete('/drivers/deletedriver/:id', drivers.deleteDriver);

	// Payroll Manage
	app.get('/api/payroll/driverinfo/:id', payroll.driverInfo);
	app.get('/api/payroll/settingIndex/:company', payroll.settingIndex);
	app.get('/api/payroll/settingChange/:id/:status', payroll.settingChange);
	app.get('/api/payroll/settingEdit/:id', payroll.settingEdit);
	app.get('/api/payroll/earningIndex/:company', payroll.earningIndex);
	app.get('/api/payroll/searchdriver/:name', payroll.searchDriver);
	app.get('/api/payroll/getfr/:company', payroll.getFR);
	
	app.post('/api/payroll/allpayroll/:company', payroll.allPayroll)
	app.post('/api/payroll/updatefr', payroll.updateFR);
	app.post('/api/payroll/updatesetting/:company', payroll.updateSetting);
	app.post('/api/payroll/getpayroll/:id', payroll.getPayroll);
	app.post('/api/payroll/rate_settingSave', payroll.rateSettingSave);
	app.post('/api/payroll/fixed_settingSave', payroll.fixedSettingSave);
	app.post('/api/payroll/payroll_settingSave', payroll.payrollSettingSave);
	app.delete('/api/payroll/settingRemove/:id', payroll.settingRemove);
	app.delete('/api/payroll/deletefr/:id', payroll.deleteFR);

	// Schedule Manage
	app.post('/schedule/getschedule', schedule.getSchedule);
	app.post('/schedule/getdomicile', schedule.getDomicile);
	app.post('/schedule/gettractor', schedule.getTractor);
	app.post('/schedule/getform', schedule.getForm);
	app.post('/schedule/saveschedule', schedule.saveSchedule);
	app.post('/schedule/deleteschedule', schedule.deleteSchedule);

	// Fleet Manage
	app.get('/fleet/remove/:id', fleet.removeFleet);
	app.get('/fleet/getsign/:company', fleet.getSign);
	app.post('/fleet/getmaintenance', fleet.getMaintenance);
	app.post('/fleet/getfleet', fleet.getFleet);
	app.post('/fleet/savefleet', fleet.saveFleet);
	app.post('/fleet/updatefleet', fleet.updateFleet);
	app.post('/fleet/uploadfleet', fleet.uploadFleet);
	app.post('/fleet/gettractor', fleet.getTractor);
	app.post('/fleet/savesign', upload.single('file'), fleet.saveSign)
	app.post('/fleet/savemaintenance', fleet.saveMaintenance);
	app.post('/fleet/updatemaintenance', fleet.updateMaintenance);
	app.delete('/fleet/deletefleet/:id', fleet.deleteMaintenance);
}