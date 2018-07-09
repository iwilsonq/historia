import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native'
import { ApolloProvider } from 'react-apollo'

import { client } from './apolloClient'

import Player from './components/Player'
import Playlist from './components/Playlist'

export default class App extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<SafeAreaView style={styles.container}>
					<Player>
						<Playlist />
					</Player>
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
