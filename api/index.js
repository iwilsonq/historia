require('dotenv').config()
const debug = require('debug')('api:index')
debug('Server starting...')
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import mongoose from 'mongoose'
import Track from './graph/tracks/models'

import schema from './schema'

const PORT = process.env.PORT || 8080

const app = express()

const mongoUri = `${process.env.COSMOSDB_CONNSTR}@${process.env.COSMOSDB_DBNAME}?ssl=true`

debug(`MONGO_URI: ${mongoUri}`)
mongoose.connect(
	mongoUri,
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

app.use(
	'/graphql',
	graphqlExpress({
		schema
	})
)

app.use('/___graphql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`)
	console.log(`Graphiql at http://localhost:${PORT}/___graphql`)
})
