const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const auth = require('../middleware/auth');

// expects { tripId, subscription } in body
router.post('/', auth, async (req, res) => {
  try {
    const { tripId, subscription } = req.body;
    if (!tripId || !subscription) return res.status(400).json({ msg: 'tripId and subscription required' });

    const upserted = await Subscription.findOneAndUpdate(
      { user: req.user._id, trip: tripId },
      { subscription },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res.json({ msg: 'Subscribed', sub: upserted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:tripId', auth, async (req, res) => {
  try {
    await Subscription.findOneAndDelete({ user: req.user._id, trip: req.params.tripId });
    return res.json({ msg: 'Unsubscribed' });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
