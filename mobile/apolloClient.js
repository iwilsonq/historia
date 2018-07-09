import ApolloClient from 'apollo-boost'

// const IP = 'localhost'
const IP = '10.0.0.46'
// const IP = '10.31.53.68'

const client = new ApolloClient({
	uri: `http://${IP}:8080/graphql`
})

export { client }
