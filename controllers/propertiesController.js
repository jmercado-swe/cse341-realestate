const Property = require('../models/Property');

const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching properties', error: err.message });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid property id format' });
        }
        res.status(500).json({ message: 'Error fetching property', error: err.message });
    }
};

const createProperty = async (req, res) => {
    try {
        const { address, price, bedrooms, bathrooms, squareFeet, status, description, listingDate } = req.body;
        const newProperty = new Property({
            address, price, bedrooms, bathrooms, squareFeet, status, description, listingDate,
        });
        const savedProperty = await newProperty.save();
        res.status(201).json({ id: savedProperty._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: Object.values(err.errors).map((e) => e.message),
            });
        }
        res.status(500).json({ message: 'Error creating property', error: err.message });
    }
};

module.exports = { getAllProperties, getPropertyById, createProperty };