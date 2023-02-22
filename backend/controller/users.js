const md5 = require('md5');
const db = require('../config/database').con;

exports.allUser = (req, res, next) => {

    let condition = '';

    if (req.params.company !== '0') {
        condition = `SELECT users.*, users.company_id AS companyID, companies.name AS company_name, roles.name AS role_name FROM roles RIGHT JOIN ( users LEFT JOIN companies ON users.company_id = companies.id ) ON roles.id = users.role WHERE users.company_id = '${req.params.company}'`;
    } else {
        condition = "SELECT users.*, users.company_id AS companyID, companies.`name` AS company_name, roles.`name` AS role_name FROM roles RIGHT JOIN ( users LEFT JOIN companies ON users.`company_id` = companies.`id` ) ON roles.`id` = users.`role`";
    }

	db.query(condition, function (err, result) {
        if (err) throw err;
        
        return res.json(result);
    });
}

exports.getRole = (req, res, next) => {
    db.query("SELECT * FROM roles", function (err, result) {
        if (err) throw err;

        return res.json(result);
    });
}

exports.getCompany = (req, res, next) => {
    db.query("SELECT * FROM companies", function (err, result) {
        if (err) throw err;

        return res.json(result);
    });
}

exports.getPermission = (req, res, next) => {
    db.query(`SELECT * FROM permissions`, function (err, result) {
        return res.json(result);
    });
}

exports.rolePermission = (req, res, next) => {
    db.query(`SELECT * FROM user_permission LEFT JOIN users ON user_permission.user_id = users.id INNER JOIN permissions ON permissions.id = user_permission.permission_id WHERE users.id = '${req.params.id}'`, (err, result) => {
        return res.json(result);
    })
}

exports.saveUser = (req, res, next) => {
    let id = req.body.id;
    let name = req.body.fullName;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    let company = req.body.company;   
    let status = req.body.status;

    db.query(`INSERT INTO users (id, name, email, password, role, company_id, created_at, status) VALUES (${id} , '${name}', '${email}', '${md5(password)}', '${role}', '${company}', NOW(), '${status}')`, function(err, result) {

        db.query("SELECT users.*, companies.`name` AS company_name, roles.`name` AS role_name FROM roles INNER JOIN ( users INNER JOIN companies ON users.`company_id` = companies.`id` ) ON roles.`id` = users.`role`", function (err, result) {
            if (err) throw err;

            return res.json(result);
        });
    });
}

exports.savePermission = (req, res, next) => {
    db.query(`INSERT INTO permissions (action) VALUES ('${req.body.permission}')`, function(err, result) {
        if (err) throw err;

        return res.json(result);
    });
}

exports.userPermission = (req, res, next) => {
    db.query(`DELETE FROM user_permission WHERE user_id = '${req.body.id}'`, (err, result) => {
        if (err) throw err;

        console.log('Previous permissions have been deleted')
    })

    req.body.permission.map(item => {
        db.query(`SELECT * FROM permissions WHERE action = '${item}'`, (err, result) => {
            db.query(`INSERT INTO user_permission (user_id, permission_id) VALUES ('${req.body.id}', '${result[0].id}')`, function(err, result) {
                if (err) throw err;
            });
        })
    })

    return res.json({message: 'The user permission has been inserted'})
}

exports.updateUser = (req, res, next) => {
    const name = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const company = req.body.company;
    const status = req.body.status;

    const sql = `UPDATE users SET name = '${name}', email = '${email}', password = '${md5(password)}', role = '${role}', company_id = '${company}', updated_at = NOW(), status = '${status}' WHERE id = '${req.params.id}'`;
    db.query(sql, function(err, result) {
        console.log('The user info is updated')
    });
}

exports.deleteUser = (req, res, next) => {
    const sql = `DELETE FROM users WHERE id = '${req.params.id}'`;

    db.query(sql, function(err, result) {
        return res.json(result);
    });
}