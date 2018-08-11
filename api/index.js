require('dotenv').config()
const debug = require('debug')('api:index')
debug('Server starting...')
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'

import { typeDefs, resolvers } from './graph'

const PORT = process.env.PORT || 8080

const app = express()

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/historia'

debug(`MONGO_URI: ${mongoUri}`)
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true },
  err => {
    if (err) {
      debug('Error:', err.message)
    }
    console.log('Connected to mongodb')
  }
)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  }
})

server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
  console.log(`GraphQL Playground at http://localhost:${PORT}/graphql`)
})
