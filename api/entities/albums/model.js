const debug = require('debug')('api:album.models')
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const albumSchema = new Schema({
  name: { type: String, required: true },
  coverArt: String,
  type: String,
  publisher: String,
  releaseDate: Date,
  composer: String,
  series: String,
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() }
})

const Album = mongoose.model('Album', albumSchema)

export default Album
