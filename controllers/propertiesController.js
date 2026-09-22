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

const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        const { address, price, bedrooms, bathrooms, squareFeet, status, description, listingDate } = req.body;
        property.address = address;
        property.price = price;
        property.bedrooms = bedrooms;
        property.bathrooms = bathrooms;
        property.squareFeet = squareFeet;
        property.status = status;
        property.description = description;
        property.listingDate = listingDate;
        await property.save();
        res.status(200).json({ message: 'Property updated successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: Object.values(err.errors).map((e) => e.message),
            });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid property id format' });
        }
        res.status(500).json({ message: 'Error updating property', error: err.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid property id format' });
        }
        res.status(500).json({ message: 'Error deleting property', error: err.message });
    }
};

module.exports = {
    getAllProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
};