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
  const medicine = {
    name: req.body.name,
    description: req.body.description,
    productionDate: req.body.productionDate,
    expiryDate: req.body.expiryDate
  };
  let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(medicine)
  };
  try {
    const response = await fetch(db, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    res.status(200)
    res.json(await response.json());
  } catch (error) {
    res.status(500).send('Error:', error)
  }
  next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
