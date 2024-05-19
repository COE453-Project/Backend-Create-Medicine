const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;
const db = 'https://backend-database-olz2xjbmza-uc.a.run.app'

app.use(express.json());

app.use(cors());

app.post('/', (req, res, next) => {
  // Get the details of the medicine
  const name = req.body.name;
  const description = req.body.description;
  const productionDate = req.body.productionDate;
  const expiryDate = req.body.expiryDate;
  const medicineData = {
    name: `${name}`,
    description: `${description}`,
    productionDate: `${productionDate}`,
    expiryDate: `${expiryDate}`
  };

  fetch(`${db}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(medicineData)
  })
  .then(response => {
    console.log(data);
    res.status(200)
    res.json(response);
  })
  .catch(error => {
    console.error('An error occurred:', error)
    res.status(500).send('Internal server error occurred');
  });
  next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
