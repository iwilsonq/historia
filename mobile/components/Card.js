import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

const Card = props => {
	return (
		<TouchableHighlight onPress={props.onPress}>
			<View style={styles.card}>{props.children}</View>
		</TouchableHighlight>
	)
}

const TrackCard = props => {
	return (
		<Card onPress={() => props.playTrack(props.url)}>
			<Text>Track Card</Text>
			<Text>{props.name}</Text>
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		height: 60
	}
})

export { Card, TrackCard }
