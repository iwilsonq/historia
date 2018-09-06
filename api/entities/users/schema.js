const debug = require('debug')('api:users')
import UserModel from './model'
import { register, login } from './auth'

export const userSchema = /* GraphQL */ `
  type User {
    id: ID
    email: String
    password: String
    gamesEnjoyed: [String]
    favoriteGame: String
  }

  input UpdateUserInput {
    gamesEnjoyed: [String]
    favoriteGame: String
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: User
    updateUser(id: ID!, input: UpdateUserInput!): User
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
    register: (_, { email, password }, ctx) => {
      debug(`mutation register ${email}`)
      return register(email, password, ctx)
    },
    login: (_, { email, password }, ctx) => {
      debug(`mutation login ${email}`)
      return login(email, password, ctx)
    },
    logout: (_, args, ctx) => {
      debug(`mutation logout`)
      ctx.logout()
      return ctx.user
    },
    updateUser: (_, { id, input }, ctx) => {
      debug(`mutation updateUser %O`, input)
      return UserModel.findByIdAndUpdate(id, input)
    }
  }
}
