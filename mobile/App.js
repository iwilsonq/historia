import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { TrackScreen } from './screens/TrackScreen'

const DEFAULT_IP = '10.0.0.46'

const client = new ApolloClient({
	uri: `http://${DEFAULT_IP}:8080/graphql`
})

export default class App extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<SafeAreaView style={styles.container}>
					<TrackScreen />
				</SafeAreaView>
			</ApolloProvider>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
