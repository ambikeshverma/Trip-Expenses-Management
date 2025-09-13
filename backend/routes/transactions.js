const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Trip = require('../models/Trip');
const Subscription = require('../models/Subscription');
const { sendPush } = require('../utils/pushService');
const auth = require('../middleware/auth');

// Create transaction
router.post('/', auth, async (req, res) => {
  try {
    const { tripId, type, category, amount, remarks } = req.body;
    if (!tripId || !type || amount == null) return res.status(400).json({ msg: 'Missing fields' });

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ msg: 'Trip not found' });
    if (!trip.members.some(m => String(m) === String(req.user._id))) return res.status(403).json({ msg: 'Not a member' });
    
    //  Prevent expense when balance is 0 and also for insuffcient balance
    const expenseAmount = Number(amount);
    if (type === 'use') {
  if ((trip.totalBalance || 0) <= 0) {
    return res.status(400).json({
      msg: 'Your current balance is zero. Please add money before adding an expense.'
    });
  }

  if (expenseAmount > (trip.totalBalance || 0)) {
    return res.status(400).json({
      msg: 'Insufficient balance. You cannot spend more than your current balance.'
    });
  }
}

    const tx = await Transaction.create({
      trip: tripId,
      user: req.user._id,
      type,
      category,
      amount,
      remarks
    });

    // const delta = (type === 'add') ? Number(amount) : -Math.abs(Number(amount));
    // trip.totalBalance = (trip.totalBalance || 0) + delta;
    // await trip.save();

     const amt = Number(amount);

    if (type === 'add') {
      trip.totalBalance = (trip.totalBalance || 0) + amt;
      trip.totalContributions = (trip.totalContributions || 0) + amt;
    } else if (type === 'use') {
      trip.totalBalance = (trip.totalBalance || 0) - amt;
      trip.totalExpenses = (trip.totalExpenses || 0) + amt;
    }

    await trip.save();

    const payload = {
      title: `Trip: ${trip.title}`,
      body: `${req.user.username} ${type === 'add' ? 'added' : 'used'} ₹${amount}. New total: ₹${trip.totalBalance}`,
      data: {
        tripId: String(trip._id),
        txId: String(tx._id),
        amount,
        type,
        remarks,
        totalBalance: trip.totalBalance,
        actor: { id: req.user._id, username: req.user.username }
      }
    };

    const subs = await Subscription.find({ trip: tripId }).populate('user', 'username');
    const promises = subs.map(async s => {
      try {
        await sendPush(s.subscription, payload);
      } catch (err) {
        // delete invalid subscription
        try { await Subscription.findByIdAndDelete(s._id); } catch(e){}
      }
    });
    await Promise.all(promises);

    return res.json({ tx, trip });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg:err });
  }
});

// Get transactions for a trip
router.get('/trip/:tripId', auth, async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) return res.status(404).json({ msg: 'Trip not found' });
  if (!trip.members.some(m => String(m) === String(req.user._id))) return res.status(403).json({ msg: 'Not a member' });

  const txs = await Transaction.find({ trip: trip._id })
  .populate('user', 'username name')
  .populate('trip', 'name startDate endDate totalBalance totalExpense totalContribute')
  .sort({ date: -1 });
  res.json({ trip, transactions: txs });
});

// Edit transaction and recompute balance
router.put('/:id', auth, async (req, res) => {
  const tx = await Transaction.findById(req.params.id);
  if (!tx) return res.status(404).json({ msg: 'Transaction not found' });
  Object.assign(tx, req.body);
  await tx.save();

  const tripTxs = await Transaction.find({ trip: tx.trip });
  const newBalance = tripTxs.reduce((acc, t) => acc + (t.type === 'add' ? t.amount : -t.amount), 0);
  await Trip.findByIdAndUpdate(tx.trip, { totalBalance: newBalance });

  res.json(tx);
});

router.delete('/:id', auth, async (req, res) => {
  const tx = await Transaction.findById(req.params.id);
  if (!tx) return res.status(404).json({ msg: 'Transaction not found' });
  await tx.deleteOne();;
  const tripTxs = await Transaction.find({ trip: tx.trip });
  const newBalance = tripTxs.reduce((acc, t) => acc + (t.type === 'add' ? t.amount : -t.amount), 0);
  await Trip.findByIdAndUpdate(tx.trip, { totalBalance: newBalance });
  res.json({ msg: 'Deleted' });
});

module.exports = router;
