require('dotenv').config()
const debug = require('debug')('api:index')
debug('Server starting...')
import os from 'os'
import { createServer } from 'http'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import passport from 'passport'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'

const MongoStore = connectMongo(session)

import { typeDefs, resolvers, subscriptions } from './entities'

const PORT = process.env.PORT || 8080

const app = express()

const mongoUri = process.env.MONGO_URI
if (!mongoUri) {
  throw new Error('missing mongodb connection string')
}

debug(`MONGO_URI: ${mongoUri}`)
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true },
  err => {
    if (err) {
      debug('Error:', err.message)
    }
    console.log('connected to mongodb')
  }
)

app.use(morgan('dev'))
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
      url: mongoUri,
      autoReconnect: true
    })
  })
)
app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions,
  context: ({ req }) => {
    return {
      ...req,
      user: {
        listenedTracks: []
      }
    }
  },
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  }
})

server.applyMiddleware({ app })
const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  const ifaces = os.networkInterfaces()
  const HOST = ifaces.en0.find(host => host.family === 'IPv4').address
  console.log(`🚀 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://${HOST}:${PORT}${server.subscriptionsPath}`)
})
