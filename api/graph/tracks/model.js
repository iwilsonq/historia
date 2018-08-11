const debug = require('debug')('api:tracks.models')
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const trackSchema = new Schema({
  name: String,
  url: String,
  coverArt: String,
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() }
})

const Track = mongoose.model('Track', trackSchema)

export default Track
