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
import { Flex, Box, PlayerButtons } from 'components'

const Controls = props => {
  return (
    <Box height="100%" maxWidth={1000} m="0 auto">
      <Flex height="100%" justifyContent="space-between" alignItems="center">
        <Box flex={1} />
        <PlayerButtons>
          <ThumbsDownIcon data-testid="dislike-button" onClick={props.onDislikeClick} />
          <PreviousIcon data-testid="rewind-button" onClick={props.onRewindClick} />
          {props.isPlaying ? (
            <PauseIcon data-testid="pause-button" onClick={props.onPauseClick} />
          ) : (
            <PlayIcon data-testid="play-button" onClick={props.onPlayClick} />
          )}
          <NextIcon data-testid="skip-button" onClick={props.onSkipClick} />
          <ThumbsUpIcon data-testid="like-button" onClick={props.onLikeClick} />
        </PlayerButtons>
        <Box mr={24} flex={1}>
          <Flex justifyContent="flex-end">
            <Text data-testid="currentTime">{formatTime(props.currentTime)}</Text>
            <Text>|</Text>
            <Text data-testid="duration">{formatTime(props.duration)}</Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

const Text = styled('span')({
  display: 'inline-block',
  marginRight: 6
})

export default Controls
