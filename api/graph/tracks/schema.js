const debug = require('debug')('api:tracks')
import { listTracks, createTrack } from './models'

const schema = [
	/* GraphQL */ `
		type Track {
			id: ID!

			# readable song title
			name: String

			# URL of mp3 file
			url: String

			# reference to Game|Film|Series
			media: Media
		}

		extend type Query {
			tracks(first: Int = 20, after: ID): [Track]
		}

		input CreateTrackInput {
			name: String!
			url: String!
			media: String
		}

		extend type Mutation {
			createTrack(input: CreateTrackInput!): Track
		}
	`
]

const resolvers = {
	Query: {
		async tracks(_, args, ctx) {
			debug(`tracks query %O`, args)
			return listTracks(args)
		}
	},
	Mutation: {
		createTrack(_, { input }, ctx) {
			debug(`createTrack mutation %O`, input)
			return createTrack(input)
		}
	}
}

export { schema, resolvers }
