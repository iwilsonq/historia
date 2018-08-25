import merge from 'lodash/merge'
import { trackResolvers, trackSchema } from './tracks/schema'
import { userResolvers, userSchema } from './users/schema'
import subscriptions from './subscriptions'

const resolvers = merge({}, trackResolvers, userResolvers)

const rootSchema = /* GraphQL */ `
  type Query {
    dummy: String
  }

  type Mutation {
    dummy: String
  }
`
const typeDefs = [rootSchema, trackSchema, userSchema]

export { typeDefs, resolvers, subscriptions }
