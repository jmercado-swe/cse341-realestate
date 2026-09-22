const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');

router.get('/', propertiesController.getAllProperties);
router.get('/:id', propertiesController.getPropertyById);
router.post('/', propertiesController.createProperty);
router.put('/:id', /* #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
        address: 'string',
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        squareFeet: 0,
        status: 'string',
        description: 'string',
        listingDate: 'string'
    }
} */ propertiesController.updateProperty);
router.delete('/:id', propertiesController.deleteProperty);

module.exports = router;