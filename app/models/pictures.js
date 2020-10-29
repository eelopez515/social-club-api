const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
  picture: {
    data: Buffer,
    contentType: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = pictureSchema
