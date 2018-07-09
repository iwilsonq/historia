import React from 'react'

const Controls = props => {
	return (
		<div>
			<button data-testid="dislike-button" onClick={props.onDislikeClick}>
				Dislike
			</button>
			<button data-testid="rewind-button" onClick={props.onRewindClick}>
				Rewind
			</button>
			{props.isPlaying ? (
				<button data-testid="pause-button" onClick={props.onPauseClick}>
					Pause
				</button>
			) : (
				<button data-testid="play-button" onClick={props.onPlayClick}>
					Play
				</button>
			)}
			<button data-testid="skip-button" onClick={props.onSkipClick}>
				Skip
			</button>
			<button data-testid="like-button" onClick={props.onLikeClick}>
				Like
			</button>
		</div>
	)
}

export default Controls
