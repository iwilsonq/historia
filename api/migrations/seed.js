// seed.js script responsible for seeding MongoDB with initial data
require('dotenv').config()
const debug = require('debug')('api:migrations.seed')
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import { uploadFile } from '../utils/s3'
import { listTracks, createTrack } from '../graph/tracks/models'
import { listMedia } from '../graph/media/models'

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

async function uploadFileAndCreateObject(filename, mediaId) {
	debug(`file ${filename}`)
	const buffer = fs.readFileSync(path.resolve(__dirname, `songs/${filename}`))

	const response = await uploadFile({
		Body: buffer,
		Key: filename
	})

	const track = {
		name: filename.split('.')[0],
		url: response.url,
		media: mediaId
	}

	return createTrack(track)
}

async function main() {
	try {
		const status = await connect()
		console.log(status)
	} catch (e) {
		throw new Error(e)
	}

	const medias = await listMedia()
	const media = medias[0]

	debug(`Migrating ${media}`)

	const files = fs.readdirSync(path.resolve(__dirname, 'songs'))

	await Promise.all(files.map(filename => uploadFileAndCreateObject(filename, media.id)))

	return
}

main().then(() => process.exit(0))
