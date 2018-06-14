const debug = require('debug')('api:tracks.models')
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const trackSchema = new Schema({
	number: Number,
	name: String,
	url: String,
	album: { type: Schema.Types.ObjectId, ref: 'Album' },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
})

const Track = mongoose.model('Track', trackSchema)

export const listTracks = ({ first, ...args } = {}) => {
	const query = Track.find(args)

	if (args.first) {
		return query
			.limit(args.first)
			.populate('album')
			.sort({ number: 'asc' })
			.exec()
	}

	return query.sort({ number: 'asc' })
}

export const createTrack = (args = {}) => {
	return Track.create(args)
}

export default Track
