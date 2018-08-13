import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const apiUrl = process.env.REACT_APP_LOCAL
  ? 'http://localhost:8080'
  : process.env.REACT_APP_API_URL

const client = new ApolloClient({
  uri: `${apiUrl}/graphql`
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
