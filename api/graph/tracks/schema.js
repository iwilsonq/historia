const debug = require('debug')('api:tracks')
import { listTracks, createTrack } from './model'

export const trackSchema = /* GraphQL */ `
  type Track {
    id: ID!

    number: Int

    # readable song title
    name: String

    # URL of mp3 file
    url: String

    # reference to Game|Film|Series
    album: Album
  }

  extend type Query {
    tracks(first: Int = 20, after: ID): [Track]
  }

  input CreateTrackInput {
    name: String!
    url: String!
    album: String
  }

  extend type Mutation {
    createTrack(input: CreateTrackInput!): Track
  }
`

export const trackResolvers = {
  Query: {
    tracks(_, args, ctx) {
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
