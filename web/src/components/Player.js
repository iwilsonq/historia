import React, { Component } from 'react'
import styled from 'react-emotion'
import Controls from 'components/Controls'
import { theme } from '../shared/theme'

const BottomBar = styled('footer')({
  width: '100%',
  minWidth: 666,
  position: 'fixed',
  bottom: 0,
  height: 66,
  borderTop: `1px solid ${theme.colors.white}`,
  backgroundColor: theme.colors.dark,
  color: theme.colors.white
})

export class Player extends Component {
  state = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    ...this.props.initialState
  }

  playbackObject = null

  componentWillReceiveProps(nextProps) {
    const { track } = this.props
    if (!track && nextProps.track) {
      this.loadTrack(nextProps.track) // play the first track
    }
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
    this.props.onSkip().then(() => {
      this.unloadTrack()
      this.loadTrack(this.props.track)
      this.handlePlay()
    })
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
    return (
      <BottomBar>
        <Controls {...playerProps} />
      </BottomBar>
    )
  }
}

export default Player
