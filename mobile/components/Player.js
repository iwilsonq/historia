import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

export class PlayerProvider extends Component {
	state = {
		track: null,
		isPlaying: false,
		playbackStatus: null
	}

	playbackObject = null

	playSound = async uri => {
		if (this.state.playbackStatus) {
			await this.playbackObject.stopAsync()
		}

		this.playbackObject = new Expo.Audio.Sound()
		try {
			await this.playbackObject.loadAsync({ uri })
			this.playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			this.handlePlay()
		} catch (error) {
			console.error(error)
		}
	}

	onPlaybackStatusUpdate = playbackStatus => {
		if (!playbackStatus.isLoaded) {
			if (playbackStatus.error) {
				console.error(`Encountered a fatal error during playback: ${playbackStatus.error}`)
			}
		} else {
			if (playbackStatus.isPlaying) {
				this.setState({
					isPlaying: true,
					playbackStatus
				})
			} else {
				this.setState({ isPlaying: false, playbackStatus })
			}

			if (playbackStatus.isBuffering) {
				this.setState({ isPlaying: true, playbackStatus })
			}

			if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
				this.setState({ isPlaying: false, playbackStatus })
			}
		}
	}

	handlePlay = () => this.playbackObject.playAsync()

	handlePause = () => this.playbackObject.pauseAsync()

	handleStop = async () => {
		await this.playbackObject.stopAsync()
		this.playbackObject = null
		this.setState({ playbackStatus: null })
	}

	handleSkip = () => {
		const {
			album: { tracks }
		} = this.props.client.readQuery({
			query: ALBUM_TRACKS_QUERY
		})

		const nextTrack = tracks[this.state.track.number]
		if (nextTrack) {
			this.handlePlayTrack(nextTrack)
		} else {
			this.handleStop()
		}
	}

	handlePlayTrack = track => {
		this.setState({ track }, () => {
			this.playSound(track.url)
		})
	}

	render() {
		const playerProps = {
			...this.state,
			handleTrackPress: this.handlePlayTrack
		}
		const { playbackStatus, track } = this.state

		return (
			<Query query={ALBUM_TRACKS_QUERY}>
				{({ data, loading, error }) => {
					if (error) {
						console.error(error)
					}

					const { album = {} } = data

					return (
						<View style={styles.wrapper}>
							<View style={styles.children}>
								{React.cloneElement(this.props.children, {
									tracks: album.tracks,
									loading,
									...playerProps
								})}
							</View>
							{playbackStatus && (
								<View style={styles.playerContainer}>
									<View style={styles.playerInfo}>
										<View style={styles.albumArt}>
											<Image
												style={{ width: 40, height: 40 }}
												source={{
													uri:
														'https://lh3.googleusercontent.com/-A8rbO2ZZsGM/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq2D-2d4jgaisEjyBaW6gVn4r7igUg/s64-c-mo/photo.jpg'
												}}
											/>
										</View>
										<Text style={styles.trackInfo}>
											{track.name} - {album.name}
										</Text>
									</View>

									<View style={styles.controls}>
										{playbackStatus.isPlaying ? (
											<MaterialIcons
												name="pause"
												size={40}
												onPress={this.handlePause}
											/>
										) : (
											<MaterialIcons
												name="play-arrow"
												size={40}
												onPress={this.handlePlay}
											/>
										)}
										<MaterialIcons
											name="fast-forward"
											size={40}
											onPress={this.handleSkip}
										/>
									</View>
								</View>
							)}
						</View>
					)
				}}
			</Query>
		)
	}
}

export const ALBUM_TRACKS_QUERY = gql`
	query AlbumTracks {
		album(name: "The Legend of Zelda: Ocarina of Time") {
			name
			tracks {
				id
				url
				name
			}
		}
	}
`

const styles = StyleSheet.create({
	wrapper: {
		flex: 10
	},
	children: {
		flex: 9
	},
	playerContainer: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#f7f7f8',
		paddingVertical: 8,
		paddingHorizontal: 16
	},
	playerInfo: {
		flex: 5,
		flexDirection: 'row'
	},
	albumArt: {
		flex: 1
	},
	trackInfo: {
		flex: 4
	},
	controls: {
		flexDirection: 'row'
	}
})

export default withApollo(PlayerProvider)
