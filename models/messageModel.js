const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const messageSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => nanoid() },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
