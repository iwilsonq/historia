const debug = require('debug')('api:album')
import { findAlbum, createAlbum } from './models'
import { listTracks } from '../tracks/models'
import { albumTypes } from '../../../shared/constants'
import UserError from '../../utils/UserError'

const schema = [
	/* GraphQL */ `
		type Album {
			id: ID!
			name: String!
			series: String
			publisher: String
			type: String
			cover: String
			composer: String
			releaseDate: Float
			tracks: [Track]
		}

		extend type Query {
			album(id: ID!): Album
		}

		input CreateAlbumInput {
			name: String!
			cover: String
			series: String
			composer: String
			type: String
		}

		extend type Mutation {
			createAlbum(input: CreateAlbumInput!): Album
		}
	`
]

const resolvers = {
	Query: {
		album(_, { id }, ctx) {
			debug(`Query.album ${id}`)
			return findAlbum(id)
		}
	},
	Album: {
		tracks(album, args, ctx) {
			debug('Album.tracks %O', args)
			debug('%O', album)
			return listTracks({ album: album.id })
		}
	},
	Mutation: {
		createAlbum(_, { input }, ctx) {
			if (!albumTypes[input.type]) {
				return new UserError(`Type '${input.type}' not valid`)
			}
			return createAlbum(input)
		}
	}
}

export { schema, resolvers }