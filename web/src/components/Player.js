import React, { Component } from 'react'

const dearlyBeloved = {
	id: '5b3d35f6c31ee057e0adf44f',
	number: 1,
	name: 'Dearly Beloved',
	url:
		'https://historia.blob.core.windows.net/tracks/kingdom-hearts-original-soundtrack/dearly beloved.mp3'
}

const traverseTown = {
	id: '5b3d3643c31ee057e0adf45e',
	number: 16,
	name: 'Traverse Town',
	url:
		'https://historia.blob.core.windows.net/tracks/kingdom-hearts-original-soundtrack/traverse town.mp3'
}

class playerProps extends Component {
	state = {
		isPlaying: false,
		currentTime: 0,
		duration: 0,
		...this.props.initialState
	}

	playbackObject = null

	componentDidMount() {
		this.loadTrack(traverseTown)
	}

	loadTrack = track => {
		this.playbackObject = new Audio(track.url)

		this.playbackObject.ontimeupdate = () => {
			this.setState({
				currentTime: this.playbackObject.currentTime,
				duration: this.playbackObject.duration || 0
			})
		}

		this.playbackObject.onended = () => {
			this.handleSkip()
		}
	}

	unloadTrack = () => {
		this.playbackObject.pause()
		this.playbackObject = null
	}

	seek = seconds => {
		this.playbackObject.fastSeek(seconds)
		this.setState({ currentTime: 0 })
	}

	handlePlay = () => {
		this.playbackObject.play()
		this.setState({ isPlaying: true })
	}

	handlePause = () => {
		this.playbackObject.pause()
		this.setState({ isPlaying: false })
	}

	handleSkip = () => {
		this.unloadTrack()
		this.loadTrack(dearlyBeloved)
		this.handlePlay()
	}

	handleRewind = () => {
		this.seek(0)
	}

	render() {
		const playerProps = {
			...this.state,
			onPlayClick: this.handlePlay,
			onPauseClick: this.handlePause,
			onSkipClick: this.handleSkip,
			onRewindClick: this.handleRewind
		}
		return React.cloneElement(this.props.children, playerProps)
	}
}

export default playerProps
