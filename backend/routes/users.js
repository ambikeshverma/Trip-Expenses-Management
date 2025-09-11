const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// search users by username prefix
router.get('/search', auth, async (req, res) => {
  const q = req.query.q || '';
  const users = await User.find({ username: { $regex: `^${q}`, $options: 'i' } }).limit(10).select('username name');
  res.json(users);
});

module.exports = router;
