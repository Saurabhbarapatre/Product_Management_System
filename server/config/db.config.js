'use strict';

const mysql = require('mysql');

const db = mysql.createConnection({
  hots: 'localhost',
  user: 'root',
  password: '',
  database: 'product_management_system'
});

db.connect(function (err) {
  if (err) throw err;
  console.log('Database connected');
});

module.exports = db;
