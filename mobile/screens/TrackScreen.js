import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import { Audio } from 'expo'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { TrackCard } from '../components/Card'

class TrackScreen extends Component {
	playTrack = async uri => {
		console.log(uri)
		const soundObject = new Expo.Audio.Sound()
		try {
			await soundObject.loadAsync({ uri })
			await soundObject.playAsync()
			// Your sound is playing!
		} catch (error) {
			// throw new Error(error)
			// An error occurred!
		}
	}

	render() {
		return (
			<Query query={TRACKS_QUERY}>
				{({ data, loading, error }) => {
					if (loading) {
						return (
							<View>
								<Text>Loading tracks...</Text>
							</View>
						)
					}

					if (error) {
						throw new Error(error)
					}

					return (
						<FlatList
							data={data.tracks}
							renderItem={({ item }) => (
								<TrackCard playTrack={this.playTrack} {...item} />
							)}
							keyExtractor={item => item.id}
						/>
					)
				}}
			</Query>
		)
	}
}

const TRACKS_QUERY = gql`
	query Tracks {
		tracks {
			id
			url
			name
		}
	}
`

export { TrackScreen }
