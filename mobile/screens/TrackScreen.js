import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Audio } from 'expo'
import { Query } from 'react-apollo'

import { Track } from '../components/Track'

const TrackScreen = props => {
	if (props.loading) {
		return (
			<View>
				<Text>Loading tracks...</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={props.tracks}
				renderItem={({ item, index }) => (
					<Track number={index + 1} onTrackPress={props.handleTrackPress} {...item} />
				)}
				keyExtractor={item => item.id}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1,
		borderTopColor: '#d5d7d8'
	}
})

export { TrackScreen }
