const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    bedrooms: {
        type: Number,
        required: [true, 'Number of bedrooms is required'],
        min: [0, 'Bedrooms cannot be negative'],
    },
    bathrooms: {
        type: Number,
        required: [true, 'Number of bathrooms is required'],
        min: [0, 'Bathrooms cannot be negative'],
    },
    squareFeet: {
        type: Number,
        required: [true, 'Square footage is required'],
        min: [0, 'Square footage cannot be negative'],
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['Available', 'Under Offer', 'Sold'],
            message: 'Status must be Available, Under Offer, or Sold',
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    listingDate: {
        type: String,
        required: [true, 'Listing date is required'],
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Listing date must be in YYYY-MM-DD format'],
    },
});

module.exports = mongoose.model('Property', propertySchema);