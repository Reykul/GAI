//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'offences'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));

//route for homepage
app.get('/', (req, res) => {
  let sql = "SELECT * FROM offence";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('offence_view', {
      results: results
    });
  });
});

//route for insert data
app.post('/save', (req, res) => {
  let data = {
    driver_id: req.body.driver_id,
    offence_description: req.body.offence_description,
    offence_cost: req.body.offence_cost,
    deprived_of_license: req.body.deprived_of_license,
  };
  let sql = "INSERT INTO offence SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update', (req, res) => {
  let sql = "UPDATE offence SET driver_id='" + req.body.driver_id
    + "', offence_description='" + req.body.offence_description
    + "', offence_cost='" + req.body.offence_cost
    + "', deprived_of_license='" + req.body.deprived_of_license
    + "'  WHERE offence_id=" + req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) {
      console.log('ERROR');
      throw err;
    }
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM offence WHERE offence_id=" + req.body.offence_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//server listening
app.listen(8001, () => {
  console.log('Server is running at port 8001');
});
