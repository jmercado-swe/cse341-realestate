const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');

router.get('/', propertiesController.getAllProperties);
router.get('/:id', propertiesController.getPropertyById);
router.post('/', propertiesController.createProperty);

module.exports = router;