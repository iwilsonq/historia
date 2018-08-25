const debug = require('debug')('api:users')
import UserModel from './model'
import { signup, login } from './auth'

export const userSchema = /* GraphQL */ `
  type User {
    id: ID
    email: String
    password: String
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    signup(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: User
  }
`

export const userResolvers = {
  Query: {
    async users(_, args) {
      debug(`query users %O`, args)
      return UserModel.find()
    }
  },
  Mutation: {
    signup: (_, { email, password }, ctx) => {
      debug(`mutation signup ${email}`)
      return signup({ email, password, ctx })
    },
    login: (_, { email, password }, ctx) => {
      debug(`mutation login ${email}`)
      return login({ email, password, ctx })
    },
    logout: (_, args, ctx) => {
      debug(`mutation logout`)
      const { user } = ctx
      ctx.logout()
      return user
    }
  }
}
