import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ApolloProvider } from 'react-apollo'

import { client } from './apolloClient'

import { TrackScreen } from './screens/TrackScreen'
import PlayerProvider from './components/Player'

export default class App extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<SafeAreaView style={styles.container}>
					<PlayerProvider>
						<TrackScreen />
					</PlayerProvider>
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
