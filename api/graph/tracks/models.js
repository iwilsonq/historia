const debug = require('debug')('api:tracks.models')
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const trackSchema = new Schema({
	name: String,
	url: String,
	media: { type: Schema.Types.ObjectId, ref: 'Media' },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
})

const Track = mongoose.model('Track', trackSchema)

export const listTracks = (args = {}) => {
	const query = Track.find()

	if (args.first) {
		return query
			.limit(args.first)
			.populate('media')
			.exec()
	}

	return query
}

export const createTrack = (args = {}) => {
	return Track.create(args)
}

export default Track
