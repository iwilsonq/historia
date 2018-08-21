import { gql } from 'apollo-server-express'
import merge from 'lodash/merge'
import { trackResolvers, trackSchema } from './tracks/schema'
import { albumResolvers, albumSchema } from './albums/schema'
import subscriptions from './subscriptions'

const resolvers = merge({}, trackResolvers, albumResolvers)

const rootSchema = /* GraphQL */ `
  type Query {
    dummy: String
  }

  type Mutation {
    dummy: String
  }
`
const typeDefs = [rootSchema, trackSchema, albumSchema]

export { typeDefs, resolvers, subscriptions }
