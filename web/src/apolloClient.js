import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

const HOST = '172.31.99.160'

const localUrl = `${HOST}:8080`
const stageUrl = process.env.REACT_APP_API_URL

const apiUrl = process.env.REACT_APP_LOCAL ? `http://${localUrl}` : `https://${stageUrl}`

const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`,
  credentials: 'same-origin'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    cookies: 'megacookie'
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

export default client
