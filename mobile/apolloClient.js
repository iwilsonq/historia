import ApolloClient from 'apollo-boost'

const DEFAULT_REMOTE_IP = 'localhost' // for not at home
const DEFAULT_HOME_IP = '10.0.0.46' // for at home

const client = new ApolloClient({
	uri: `http://${DEFAULT_HOME_IP}:8080/graphql`
})

export { client }
