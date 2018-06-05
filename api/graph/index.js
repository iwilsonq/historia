import merge from 'lodash/merge'
import { resolvers as trackResolvers, schema as trackSchema } from './tracks/schema'
import { resolvers as mediaResolvers, schema as mediaSchema } from './media/schema'

const schema = [...trackSchema, ...mediaSchema]
const resolvers = merge({}, trackResolvers, mediaResolvers)

export { resolvers, schema }
