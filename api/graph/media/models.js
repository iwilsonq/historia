const debug = require('debug')('api:media.models')
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const mediaSchema = new Schema({
	name: { type: String, required: true },
	background: String,
	franchise: String,
	type: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
})

const Media = mongoose.model('Media', mediaSchema)

export const listMedia = args => {
	return Media.find()
}

export const createMedia = args => {
	return Media.create(args)
}
