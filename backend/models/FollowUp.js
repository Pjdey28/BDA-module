const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead'
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    followUpDate: Date,

    communicationType: {
      type: String,
      enum: [
        'Call',
        'Email',
        'Meeting',
        'WhatsApp'
      ]
    },

    notes: String,

    status: {
      type: String,
      enum: [
        'Pending',
        'Completed'
      ],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'FollowUp',
  followUpSchema
);