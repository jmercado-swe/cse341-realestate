const express = require('express');
const router = express.Router();
const propertiesController = require('../controllers/propertiesController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', propertiesController.getAllProperties);
router.get('/:id', propertiesController.getPropertyById);
router.post('/', isAuthenticated, propertiesController.createProperty);
router.put('/:id', isAuthenticated, /* #swagger.parameters['body'] = {
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
router.delete('/:id', isAuthenticated, propertiesController.deleteProperty);

module.exports = router;