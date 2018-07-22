export function formatTime(timeInSeconds) {
	let minutes = Math.floor(timeInSeconds / 60)
	let seconds = Math.floor(timeInSeconds % 60)

	let paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

	return `${minutes}:${paddedSeconds}`
}
