const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiriesController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', inquiriesController.getAllInquiries);

router.get('/:id', inquiriesController.getInquiryById);

router.post('/', isAuthenticated, async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: "string",
            email: "string",
            phone: "string",
            message: "string",
            propertyId: "string",
            status: "string",
            submittedDate: "string"
        }
    }
    */
    inquiriesController.createInquiry(req, res);
});

router.put('/:id', isAuthenticated, async (req, res) => {
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: "string",
            email: "string",
            phone: "string",
            message: "string",
            propertyId: "string",
            status: "string",
            submittedDate: "string"
        }
    }
    */
    inquiriesController.updateInquiry(req, res);
});

router.delete('/:id', isAuthenticated, inquiriesController.deleteInquiry);

module.exports = router;