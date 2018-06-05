const debug = require('debug')('api:media')
import { listMedia, createMedia } from './models'
import { mediaTypes } from '../../../shared/constants'
import UserError from '../../utils/UserError'

const schema = [
	/* GraphQL */ `
  type Media {
    id: ID!
    name: String!
    franchise: String
    background: String
    type: String
  }
  
  type Game {
    id: ID!
    name: String!
    franchise: String
    background: String
    type: String
  }

  extend type Query {
    media(type: String): [Media]
  }

  input CreateMediaInput {
    name: String!
    background: String
    franchise: String
    type: String
  }

  extend type Mutation {
    createMedia(input: CreateMediaInput!): Media
  }
`
]

const resolvers = {
	Query: {
		media(_, args, ctx) {
			return listMedia()
		}
	},
	Mutation: {
		createMedia(_, { input }, ctx) {
			if (!mediaTypes[input.type]) {
				return new UserError(`Type '${input.type}' not valid`)
			}
			return createMedia(input)
		}
	}
}

export { schema, resolvers }
