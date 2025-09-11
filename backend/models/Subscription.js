const mongoose = require('mongoose');

const SubSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  subscription: { type: Object, required: true }
}, { timestamps: true });

SubSchema.index({ user: 1, trip: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', SubSchema);
