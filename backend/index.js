const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require("path");

const config = require('./config');
const con = require('./config/database').con;
const router = require('./routes');

// MySQL Connection
con.connect(function(err) {
    if (err) throw err;
    console.log('MySQL Connected');
});

app = express();

// app.use(express.limit('10M'));

// body-parser middleware
app.use(bodyParser.urlencoded({limit: '150mb', extended: true}));
app.use(bodyParser.json({limit: '150mb'}));

app.use(cors());

if (!fs.existsSync(path.join(__dirname, 'upload'))) {
  fs.mkdirSync(path.join(__dirname, 'upload'));
}

app.use(`/upload`, express.static(path.join(__dirname, '/upload')));

router(app);

app.get('/', (req, res) => res.send('Purpletrac development'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${config.SERVER_URI}:${config.SERVER_PORT}`));