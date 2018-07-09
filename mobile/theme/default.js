const greyscale = {
	black: '#000000', // headlines, body, subheaders
	grey: '#666666', // secondary text
	lightgrey: '#c8c7cc', // footnotes, captions
	screen: '#efeff4', // screen background
	white: '#f9f9f9' // top bars, toolbars, backgrounds
}

const palette = {
	blue: '#007aaf',
	cyan: '#5ac8fa',
	yellow: '#ffcc00',
	orange: '#ff9500',
	lightred: '#ff2d55',
	green: '#4cd964',
	red: '#ff3b30',
	...greyscale
}

const theme = {
	palette
}

export default theme
