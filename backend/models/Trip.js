const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startDate:{type:Date,default:0},
  endDate:{type:Date,default:0},
  totalBalance: { type: Number, default: 0 },
  totalExpenses: { type: Number, default: 0 },
  totalContributions: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
