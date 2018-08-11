const debug = require('debug')('api:tracks')
import TrackModel from './model'

export const trackSchema = /* GraphQL */ `
  type Track {
    id: ID!

    # readable song title
    name: String

    # url of cover art
    coverArt: String

    # url of mp3 file
    url: String

    # reference to album
    album: Album
  }

  extend type Query {
    tracks(first: Int = 20, after: ID): [Track]
  }

  input CreateTrackInput {
    name: String!
    url: String!
    coverArt: String
    album: String
  }

  extend type Mutation {
    createTrack(input: CreateTrackInput!): Track
  }
`

export const trackResolvers = {
  Query: {
    tracks(_, args, ctx) {
      debug(`query tracks %O`, args)
      return TrackModel.find()
    }
  },
  Mutation: {
    createTrack(_, { input }, ctx) {
      debug(`mutation createTrack %O`, input)
      return TrackModel.insert(input)
    }
  }
}
