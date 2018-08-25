import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'

const HOST = '10.31.53.138'

const apiUrl = process.env.REACT_APP_LOCAL
  ? `http://${HOST}:8080`
  : process.env.REACT_APP_API_URL

const wsLink = new WebSocketLink({
  uri: `ws://${HOST}:8080/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: 'abc123'
    }
  }
})

const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
