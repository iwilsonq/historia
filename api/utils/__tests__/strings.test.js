import { getName, convertToFilename } from '../strings'

describe('getName gets name of a file in display format', () => {
	it('handles underscores', () => {
		const actual = getName('hyrule_field.mp3')
		expect(actual).toBe('Hyrule Field')
	})

	it('handles "of" in names', () => {
		const actual = getName('ocarina_of_time.mp3')
		expect(actual).toBe('Ocarina of Time')
	})
})

describe('convertToFilename converts display name to filename', () => {
	it('handles "of"', () => {
		const actual = convertToFilename('Ocarina of Time')
		expect(actual).toBe('ocarina_of_time')
	})
})
