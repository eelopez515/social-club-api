const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  image: {
    type: String
  },
  zipcode: {
    type: Number
  },
  gender: {
    type: String
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
