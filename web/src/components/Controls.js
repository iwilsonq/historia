import React from 'react'
import styled from 'react-emotion'
import { formatTime } from 'utils'
import {
  ThumbsDownIcon,
  PlayIcon,
  PauseIcon,
  NextIcon,
  PreviousIcon,
  ThumbsUpIcon
} from 'assets/svg/Controls'

const Wrapper = styled('div')({
  height: '100%',
  maxWidth: 1000,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const Buttons = styled('div')({
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 350,
  height: '100%'
})

const TrackDetails = styled('div')({ flex: 1 })

const Duration = styled('div')({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: 24
})

const Text = styled('span')({
  display: 'inline-block',
  marginRight: 6
})

const Controls = props => {
  return (
    <Wrapper>
      <TrackDetails />
      <Buttons>
        <ThumbsDownIcon data-testid="dislike-button" onClick={props.onDislikeClick} />
        <PreviousIcon data-testid="rewind-button" onClick={props.onRewindClick} />
        {props.isPlaying ? (
          <PauseIcon data-testid="pause-button" onClick={props.onPauseClick} />
        ) : (
          <PlayIcon data-testid="play-button" onClick={props.onPlayClick} />
        )}
        <NextIcon data-testid="skip-button" onClick={props.onSkipClick} />
        <ThumbsUpIcon data-testid="like-button" onClick={props.onLikeClick} />
      </Buttons>
      <Duration>
        <Text data-testid="currentTime">{formatTime(props.currentTime)}</Text>
        <Text>|</Text>
        <Text data-testid="duration">{formatTime(props.duration)}</Text>
      </Duration>
    </Wrapper>
  )
}

export default Controls
