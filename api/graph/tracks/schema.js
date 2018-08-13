const debug = require('debug')('api:tracks')
import mongoose from 'mongoose'
import TrackModel from './model'
import { TRACK_COUNT_LIMIT } from '../../constants'

export const trackSchema = /* GraphQL */ `
  type Track {
    _id: ID

    id: ID

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
    tracks(limit: Int, offset: Int): [Track]
    sampleTracks(limit: Int): [Track]
  }

  input CreateTrackInput {
    name: String!
    url: String!
    coverArt: String
  }

  extend type Mutation {
    createTrack(input: CreateTrackInput!): Track
  }
`

export const trackResolvers = {
  Query: {
    tracks(_, args, ctx) {
      debug(`query tracks %O`, args)
      const skip = args.skip || 0
      const limit = args.limit || TRACK_COUNT_LIMIT
      return TrackModel.find()
        .skip(skip)
        .limit(limit)
    },
    sampleTracks(_, args, ctx) {
      debug(`query sampleTracks %O`, args)
      const limit = args.limit || TRACK_COUNT_LIMIT
      const { listenedTracks } = ctx.user
      return TrackModel.aggregate([
        { $sample: { size: limit } },
        { $match: { _id: { $nin: listenedTracks.map(mongoose.Types.ObjectId) } } }
      ]).then(tracks => {
        return tracks.map(track => ({ ...track, id: track._id.valueOf() }))
      })
    }
  },
  Mutation: {
    createTrack(_, { input }, ctx) {
      debug(`mutation createTrack %O`, input)
      return TrackModel.create(input)
    }
  }
}
