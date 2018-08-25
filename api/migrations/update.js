require('dotenv').config()
import mongoose from 'mongoose'
import Tracks from '../entities/tracks/models'

const mongoUri = `${process.env.COSMOSDB_CONNSTR}@${process.env.COSMOSDB_DBNAME}?ssl=true`
let counter = 0

console.log(`MONGO_URI: ${mongoUri}`)
mongoose.connect(
  mongoUri,
  err => {
    if (err) {
      console.error('Error:', err.message)
    }
    console.log('Connected to mongodb')

    Tracks.find().then(tracks => {
      tracks.forEach((track, i) => {
        const updatedUrl = track.url.substr(0, 39) + 'tracks/' + track.url.substr(39)
        Tracks.update({ _id: track.id }, { $set: { url: updatedUrl } }, callback)
      })
    })
  }
)

function callback() {
  counter++
  console.log(`${counter} tracks updated!`)
}
