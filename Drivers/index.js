//use path module
const path = require("path");
//use express module
const express = require("express");
//use hbs view engine
const hbs = require("hbs");
//use bodyParser middleware
const bodyParser = require("body-parser");
//use mysql database
const mysql = require("mysql");
const app = express();

//Create Connection
const connPool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  port: 3306,
  password: "root",
  database: "drivers"
});

//set views file
app.set("views", path.join(__dirname, "views"));
//set view engine
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use("/assets", express.static(__dirname + "/public"));

//route for homepage
app.get("/", (req, res) => {
  connPool.getConnection((err, conn) => {
    if (err) {
      conn.release();
      return;
    }
    let sql = "SELECT * FROM driver";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.render("driver_view", {
        results: results
      });
    });
    conn.release();
  });
});

//route for insert data
app.post("/save", (req, res) => {
  connPool.getConnection((err, conn) => {
    if (err) {
      conn.release();
      return;
    }
    let data = {
      driver_name: req.body.driver_name,
      driver_license: req.body.driver_license,
      deprived_of_license: req.body.deprived_of_license
    };
    let sql = "INSERT INTO driver SET ?";
    let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
    conn.release();
  });
});

//route for update data
app.post("/update", (req, res) => {
  connPool.getConnection((err, conn) => {
    if (err) {
      conn.release();
      return;
    }
    let sql =
      "UPDATE driver SET driver_name='" +
      req.body.driver_name +
      "', driver_license='" +
      req.body.driver_license +
      "', deprived_of_license='" +
      req.body.deprived_of_license +
      "'  WHERE driver_id=" +
      req.body.id;
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
    conn.release();
  });
});

//route for delete data
app.post("/delete", (req, res) => {
  connPool.getConnection((err, conn) => {
    if (err) {
      conn.release();
      return;
    }
    let sql = "DELETE FROM driver WHERE driver_id=" + req.body.driver_id + "";
    let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
    conn.release();
  });
});

//server listening
app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
