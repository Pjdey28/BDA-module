const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    companyName: String,

    contactPerson: String,

    email: String,

    phone: String,

    industry: String,

    status: {
      type: String,
      enum: [
        'New',
        'Contacted',
        'Qualified',
        'Negotiation',
        'Converted',
        'Lost'
      ],
      default: 'New'
    },

    expectedRevenue: Number,

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Lead', leadSchema);
