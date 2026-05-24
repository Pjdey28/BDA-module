const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate('assignedTo');

    res.status(200).json(leads);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedLead);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Lead deleted'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};