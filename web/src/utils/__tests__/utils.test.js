import { formatTime } from 'utils'

it('formats time with padded seconds ', () => {
	expect(formatTime(8.41)).toBe('0:08')
	expect(formatTime(12.21)).toBe('0:12')
	expect(formatTime(72.21)).toBe('1:12')
})
