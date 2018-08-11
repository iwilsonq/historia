const debug = require('debug')('api:album.models')
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const albumSchema = new Schema({
  name: { type: String, required: true },
  cover: String,
  type: String,
  publisher: String,
  releaseDate: Date,
  composer: String,
  series: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
})

const Album = mongoose.model('albums', albumSchema)

export const findAlbum = id => {
  debug(`id ${id}`)
  return Album.findById(id)
}

export const listAlbums = args => {
  return Album.find(args)
}

export const listTracksByAlbum = ({ name }) => {
  return Album.aggregate([
    {
      $lookup: {
        from: 'tracks',
        localField: '_id',
        foreignField: 'album',
        as: 'tracks'
      }
    }
  ])
}

export const createAlbum = args => {
  return Album.create(args)
}

export default Album
