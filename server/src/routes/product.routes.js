const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/',  productController.findAll);
router.get('/page/:page_number',  productController.getDataByPageNumber);
router.post('/',  productController.create);
router.get('/:id',  productController.findById);
router.put('/:id',  productController.update);
router.delete('/:id',  productController.delete);

module.exports = router;
