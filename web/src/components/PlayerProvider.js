import React, { Component } from 'react'

const defaultTrack = {
	id: '5b3d35f6c31ee057e0adf44f',
	number: 1,
	name: 'Dearly Beloved',
	url:
		'https://historia.blob.core.windows.net/tracks/kingdom-hearts-original-soundtrack/dearly beloved.mp3'
}

class PlayerProvider extends Component {
	state = {
		isPlaying: false
	}

	playbackObject = null

	componentDidMount() {
		this.playbackObject = defaultTrack
	}

	componentDidUpdate() {}

	handlePlay = () => {
		this.setState({ isPlaying: true })
	}

	handlePause = () => {
		this.setState({ isPlaying: false })
	}

	render() {
		const playerProps = {
			...this.state,
			onPlayClick: this.handlePlay,
			onPauseClick: this.handlePause
		}
		return React.cloneElement(this.props.children, playerProps)
	}
}

export default PlayerProvider
