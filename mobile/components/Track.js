import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

const Track = ({ onTrackPress, ...track }) => {
	return (
		<TouchableHighlight
			underlayColor="#e6ecef"
			activeOpacity={0.3}
			onPress={() => onTrackPress(track)}
		>
			<View style={styles.container}>
				<View style={styles.left}>
					<Text style={styles.trackNumber}>{track.number}</Text>
				</View>
				<View style={styles.content}>
					<Text>{track.name}</Text>
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	left: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	trackNumber: {
		color: '#c0bfc1'
	},
	content: {
		flex: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#d5d7d8',
		height: 44,
		justifyContent: 'center'
	}
})

export { Track }
