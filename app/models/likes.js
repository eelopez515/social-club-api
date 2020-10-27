const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
  person: {
    type: String,
    required: true
  },
  isLiked: {
    type: Boolean,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = likesSchema
