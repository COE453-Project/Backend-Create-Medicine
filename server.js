const express = require('express');
const logResponse = require('./log.js');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res, next) => {
    // Get the details of the medicine
    const name = req.body.name;
    const description = req.body.description;
    const productionDate = req.body.productionDate;
    const expiryDate = req.body.expiryDate;

    // TODO save the details to the database

    // Construct the response
    // TODO get the id from the database
    id = 1;
    const riyadhTime = new Date().toLocaleString('en-US', {timeZone: 'Asia/Riyadh'});
    const storedAtTimestamp = new Date(riyadhTime).toISOString();
    const response = {
        id: id,
        name: name,
        description: description,
        productionDate: productionDate,
        expiryDate: expiryDate,
        storedAtTimestamp: storedAtTimestamp
    };

    // End the request by sending the response
    res.json(response);
    next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});