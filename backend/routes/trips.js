const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const User = require('../models/User');
const auth = require('../middleware/auth');

// create trip
router.post('/', auth, async (req, res) => {
  try {
    const { title,startDate, endDate, members } = req.body;

    const memberList = members && members.length ? [...members] : [];
    if (!memberList.includes(String(req.user._id))) {
      memberList.push(req.user._id);
    }

    const trip = await Trip.create({
      title,
      creator: req.user._id,
      startDate,
      endDate,
      members: memberList,
      totalBalance: 0
    });
    return res.json(trip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// get trips for logged user
router.get('/', auth, async (req, res) => {
  const trips = await Trip.find({ members: req.user._id }).populate('creator', 'username name');
  res.json(trips);
});

// get single trip (with members)
router.get('/:id', auth, async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate('members', 'username name');
  if (!trip) return res.status(404).json({ msg: 'Trip not found' });
  if (!trip.members.some(m => String(m._id) === String(req.user._id))) return res.status(403).json({ msg: 'Not a member' });
  res.json(trip);
});

// add member by username
router.post('/:id/add-member', auth, async (req, res) => {
  try {
    const { username } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ msg: 'Trip not found' });

    const userToAdd = await User.findOne({ username });
    if (!userToAdd) return res.status(404).json({ msg: 'User not found' });
    if (trip.members.some(m => String(m) === String(userToAdd._id))) return res.status(400).json({ msg: 'Already member' });

    trip.members.push(userToAdd._id);
    await trip.save();
    return res.json(trip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(trip);
});

router.delete('/:id', auth, async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Trip deleted' });
});

module.exports = router;
