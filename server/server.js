const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// All routes for the APIs //
const productRoutes = require('./src/routes/product.routes');
const categoryRoutes = require('./src/routes/category.routes');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API product');
});

// Initiate the API //
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/category', categoryRoutes);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
