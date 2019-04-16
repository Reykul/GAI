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
const connPool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'offences'
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
  connPool.getConnection((err, conn) => {
    if (err) {
      conn.release();
      return;
    }
    let sql = "SELECT * FROM offence";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.render('offence_view', {
        results: results
      });
    });
    conn.release();
  });
});

//route for insert data
app.post('/save', (req, res) => {
  connPool.getConnection((err, conn) => {
    if (err) {
      conn.release();
      return;
    }
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
    conn.release();
  });
});

//route for update data
app.post('/update', (req, res) => {
  connPool.getConnection((err, conn) => {
    if (err) {
      conn.release();
      return;
    }
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
    conn.release();
  });
});

//route for delete data
app.post('/delete', (req, res) => {
  connPool.getConnection((err, conn) => {
    if (err) {
      conn.release();
      return;
    }
    let sql = "DELETE FROM offence WHERE offence_id=" + req.body.offence_id + "";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
    conn.release();
  });
});

//server listening
app.listen(8001, () => {
  console.log('Server is running at port 8001');
});
