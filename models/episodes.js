const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodesSchema = new Schema({
  title: { type: String, unique: true, lowercase: true, required: true },
  description: { type: String, lowercase: true, required: true },
  video: { type: String, unique: true, required: true },
  serie: {
    type: Schema.Types.ObjectId,
    ref: 'Series',
  },
});

module.exports = mongoose.model('Episodes', EpisodesSchema);
