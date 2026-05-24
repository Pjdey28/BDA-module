const FollowUp = require('../models/FollowUp');

exports.createFollowUp = async (req, res) => {

  try {

    const followUp = await FollowUp.create(req.body);

    res.status(201).json(followUp);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getFollowUps = async (req, res) => {

  try {

    const followUps = await FollowUp.find()
      .populate('lead')
      .populate('employee');

    res.status(200).json(followUps);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.updateFollowUp = async (req, res) => {

  try {

    const updatedFollowUp =
      await FollowUp.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(updatedFollowUp);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.deleteFollowUp = async (req, res) => {

  try {

    await FollowUp.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Follow-up deleted'
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};