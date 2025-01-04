'use strict';

const Product = require('../models/product.model');

exports.create = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Enviar todos los campos requeridos' });
  } else {
    const product = new Product({ ...req.body });
    Product.create(product, function (err, product) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Asesor agregado satisfactoriamente', data: product });
    });
  }
};

exports.findAll = function (req, res) {
  Product.findAll(function (err, product) {
    if (err) res.send(err);
    res.send(product);
  });
};

exports.getDataByPageNumber = function (req, res) {
  Product.getDataByPageNumber(req.params.page_number, function (err, product) {
    if (err) res.send(err);
    res.send(product);
  });
};

exports.findById = function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.send(product);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Enviar todos los campos requeridos' });
  } else {
    const productToUpdate = new Product(req.body);

    Product.update(req.params.id, productToUpdate, function (err, result) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Asesor actualizado satisfactoriamente' });
    });
  }
};

exports.delete = function (req, res) {
  Product.delete(req.params.id, function (err, result) {
    if (err) res.send(err);
    res.json({ error: false, message: 'Asesor eliminado' });
  });
};
