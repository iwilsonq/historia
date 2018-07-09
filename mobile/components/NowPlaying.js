import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Animated,
	PanResponder,
	ScrollView,
	Image,
	Slider
} from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Ionicons } from '@expo/vector-icons'

const SCREEN_HEIGHT = Dimensions.get('window').height - 60
const SCREEN_WIDTH = Dimensions.get('window').width

class NowPlaying extends React.Component {
	state = {
		isScrollEnabled: false
	}

	animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 110 })
	scrollOffset = 0

	panResponder = PanResponder.create({
		onMoveShouldSetPanResponder: (event, gestureState) => {
			if (
				(this.state.isScrollEnabled && this.scrollOffset <= 0 && gestureState.dy > 0) ||
				(!this.state.isScrollEnabled && gestureState.dy < 0)
			) {
				return true
			} else {
				return false
			}
		},
		onPanResponderGrant: (event, gestureState) => {
			this.animation.extractOffset()
		},
		onPanResponderMove: (event, gestureState) => {
			this.animation.setValue({ x: 0, y: gestureState.dy })
		},
		onPanResponderRelease: (event, gestureState) => {
			if (gestureState.moveY > SCREEN_HEIGHT - 120) {
				Animated.spring(this.animation.y, {
					toValue: 0,
					tension: 1
				}).start()
			} else if (gestureState.moveY < 120) {
				Animated.spring(this.animation.y, {
					toValue: 0,
					tension: 1
				}).start()
			}

			if (gestureState.dy < 0) {
				this.setState({ isScrollEnabled: true })
				Animated.spring(this.animation.y, {
					toValue: -SCREEN_HEIGHT + 120,
					tension: 1
				}).start()
			} else if (gestureState.dy > 0) {
				this.setState({ isScrollEnabled: false })
				Animated.spring(this.animation.y, {
					toValue: SCREEN_HEIGHT - 120,
					tension: 1
				}).start()
			}
		}
	})

	render() {
		const animatedHeight = {
			transform: this.animation.getTranslateTransform()
		}

		animatedImageHeight = this.animation.y.interpolate({
			inputRange: [0, SCREEN_HEIGHT - 90],
			outputRange: [200, 32],
			extrapolate: 'clamp'
		})

		animatedSongTitleOpacity = this.animation.y.interpolate({
			inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
			outputRange: [0, 0, 1],
			extrapolate: 'clamp'
		})

		animatedImageMarginLeft = this.animation.y.interpolate({
			inputRange: [0, SCREEN_HEIGHT - 90],
			outputRange: [SCREEN_WIDTH / 2 - 100, 10],
			extrapolate: 'clamp'
		})

		animatedHeaderHeight = this.animation.y.interpolate({
			inputRange: [0, SCREEN_HEIGHT - 90],
			outputRange: [SCREEN_WIDTH / 2, 90],
			extrapolate: 'clamp'
		})

		animatedMarginTop = this.animation.y.interpolate({
			inputRange: [0, SCREEN_HEIGHT - 90],
			outputRange: [64, 0],
			extrapolate: 'clamp'
		})

		animatedSongDetailsOpacity = this.animation.y.interpolate({
			inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
			outputRange: [1, 0, 0],
			extrapolate: 'clamp'
		})

		animatedBackgroundColor = this.animation.y.interpolate({
			inputRange: [0, SCREEN_HEIGHT - 90],
			outputRange: ['rgba(0,0,0,0.5)', 'white'],
			extrapolate: 'clamp'
		})

		return (
			<Animated.View
				style={{
					flex: 1,
					backgroundColor: animatedBackgroundColor
				}}
			>
				<Query query={ALBUM_TRACKS_QUERY}>
					{({ data, loading, error }) => {
						if (loading) {
							return (
								<View>
									<Text>Loading...</Text>
								</View>
							)
						}

						console.log(data)
						if (error || !data.album) {
							return (
								<View>
									<Text>Error Ocurred in Query</Text>
								</View>
							)
						}

						return (
							<View>
								<Animated.View
									{...this.panResponder.panHandlers}
									style={[
										animatedHeight,
										{
											position: 'absolute',
											left: 0,
											right: 0,
											zIndex: 0,
											height: SCREEN_HEIGHT,
											backgroundColor: 'white',
											borderTopWidth: 1,
											borderTopColor: '#dddddd'
										}
									]}
								>
									<ScrollView
										scrollEnabled={this.state.isScrollEnabled}
										scrollEventThrottle={16}
										onScroll={event => {
											this.scrollOffset = event.nativeEvent.contentOffset.y
										}}
									>
										<Animated.View
											style={{
												height: animatedHeaderHeight,
												flexDirection: 'row',
												alignItems: 'center',
												marginTop: animatedMarginTop
											}}
										>
											<View
												style={{
													flex: 4,
													flexDirection: 'row',
													alignItems: 'center',
													justifyContent: 'flex-start'
												}}
											>
												<Animated.View
													style={{
														height: animatedImageHeight,
														width: animatedImageHeight,
														marginLeft: animatedImageMarginLeft
													}}
												>
													<Image
														style={{
															flex: 1,
															width: null,
															height: null
														}}
														source={{ uri: data.album.cover }}
													/>
												</Animated.View>
												<Animated.Text
													style={{
														opacity: animatedSongTitleOpacity,
														fontSize: 18,
														paddingLeft: 10
													}}
												>
													{data.album.tracks[0].name}
												</Animated.Text>
											</View>

											<Animated.View
												style={{
													opacity: animatedSongTitleOpacity,
													flex: 1,
													flexDirection: 'row',
													justifyContent: 'space-around',
													alignItems: 'center',
													marginRight: 16
												}}
											>
												<Ionicons name="md-pause" size={32} />
												<Ionicons name="md-play" size={32} />
											</Animated.View>
										</Animated.View>

										<Animated.View
											style={{
												height: animatedHeaderHeight,
												opacity: animatedSongDetailsOpacity,
												marginTop: animatedMarginTop
											}}
										>
											<View
												style={{
													flex: 1,
													alignItems: 'center',
													justifyContent: 'flex-end'
												}}
											>
												<Text style={{ fontWeight: 'bold', fontSize: 22 }}>
													{data.album.tracks[0].name}
												</Text>
												<Text style={{ color: '#fa95ed', fontSize: 18 }}>
													{data.album.name}
												</Text>
											</View>

											<View
												style={{
													flex: 2,
													flexDirection: 'row',
													alignItems: 'center',
													justifyContent: 'space-around'
												}}
											>
												<Ionicons name="md-rewind" size={40} />
												<Ionicons name="md-pause" size={50} />
												<Ionicons name="md-fastforward" size={40} />
											</View>
											<View
												style={{
													height: 40,
													width: SCREEN_WIDTH,
													alignItems: 'center'
												}}
											>
												<Slider
													style={{ width: 300 }}
													step={1}
													minimumValue={18}
													maximumValue={71}
													value={18}
												/>
											</View>
											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'space-between',
													paddingHorizontal: 20,
													paddingBottom: 20
												}}
											>
												<Ionicons
													name="md-add"
													size={32}
													style={{ color: '#fa95ed' }}
												/>
												<Ionicons
													name="md-more"
													size={32}
													style={{ color: '#fa95ed' }}
												/>
											</View>
										</Animated.View>
										<View style={{ height: 1000 }} />
									</ScrollView>
								</Animated.View>
							</View>
						)
					}}
				</Query>
			</Animated.View>
		)
	}
}

export const ALBUM_TRACKS_QUERY = gql`
	query AlbumTracks {
		album(id: "5b0f6db0c6d798804ff21282") {
			name
			cover
			tracks {
				id
				number
				url
				name
			}
		}
	}
`

export default NowPlaying
