import React, { Component } from 'react'

class playerProps extends Component {
  state = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    ...this.props.initialState
  }

  playbackObject = null

  componentDidMount() {
    this.loadTrack(this.props.tracks[0]) // play the first track
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
    this.loadTrack(this.props.tracks[1])
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
