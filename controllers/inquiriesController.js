const Inquiry = require('../models/Inquiry');

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        res.status(200).json(inquiries);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving inquiries', error: err.message });
    }
};

const getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.status(200).json(inquiry);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid inquiry id' });
        }
        res.status(500).json({ message: 'Error retrieving inquiry', error: err.message });
    }
};

const createInquiry = async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        const savedInquiry = await inquiry.save();
        res.status(201).json({ id: savedInquiry._id });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        res.status(500).json({ message: 'Error creating inquiry', error: err.message });
    }
};

const updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        inquiry.name = req.body.name;
        inquiry.email = req.body.email;
        inquiry.phone = req.body.phone;
        inquiry.message = req.body.message;
        inquiry.propertyId = req.body.propertyId;
        inquiry.status = req.body.status;
        inquiry.submittedDate = req.body.submittedDate;

        await inquiry.save();
        res.status(200).json({ message: 'Inquiry updated successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid inquiry id' });
        }
        res.status(500).json({ message: 'Error updating inquiry', error: err.message });
    }
};

const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.status(200).json({ message: 'Inquiry deleted successfully' });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid inquiry id' });
        }
        res.status(500).json({ message: 'Error deleting inquiry', error: err.message });
    }
};

module.exports = {
    getAllInquiries,
    getInquiryById,
    createInquiry,
    updateInquiry,
    deleteInquiry,
};