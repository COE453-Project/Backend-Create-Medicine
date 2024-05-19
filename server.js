const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;
const db = 'https://backend-database-olz2xjbmza-uc.a.run.app'

app.use(express.json());

app.use(cors());

app.post('/', async (req, res, next) => {
  // Get the details of the medicine
  let options = { method: 'POST' };
  const medicineData = {
    name: req.body.name,
    description: req.body.description,
    productionDate: req.body.productionDate,
    expiryDate: req.body.expiryDate
  };
  try {
    const response = await fetch(db,options)
    res.status(response.status)
    res.json(response.json())
  } catch {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }

  next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
