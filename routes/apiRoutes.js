const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


// Fetch APIs and push to MySQL

// Fetch APIs and push to MySQL
router.get('/fetch', apiController.fetchAndPush);

// Retrieve all APIs from MySQL
router.get('/apis', apiController.getAllApis);

// Retrieve a specific API by ID from MySQL
router.get('/apis/:id', apiController.getApiById);

// Update a specific API by ID in MySQL
router.put('/apis/:id', apiController.updateApiById);

router.post('/bulk-insert', apiController.bulkInsert);


// Delete a specific API by ID from MySQL
router.delete('/apis/:id', apiController.deleteApiById);

module.exports = router;