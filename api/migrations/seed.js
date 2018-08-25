// seed.js script responsible for seeding MongoDB with initial data
require('dotenv').config()
const debug = require('debug')('api:migrations.seed')
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import { uploadFile } from '../utils/s3'
import { getName, convertToFilename } from '../utils/strings'
import { listTracks, createTrack } from '../entities/tracks/models'
import { listAlbums } from '../entities/albums/models'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/historia'

function connect() {
  return new Promise(resolve => {
    mongoose.connect(
      MONGO_URI,
      err => {
        if (err) {
          reject(err)
        }

        resolve('Connected to MongoDB')
      }
    )
  })
}

function uploadFileAndCreateObject(file, album) {
  const folderName = convertToFilename(album.name)

  const buffer = fs.readFileSync(
    path.resolve(__dirname, `albums/${folderName}/${file.filename}`)
  )

  return uploadFile(
    {
      Body: buffer,
      Key: file.filename,
      Bucket: `${process.env.AWS_S3_BUCKET}/tracks/${folderName}`
    },
    folderName
  )
    .then(response => {
      debug(`file ${file.filename} uploaded`)

      const track = {
        number: file.number,
        name: file.name,
        url: response.url,
        album: album.id
      }

      return createTrack(track)
    })
    .catch(console.error)
}

async function main() {
  try {
    const status = await connect()
    console.log(status)
  } catch (e) {
    throw new Error(e)
  }

  const albums = await listAlbums()
  const album = albums[1]

  debug(`Migrating ${album}`)

  const files = fs
    .readdirSync(path.resolve(__dirname, 'albums', convertToFilename(album.name)))
    .filter(file => file.includes('.mp3'))
    .map((filename, index) => ({
      name: getName(filename),
      filename,
      number: index + 1
    }))

  await Promise.all(files.map(file => uploadFileAndCreateObject(file, album)))

  return
}

main().then(() => process.exit(0))
