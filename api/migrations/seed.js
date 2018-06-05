// seed.js script responsible for seeding MongoDB with initial data
require('dotenv').config()
import fs from 'fs'
import mongoose from 'mongoose'
import { uploadFile } from '../utils/s3'
import { listTracks } from '../graph/tracks/models'
import { listMedia } from '../graph/media/models'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/historia'

function connect() {
	return new Promise(resolve => {
		mongoose.connect(MONGO_URI, err => {
			if (err) {
				reject(err)
			}

			resolve('Connected to MongoDB')
		})
	})
}

async function main() {
	try {
		const status = await connect()
		console.log(status)
	} catch (e) {
		throw new Error(e)
	}

	const buffer = fs.readFileSync('./songs/fire_temple.mp3')
	console.log('buffer', buffer)
	const res = await uploadFile(buffer)

	console.log('res', res)
}

main()
