'use strict';

var db = require('../../config/db.config');
const getAge = require('../../src/helpers/getAge');

// Advisor object create
var Product = function (product) {
  this.product_title = product.product_title;
  this.product_category_id = product.product_category_id;
  this.product_price_per_item = product.product_price_per_item;
  this.product_description = product.product_description;
};

Product.create = function (product_data, result) {
  db.query('INSERT INTO product set ?', product_data, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Product.findAll = function (result) {
  db.query('SELECT * from product, category WHERE product_category_id = category_id', function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('product: ', res);
      result(null, res);
    }
  });
};

Product.getDataByPageNumber = function (page_number, result) {
  console.log('SELECT * from product, category WHERE product_category_id = category_id LIMIT '+(page_number*5)+', 5')
  db.query('SELECT * from product, category WHERE product_category_id = category_id LIMIT '+(page_number*5)+', 5', function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('product: ', res);
      result(null, res);
    }
  });
};

Product.findById = function (product_id, result) {
  db.query('SELECT * from product where product_id = ? ', product_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('product: ', res);
      result(null, res);
    }
  });
};

Product.update = function (product_id, product, result) {

  db.query(
    'UPDATE product SET product_title=?, product_category_id=?, product_price_per_item=?, product_description=? WHERE product_id=?',
    [
      product.product_title,
      product.product_category_id,
      product.product_price_per_item,
      product.product_description,
      product_id
    ],
    function (err, res) {
      if (err) {
        console.log('error', err);
        result(err, null);
      } else {
        console.log('update: ', res);
        result(null, res);
      }
    }
  );
};

Product.delete = function (product_id, result) {
  db.query('DELETE FROM product WHERE product_id = ?', [product_id], function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('product deleted', res);
      result(null, res);
    }
  });
};

module.exports = Product;
