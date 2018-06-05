import { makeExecutableSchema } from 'graphql-tools'
import { resolvers, schema } from './graph'

const rootSchema = [
	/* GraphQL */ `
	type Query {
		# query dashboard for polls, events, welcomes, and tips
		dummy: String
	}

	type Mutation {
		dummy: String
	}
`
]

const typeDefs = [...rootSchema, ...schema]

export default makeExecutableSchema({
	typeDefs,
	resolvers
})
