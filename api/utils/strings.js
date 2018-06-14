export const getName = filename => {
	const [name, extension] = filename.split('.')
	return name
		.split('_')
		.map(toTitleCase)
		.join(' ')
}

export const convertToFilename = name => {
	return name
		.split(' ')
		.map(word => word.toLowerCase())
		.join('_')
}

const articles = ['of', 'and', 'or']

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt) {
		if (articles.includes(txt)) {
			return txt
		}
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}
