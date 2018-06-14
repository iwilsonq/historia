import merge from 'lodash/merge'
import { resolvers as trackResolvers, schema as trackSchema } from './tracks/schema'
import { resolvers as albumResolvers, schema as albumSchema } from './albums/schema'

const schema = [...trackSchema, ...albumSchema]
const resolvers = merge({}, trackResolvers, albumResolvers)

export { resolvers, schema }
