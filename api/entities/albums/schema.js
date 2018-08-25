const debug = require('debug')('api:album')
import AlbumModel from './model'
import TrackModel from '../tracks/model'
import UserError from '../../utils/UserError'

export const albumSchema = /* GraphQL */ `
  type Album {
    id: ID!
    name: String!
    series: String
    publisher: String
    type: String
    coverArt: String
    composer: String
    releaseDate: Float
    tracks: [Track]
  }

  extend type Query {
    album(id: ID!): Album
  }

  input CreateAlbumInput {
    name: String!
    coverArt: String
    series: String
    composer: String
    type: String
  }

  extend type Mutation {
    createAlbum(input: CreateAlbumInput!): Album
  }
`

export const albumResolvers = {
  Query: {
    album(_, { id }, ctx) {
      debug(`Query.album ${id}`)
      return AlbumModel.findById(id)
    }
  },
  Album: {
    tracks(album, args, ctx) {
      debug('Album.tracks %O', args)
      debug('%O', album)
      return TrackModel.find({ album: album.id })
    }
  },
  Mutation: {
    createAlbum(_, { input }, ctx) {
      if (!albumTypes[input.type]) {
        return new UserError(`Type '${input.type}' not valid`)
      }
      return AlbumModel.insert(input)
    }
  }
}
