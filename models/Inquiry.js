const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'] },
    phone: { type: String, required: [true, 'Phone number is required'], trim: true },
    message: { type: String, required: [true, 'Message is required'], trim: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: [true, 'Property id is required'] },
    status: { type: String, required: [true, 'Status is required'], enum: { values: ['New', 'Contacted', 'Closed'], message: 'Status must be New, Contacted, or Closed' } },
    submittedDate: { type: String, required: [true, 'Submitted date is required'], match: [/^\d{4}-\d{2}-\d{2}$/, 'Submitted date must be in YYYY-MM-DD format'] },
});

module.exports = mongoose.model('Inquiry', inquirySchema);